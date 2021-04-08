import React, { useState } from "react";
import Webcam from "react-webcam";
import useInterval from "../Hooks/useInterval";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

var GenericCapture = ({showTimer, defaultTimerLength, showDev, onCapture}) => {
  let timerLength = (defaultTimerLength != null) ? defaultTimerLength: 30000;
  let [isTimer, setTimer] = useState((showTimer != null) ? showTimer : false);
  
  let [showDevTools, setShowDev] = useState((showDev != null) ? showDev : false);
  let webcamRef = React.useRef(null);

  function toggleTimer(e){
    setTimer(!isTimer)
  };

  function capture(){
    let base64String = webcamRef.current.getScreenshot()
    onCapture(base64String)
  };

  useInterval(() => {
    if(isTimer){
      capture()
    }
  }, timerLength);

  return (
    <div>   
      <Webcam
        style={{ 
          display:"block", 
          marginTop:"100px",
          marginLeft:"auto", 
          marginRight:"auto"
        }}
        audio={false}
        width={500}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <div
        style={{
          display:"block", 
          marginLeft:"auto", 
          marginRight:"auto", 
          width:"30%"}}>
        <h2>Collecting data...</h2>
        <p
          onClick={() => setShowDev(!showDevTools)}>
          Dev Tools
        </p>
        {showDevTools &&
          <div>
            <label htmlFor="isTimer">Toggle Timer</label>
            <input
              type="checkbox"
              id="isTimer"
              checked={isTimer}
              label="timer on"
              onChange={toggleTimer}
            /><br></br>
            <button onClick={capture}>Capture photo</button>
          </div>
        }
      </div>
    </div>
  )
}

export default GenericCapture;