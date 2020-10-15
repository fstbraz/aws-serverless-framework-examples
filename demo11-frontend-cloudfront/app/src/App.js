import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey dude!!
        </p>
        <a
          className="App-link"
          href="https://www.serverless.com/components/"
          target="_blank"
          rel="noopener noreferrer"
        >
          From Serverless
        </a>
      </header>
    </div>
  );
}

export default App;
