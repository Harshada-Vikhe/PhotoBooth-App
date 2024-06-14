import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useState } from "react";

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 300,
      height: 330,
      quality: 1.0,
    });
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      <img src={imgSrc} className="webcamImg" />
      <Webcam
        ref={webcamRef}
        className="webcam-view"
        screenshotQuality={1}
        videoConstraints={{
          width: 300,
          height: 330,
          aspectRatio: 0.5,
          facingMode: "user",
        }}
      />
      <div className="buttons">
        <div className="custom-button">
          <button onClick={capture}>
            CAPTURE
            <div className="line"></div>
          </button>
        </div>
        <div className="custom-button">
          <button onClick={retake}>
            RETAKE
            <div className="line"></div>
          </button>
        </div>
        <div className="custom-button">
          <a href={imgSrc} download="webcam-photo.jpg">
            <button>
              SAVE
              <div className="line"></div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomWebcam;
