import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import SessionManager from './components/SessionManager';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function CodingSession() {
  const { sessionId } = useParams();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!sessionId) return;

    // Initialize socket connection
    socketRef.current = io(API_URL.replace('/api', ''), {
      transports: ['websocket']
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      socketRef.current.emit('join-session', sessionId);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('session-state', (data) => {
      setCode(data.code || '');
      setLanguage(data.language || 'javascript');
    });

    socketRef.current.on('code-update', (data) => {
      setCode(data.code);
    });

    socketRef.current.on('language-update', (data) => {
      setLanguage(data.language);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [sessionId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (socketRef.current && sessionId) {
      socketRef.current.emit('code-change', {
        sessionId,
        code: newCode
      });
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (socketRef.current && sessionId) {
      socketRef.current.emit('language-change', {
        sessionId,
        language: newLanguage
      });
    }
  };

  const handleOutput = (newOutput) => {
    setOutput(newOutput);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Collaborative Coding Interview Platform</h1>
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </header>
      <div className="app-content">
        <div className="session-info">
          <p>Session ID: <code>{sessionId}</code></p>
          <p>Share this link: <code>{window.location.href}</code></p>
        </div>
        
        <div className="editor-container">
          <CodeEditor
            code={code}
            language={language}
            onCodeChange={handleCodeChange}
            onLanguageChange={handleLanguageChange}
            onOutput={handleOutput}
          />
          <OutputPanel output={output} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  const handleCreateSession = async () => {
    try {
      const response = await fetch(`${API_URL}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: '',
          language: 'javascript'
        })
      });
      
      const data = await response.json();
      const newSessionId = data.sessionId;
      navigate(`/session/${newSessionId}`);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Collaborative Coding Interview Platform</h1>
      </header>
      
      <SessionManager onCreateSession={handleCreateSession} />
    </div>
  );
}

export { CodingSession };
export default App;
