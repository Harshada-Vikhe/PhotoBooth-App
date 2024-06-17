import React from "react";
import bgImg from "../assets/bg.jpg";
import rightImg from "../assets/right-img.png";
import frameImg from "../assets/frame.png";
import Home from "./Home";
import CustomWebcam from "./CustomWebcam";

const Photobooth = () => {
  return (
    <div className="container ">
      <img className="bgImg" src={bgImg} alt="bg" />
      <img className="rightImg" src={rightImg} alt="girlImage" />
      <Home />
      
      <img className="frameImg" src={frameImg} alt="Frame" />
      <CustomWebcam frameSrc={frameImg} />
    </div>
  );
};

export default Photobooth;
