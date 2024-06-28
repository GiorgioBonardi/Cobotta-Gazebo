import React, { useState } from 'react';

import './App.css';
import Joint from './components/Joint.js';
import { startRobotController, sendJointValues, sendMode, calibrateRobot } from './api/robotApi';

function App() {

  const [mode, setMode] = useState('CobottaToGazebo'); // default mode
  // Available modes: CobottaToGazebo, GazeboToCobotta
  const [jointValues, setJointValues] = useState({
    joint1: 0.0,
    joint2: 0.35,
    joint3: 1.375,
    joint4: 0.0,
    joint5: -0.15,
    joint6: 0.0,
    // i nomi corrispondono ai name dei singoli joint
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJointValues(prevValues => ({
      ...prevValues,
      [name]: parseFloat(value)  // Converti il valore in float se necessario
    }));
  };

  // const handleSync = () => {
  //   startRobotController()
  //     .then(response => {
  //       setMessage('Robot controller started successfully');
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       setMessage('There was an error starting the robot controller');
  //       console.error('There was an error starting the robot controller!', error);
  //     });
  // };

  const handleConnect = () => {
    startRobotController()
      .then(response => {
        setMessage('Succesfully connected to Cobotta.');
      })
      .catch(error => {
        setMessage('There was an error while trying to connect to the robot.');
        console.error('There was an error while trying to connect to the robot.', error);
      });
  };

  const handleCalibration = () => {
    calibrateRobot()
      .then(response => {
        setMessage('Robot calibrated.');
        console.log(response.data);
      })
      .catch(error => {
        setMessage('There was an error while trying to calibrate Cobotta.');
        console.error('There was an error while trying to calibrate Cobotta.', error);
      });
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
    console.log('Mode changed to:', event.target.value);
    sendMode(event.target.value); // handle response and error
  };

  // const handleSendJointValues = async () => {
  //   try {
  //       await sendJointValues(jointValues); 
  //   } catch (error) {
  //       console.error('Error while trying to move joints:', error);
  //   }
  // };
  const handleSendJointValues = async () => {
    sendJointValues(jointValues)
      .then(response => {
        setMessage('Joint values sent successfully. Watch out for the robot!');
        console.log(response.data);
      })
      .catch(error => {
        setMessage('Error while trying to move joints!');
        console.error('Error while trying to move joints!', error);
      });
  };

  return (
    <div className="App">
      <h1>Joint controller</h1>

      <div className="controls-container">
        Current mode  
        <select value={mode} onChange={handleModeChange}>
          <option value="CobottaToGazebo">Cobotta -&gt; Gazebo</option>
          <option value="GazeboToCobotta">Gazebo -&gt; Cobotta</option>
        </select>

        {mode === 'CobottaToGazebo' && (
          <>
            {/* <button background={"white"} onClick={handleSync}>Sync</button> */}
            <button background={"white"} onClick={handleConnect}>Connect</button>
            <button background={"white"} onClick={handleCalibration}>Calibrate</button>
            <button onClick={handleSendJointValues}>Send positions</button>
          </>
        )}
      </div>


      <div className="joints-container">
        <Joint name="joint1" min={-150.11} max={150.11} value={0.0} _onChangeGlobal={handleInputChange} disabled={mode !== 'CobottaToGazebo'} />
        <Joint name="joint2" min={-60.16} max={100.26} value={0.35} _onChangeGlobal={handleInputChange} disabled={mode !== 'CobottaToGazebo'} />
        <Joint name="joint3" min={17.76} max={139.80} value={20} _onChangeGlobal={handleInputChange} disabled={mode !== 'CobottaToGazebo'} />
        <Joint name="joint4" min={-170.17} max={170.17} value={0.0} _onChangeGlobal={handleInputChange} disabled={mode !== 'CobottaToGazebo'} />
      </div>
      <div className="joints-container">
        <Joint name="joint5" min={-95.11} max={135.22} value={-0.15} _onChangeGlobal={handleInputChange} disabled={mode !== 'CobottaToGazebo'} />
        <Joint name="joint6" min={-170.17} max={170.17} value={0.0} _onChangeGlobal={handleInputChange} disabled={mode !== 'CobottaToGazebo'} />
        {/* <Joint name="J. Right" min={0} max={100} />
            <Joint name="J. Left" min={0} max={100} /> */}
      </div>

      <div className="message-container">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
