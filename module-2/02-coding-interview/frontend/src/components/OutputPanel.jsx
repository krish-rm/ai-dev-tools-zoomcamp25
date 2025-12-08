import './OutputPanel.css';

function OutputPanel({ output }) {
  return (
    <div className="output-panel">
      <div className="output-panel-header">
        <h3>Output</h3>
      </div>
      <div className="output-content">
        <pre>{output || 'No output yet. Click "Run Code" to execute your code.'}</pre>
      </div>
    </div>
  );
}

export default OutputPanel;

