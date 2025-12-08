import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store sessions in memory (in production, use a database)
const sessions = new Map();

// REST API endpoints
app.get('/api/sessions/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.get(sessionId);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json({
    sessionId: session.id,
    code: session.code,
    language: session.language,
    createdAt: session.createdAt
  });
});

app.post('/api/sessions', (req, res) => {
  const sessionId = uuidv4();
  const session = {
    id: sessionId,
    code: req.body.code || '',
    language: req.body.language || 'javascript',
    createdAt: new Date().toISOString()
  };
  
  sessions.set(sessionId, session);
  res.json({ sessionId, url: `/session/${sessionId}` });
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-session', (sessionId) => {
    if (!sessions.has(sessionId)) {
      // Create session if it doesn't exist
      sessions.set(sessionId, {
        id: sessionId,
        code: '',
        language: 'javascript',
        createdAt: new Date().toISOString()
      });
    }
    
    socket.join(sessionId);
    const session = sessions.get(sessionId);
    
    // Send current state to the new client
    socket.emit('session-state', {
      code: session.code,
      language: session.language
    });
    
    console.log(`Client ${socket.id} joined session ${sessionId}`);
  });

  socket.on('code-change', (data) => {
    const { sessionId, code } = data;
    
    if (sessions.has(sessionId)) {
      const session = sessions.get(sessionId);
      session.code = code;
      
      // Broadcast to all other clients in the session
      socket.to(sessionId).emit('code-update', { code });
    }
  });

  socket.on('language-change', (data) => {
    const { sessionId, language } = data;
    
    if (sessions.has(sessionId)) {
      const session = sessions.get(sessionId);
      session.language = language;
      
      // Broadcast to all other clients in the session
      socket.to(sessionId).emit('language-update', { language });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

const PORT = process.env.PORT || 3000;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app, httpServer };
export default app;

