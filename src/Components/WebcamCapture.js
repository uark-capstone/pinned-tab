import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import useInterval from "../Hooks/useInterval";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

var dateFormat = require("dateformat");
var now = new Date();

var WebcamCapture = () => {
  const axios = require('axios');
  const timerLength = 30000;
  let { userId, lectureId } = useParams();
  let [isTimer, setTimer] = useState(true);
  const [showDevTools, setShowDev] = useState(false);

  let webcamRef = React.useRef(null);

  function toggleTimer(e){
    setTimer(!isTimer)
  }

  function addToImageQueue() {
    console.log("sending Image")
    // KEEP FOR SWITCHING BETWEEN LIVE AND LOCAL BACKEND URL
    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
    let BACKEND_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:8080/';

    let currentTime = dateFormat(now, "yyyy-mm-dd h:MM:ss");
    
    try {
      let data = {
        userId: userId,
        lectureId: lectureId,
        ts: currentTime,
        base64String: webcamRef.current.getScreenshot()
      }
  
      axios
        .post(BACKEND_URL + 'AWS/image-from-extension', data)
        .then(response => {
          console.log('Data added to Image Queue');
          console.log(response)
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.warn(e)
    }
  }

  function capture(e){
    addToImageQueue();
  };

  useInterval(() => {
    console.log(isTimer)
    if(isTimer){
      addToImageQueue();
    }
  }, timerLength);

  return (
    <div>
      <Webcam
        style={{marginTop:"-150px", display:"block", marginLeft:"auto", marginRight:"auto"}}
        audio={false}
        height={500}
        width={500}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <div
        style={{marginTop:"-100px", display:"block", marginLeft:"auto", marginRight:"auto", width:"30%"}}>
        <h2>Collecting data...</h2>
        <p>Data is currently being collected for: <br></br>
          User ID: {userId} <br></br>
          Lecture ID: {lectureId} <br></br>
          No pictures are saved! All pictures are disposed of after emotion analysis.
        </p>

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
            />
            <button onClick={capture}>Capture photo</button>
          </div>
        }
      </div>
    </div>
  );
};

export default WebcamCapture;

// https://www.npmjs.com/package/react-webcam
