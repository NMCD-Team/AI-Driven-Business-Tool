import React from 'react';
import BusinessForm from './components/BusinessFrom';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <h1>AI Business Analysis Tool</h1>
        <p>Enter your business information for AI-powered insights</p>
      </header>

        <main>
          <BusinessForm />
        </main>
    </div>
  );
};

const styles = `
  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 40px;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App;