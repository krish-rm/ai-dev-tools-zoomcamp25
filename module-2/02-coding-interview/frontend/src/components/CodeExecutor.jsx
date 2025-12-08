import { useState, useEffect } from 'react';
import './CodeExecutor.css';

let pyodide = null;

async function loadPyodide() {
  if (pyodide) return pyodide;
  
  try {
    // Load Pyodide from CDN instead of bundling it
    // This avoids issues with node-fetch and other Node.js dependencies
    if (typeof window !== 'undefined' && !window.loadPyodide) {
      // Load the script if not already loaded
      await new Promise((resolve, reject) => {
        if (document.querySelector('script[src*="pyodide"]')) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    
    // Use the global loadPyodide function from the CDN
    // eslint-disable-next-line no-undef
    pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
    });
    return pyodide;
  } catch (error) {
    console.error('Failed to load Pyodide:', error);
    return null;
  }
}

function CodeExecutor({ code, language, onOutput }) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);

  useEffect(() => {
    if (language === 'python') {
      loadPyodide().then(() => {
        setPyodideLoaded(true);
      });
    }
  }, [language]);

  const executeCode = async () => {
    setIsExecuting(true);
    let output = '';

    try {
      if (language === 'javascript') {
        // Capture console output
        const originalLog = console.log;
        const logs = [];
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        try {
          const result = eval(code);
          if (result !== undefined) {
            logs.push(String(result));
          }
        } catch (error) {
          logs.push(`Error: ${error.message}`);
        }

        console.log = originalLog;
        output = logs.join('\n') || 'No output';
      } else if (language === 'python') {
        if (!pyodideLoaded) {
          output = 'Loading Python runtime... Please wait.';
        } else {
          // Capture stdout
          pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
          `);
          
          try {
            pyodide.runPython(code);
            output = pyodide.runPython('sys.stdout.getvalue()');
          } catch (error) {
            output = `Error: ${error.message}`;
          }
        }
      }
    } catch (error) {
      output = `Execution error: ${error.message}`;
    }

    onOutput(output);
    setIsExecuting(false);
  };

  return (
    <button
      onClick={executeCode}
      disabled={isExecuting || (language === 'python' && !pyodideLoaded)}
      className="execute-button"
    >
      {isExecuting ? 'Running...' : 'Run Code'}
    </button>
  );
}

export default CodeExecutor;

