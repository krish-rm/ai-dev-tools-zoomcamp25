# Collaborative Coding Interview Platform

A real-time collaborative coding platform for conducting online coding interviews. This application allows interviewers to create coding sessions, share links with candidates, and collaborate on code in real-time with syntax highlighting and safe browser-based code execution.

## 🚀 Features

- **Shareable Sessions**: Create unique links for each coding interview session
- **Real-time Collaboration**: Multiple users can edit code simultaneously with live synchronization
- **Syntax Highlighting**: Support for JavaScript and Python with beautiful code highlighting
- **Safe Code Execution**: Execute code directly in the browser using WASM (WebAssembly) for Python
- **Multi-language Support**: Switch between JavaScript and Python seamlessly
- **Live Updates**: See changes from other users in real-time as they type

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js with Socket.io
- **Real-time Communication**: WebSockets via Socket.io
- **Syntax Highlighting**: react-syntax-highlighter
- **Python Execution**: Pyodide (WASM-based Python runtime)
- **Testing**: Jest + Supertest
- **Containerization**: Docker

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher (installed globally on your system)
- **npm** 9.0.0 or higher (comes with Node.js, also installed globally)
- **Docker** (optional, for containerized deployment)

> **Note**: Unlike Python projects that use virtual environments (venv), Node.js projects don't require a venv. Node.js and npm are installed at the system level, and project dependencies are managed through npm's built-in dependency system (stored in `node_modules` folders).

You can check your versions by running:
```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/) or use a package manager:
- **Windows**: Download installer from nodejs.org or use Chocolatey: `choco install nodejs`
- **macOS**: Use Homebrew: `brew install node`
- **Linux**: Use your package manager, e.g., `sudo apt install nodejs npm`

## 📦 Installation

### Step 1: Clone or Navigate to the Project

```bash
cd 02-coding-interview
```

### Step 2: Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm run install:all
```

This command will install dependencies for:
- Root project (concurrently for running both servers)
- Backend (Express, Socket.io, etc.)
- Frontend (React, Vite, etc.)

Alternatively, you can install dependencies separately:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 🏃 Running Locally

### Development Mode

To run both the frontend and backend development servers simultaneously:

```bash
npm run dev
```

This will start:
- **Backend server** on `http://localhost:3000`
- **Frontend dev server** on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173` to use the application.

### Running Separately

If you prefer to run the servers separately:

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

### Production Mode

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Start the backend** (which will serve the built frontend):
```bash
cd backend
npm start
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

Run the integration tests to verify that the API endpoints work correctly:

```bash
npm test
```

Or run tests from the backend directory:

```bash
cd backend
npm test
```

The tests verify:
- Session creation via POST `/api/sessions`
- Session retrieval via GET `/api/sessions/:sessionId`
- Error handling for non-existent sessions

## 🐳 Docker Deployment

### Build the Docker Image

```bash
docker build -t coding-interview-platform .
```

### Run the Container

```bash
docker run -p 3000:3000 coding-interview-platform
```

The application will be available at `http://localhost:3000`

### Docker Compose (Optional)

You can create a `docker-compose.yml` file for easier management:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
```

Then run:
```bash
docker-compose up
```

## ☁️ Deployment

The application can be deployed to various cloud platforms:

### Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm run install:all && cd frontend && npm run build`
4. Set start command: `cd backend && npm start`
5. Set environment variable: `NODE_ENV=production`

### Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Deploy: `git push heroku main`
5. The Dockerfile will be used automatically

### AWS / GCP / Azure

Use their container services (ECS, Cloud Run, Container Instances) with the provided Dockerfile:

```bash
# Build and push to container registry
docker build -t your-registry/coding-interview-platform .
docker push your-registry/coding-interview-platform
```

### Vercel / Netlify

For frontend-only deployment:
- Build the frontend: `cd frontend && npm run build`
- Deploy the `dist` folder
- Note: You'll need to deploy the backend separately to a Node.js hosting service

