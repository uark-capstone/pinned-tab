import React from "react";
import {useEffect, useState} from "react"
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};


var dateFormat = require("dateformat");
var now = new Date();


var WebcamCapture = () => {
  
  const [imageSrc, setImageSrc]=useState("")
  const webcamRef = React.useRef(null);

  function capture(e) {
    console.log("Picture taken");
    var currentTime = dateFormat(now, "yyyy-mm-dd h:MM:ss");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "af027@uark.edu",
        lectureId: "1",
        ts:`${currentTime}`,
        base64String: webcamRef.current.getScreenshot()
      }),
    };

    // KEEP FOR SWITCHING BETWEEN LIVE AND LOCAL BACKEND URL
    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
    let BACKEND_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:8080/';

    fetch(BACKEND_URL + 'AWS/image-from-extension', requestOptions)
      .then((res) => {
        console.log("res.status: ", res.status);
        if (res.status === 200) {
          var response = res.text();
          console.log("RESPONSE", response);
        }
        if (res.status === 500) {
          console.log("error ");
        }
      })
      .catch((error) => console.log("HELLOOO", error));
  }

  // useEffect(() => {
  
  //   function sendImage() {
    
  //     setInterval(() =>  setImageSrc(webcamRef.current.getScreenshot()), 5000)
    
  //     var currentTime = dateFormat(now, "yyyy-mm-dd h:MM:ss");
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         userId: "af027@uark.edu",
  //         lectureId: "1",
  //         ts:`${currentTime}`,
  //         base64String:`${imageSrc}`
  //       }),
  //     };
  
  //     // KEEP FOR SWITCHING BETWEEN LIVE AND LOCAL BACKEND URL
  //     const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
  //     let BACKEND_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:8080/';

  //     fetch(BACKEND_URL + 'AWS/image-from-extension', requestOptions)
  //       .then((res) => {
  //         console.log("res.status: ", res.status);
  //         if (res.status === 200) {
  //           var response = res.text();
  //           console.log("RESPONSE", response);
  //         }
  //         if (res.status === 500) {
  //           console.log("error ");
  //         }
  //       })
  //       .catch((error) => console.log("HELLOOO", error));
  
  //   }

  //   sendImage();
  // }, [imageSrc])

 // setInterval(capture(), 200000)

  return (
    <div>
      <Webcam
      // style={{position:"absolute", padding:"500px", marginTop:"-200px"}}
        audio={false}
        height={500}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>

      {/* {imageSrc && (
        <img
          src={imageSrc}
        />
      )} */}

    </div>
  );
};

export default WebcamCapture;

// https://www.npmjs.com/package/react-webcam
