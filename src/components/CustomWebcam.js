import React, { useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useState } from "react";
import frameSrc from "../assets/frame.png";

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [framedImage, setFramedImage] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 530 });

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: canvasSize.width,
      height: canvasSize.height,
      quality: 1.0,
    });
    setImgSrc(imageSrc);
  }, [webcamRef, canvasSize]);

  const addFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const photo = new Image();
    const frame = new Image();

    photo.onload = () => {
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      ctx.drawImage(photo, 0, 0, canvasSize.width, canvasSize.height);

      frame.onload = () => {
        ctx.drawImage(frame, -6, 0, 510, 540);
        const framedImageSrc = canvas.toDataURL("image/jpeg");
        setFramedImage(framedImageSrc);
      };
      frame.src = frameSrc;
    };
    photo.src = imgSrc;
  }, [imgSrc, frameSrc, canvasSize]);

  useEffect(() => {
    if (imgSrc) {
      addFrame();
    }
  }, [imgSrc, addFrame]);

  const retake = () => {
    setImgSrc(null);
    setFramedImage(null);
  };

  const downloadFramedImage = () => {
    if (framedImage) {
      const link = document.createElement("a");
      link.href = framedImage;
      link.download = "framed-photo.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const frame = new Image();
      frame.onload = () => {
        setCanvasSize({ width: frame.width, height: frame.height });
      };
      frame.src = frameSrc;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameSrc]);

  return (
    <div className="container">
      {imgSrc && <img src={imgSrc} alt="img" className="webcamImg" />}
      <Webcam
        ref={webcamRef}
        className="webcam-view"
        screenshotQuality={1}
        videoConstraints={{
          width: canvasSize.width,
          height: canvasSize.height,
          aspectRatio: canvasSize.width / canvasSize.height,
          facingMode: "user",
        }}
      />

      <div className="buttons">
        <div className="custom-button">
          <button className="btn1" onClick={capture}>
            CAPTURE
            <div className="line"></div>
          </button>
        </div>
        <div className="custom-button">
          <button className="btn2" onClick={retake}>
            RETAKE
            <div className="line"></div>
          </button>
        </div>
        <div className="custom-button">
          <button className="btn3">
            POST
            <div className="line"></div>
          </button>
        </div>

        <div className="custom-button">
          <button className="btn4" onClick={downloadFramedImage}>
            SAVE
            <div className="line"></div>
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
    </div>
  );
};

export default CustomWebcam;