## 📖 Usage Guide

1. **Start the application** (see Running Locally section)
2. **Create a session**: Click "Create Session" button on the home page
3. **Share the link**: Copy the generated session URL and share it with candidates
4. **Collaborate**: Multiple users can join the same session and edit code together
5. **Select language**: Choose JavaScript or Python from the dropdown
6. **Write code**: Type code in the editor - changes sync in real-time
7. **Execute code**: Click "Run Code" to execute the code in the browser
8. **View output**: See the execution results in the output panel

## 📁 Project Structure

```
02-coding-interview/
├── backend/
│   ├── server.js              # Express server with Socket.io
│   ├── package.json           # Backend dependencies
│   ├── jest.config.js         # Jest configuration
│   └── tests/
│       └── integration.test.js # Integration tests
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app component with routing
│   │   ├── App.css            # App styles
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # Global styles
│   │   └── components/
│   │       ├── CodeEditor.jsx      # Code editor with syntax highlighting
│   │       ├── CodeEditor.css
│   │       ├── CodeExecutor.jsx    # Code execution logic
│   │       ├── CodeExecutor.css
│   │       ├── OutputPanel.jsx     # Output display
│   │       ├── OutputPanel.css
│   │       ├── SessionManager.jsx  # Session creation UI
│   │       └── SessionManager.css
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
├── Dockerfile                 # Docker configuration
├── package.json               # Root package with concurrently
├── README.md                  # This file
└── AGENTS.md                  # AI assistant guidelines
```

## 🔌 API Documentation

### REST Endpoints

#### POST `/api/sessions`

Create a new coding session.

**Request Body:**
```json
{
  "code": "console.log('Hello, World!');",
  "language": "javascript"
}
```

**Response:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "url": "/session/550e8400-e29b-41d4-a716-446655440000"
}
```

#### GET `/api/sessions/:sessionId`

Retrieve session details.

**Response:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "code": "console.log('Hello, World!');",
  "language": "javascript",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

### WebSocket Events

#### Client → Server

- **`join-session`**: Join a coding session
  ```javascript
  socket.emit('join-session', sessionId);
  ```

- **`code-change`**: Broadcast code changes
  ```javascript
  socket.emit('code-change', { sessionId, code: 'new code' });
  ```

- **`language-change`**: Broadcast language changes
  ```javascript
  socket.emit('language-change', { sessionId, language: 'python' });
  ```

#### Server → Client

- **`session-state`**: Initial session state when joining
  ```javascript
  socket.on('session-state', (data) => {
    // data: { code, language }
  });
  ```

- **`code-update`**: Code change from another user
  ```javascript
  socket.on('code-update', (data) => {
    // data: { code }
  });
  ```

- **`language-update`**: Language change from another user
  ```javascript
  socket.on('language-update', (data) => {
    // data: { language }
  });
  ```

## 🔒 Security Considerations

- **Code Execution**: All code execution happens in the browser using WebAssembly (WASM) for Python. No code is executed on the server.
- **Session Storage**: Sessions are currently stored in memory. For production, use a persistent database (Redis, MongoDB, PostgreSQL).
- **Authentication**: This is a demo application. Add authentication and authorization for production use.
- **CORS**: CORS is enabled for development. Configure properly for production.
- **Input Validation**: Add input validation and sanitization for production use.

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 or 5173 is already in use:

**Backend:**
```bash
PORT=3001 cd backend && npm run dev
```

**Frontend:**
Update `vite.config.js` to use a different port.

### Socket Connection Issues

- Ensure the backend is running before starting the frontend
- Check that CORS is properly configured
- Verify the API_URL in the frontend matches your backend URL

### Pyodide Loading Issues

- Pyodide requires an internet connection to load from CDN
- First load may take a few seconds
- Check browser console for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built as part of the AI Dev Tools Zoomcamp by DataTalksClub
- Uses Pyodide for Python execution in the browser
- React Syntax Highlighter for code highlighting
