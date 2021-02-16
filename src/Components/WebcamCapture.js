import React from "react";
import Webcam from "react-webcam";

// import { Link } from 'react-router-dom';

// import React from "react";
// import Webcam from "react-webcam";

// const WebcamComponent = () => <Webcam />;
// export default WebcamComponent;

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

var WebcamCapture = () => {
  const webcamRef = React.useRef(null);



  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Image Src: ", imageSrc);
  }, [webcamRef]);

 // setInterval(capture(), 200000)

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
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
