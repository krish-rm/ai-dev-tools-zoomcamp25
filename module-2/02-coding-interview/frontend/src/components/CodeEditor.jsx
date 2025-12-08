import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeExecutor from './CodeExecutor';
import './CodeEditor.css';

function CodeEditor({ code, language, onCodeChange, onLanguageChange, onOutput }) {
  const [localCode, setLocalCode] = useState(code);

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  const handleChange = (e) => {
    const newCode = e.target.value;
    setLocalCode(newCode);
    onCodeChange(newCode);
  };

  const handleLanguageSelect = (e) => {
    onLanguageChange(e.target.value);
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <select value={language} onChange={handleLanguageSelect} className="language-select">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <CodeExecutor code={localCode} language={language} onOutput={onOutput} />
      </div>
      <div className="code-editor-wrapper">
        <textarea
          className="code-input"
          value={localCode}
          onChange={handleChange}
          placeholder="Enter your code here..."
          spellCheck={false}
        />
        <div className="code-highlight">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            {localCode || ' '}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;

