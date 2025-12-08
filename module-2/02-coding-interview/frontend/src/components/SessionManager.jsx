import './SessionManager.css';

function SessionManager({ onCreateSession }) {
  return (
    <div className="session-manager">
      <div className="session-manager-card">
        <h2>Create a New Coding Session</h2>
        <p>Start a new collaborative coding interview session</p>
        <button onClick={onCreateSession} className="create-button">
          Create Session
        </button>
      </div>
    </div>
  );
}

export default SessionManager;

