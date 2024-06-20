import React, { useState } from 'react';

import './App.css';
import Joint from './components/Joint.js';

function App() {

  const [isActivated, setIsActivated] = useState(false);

  const handleSync = () => {
      console.log('Sync button clicked');
  };

  const toggleActivate = () => {
      setIsActivated(!isActivated);
      console.log('Activate button toggled:', !isActivated);
  };

  const handleRunScript = async () => {
      try {
          const response = await fetch('/api/run-script', { method: 'POST' });
          const data = await response.json();
          console.log(data.message);
      } catch (error) {
          console.error('Error running script:', error);
      }
  };
  
  return (
    <div className="App">
      <h1>Joint controller</h1>

      <div className="controls-container">
          <button onClick={handleSync}>Sync</button>
          <button onClick={toggleActivate}>
              {isActivated ? 'Deactivate Real' : 'Activate Real'}
          </button>

          <button onClick={handleRunScript}>Run Script</button>
      </div>

      <div className="joints-container">
        <Joint name="Joint 1" min={0} max={100} />
        <Joint name="Joint 2" min={0} max={100} />
        <Joint name="Joint 3" min={0} max={100} />
        <Joint name="Joint 4" min={0} max={100} />
        <Joint name="Joint 5" min={0} max={100} />
        <Joint name="Joint 6" min={0} max={100} />
        <Joint name="Joint Right" min={0} max={100} />
        <Joint name="Joint Left" min={0} max={100} />
        </div>
    </div>
  );
}

export default App;
