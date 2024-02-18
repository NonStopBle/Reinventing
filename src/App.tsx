import React from 'react';
import logo from './logo.svg';
import './App.css';
import Joystick from './Joysticks';
// @ts-ignore
import ReactNipple, { JoystickEventData } from "react-nipple";

function App() {
  const handleJoystickMove = (evt: any, data: JoystickEventData) => {
    console.log(data)
  };
  return (
    <div className="App">
      <header className="App-header">
        <></>
        <Joystick onMove={handleJoystickMove}></Joystick>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
