import React from "react";
import Lottie from "react-lottie";
import animationData from "../searchAnimation/searchAnimation.json"; // Ensure this path is correct

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie isClickToPauseDisabled options={defaultOptions}  height={'150px'} width={'150px'} />
    </div>
  );
};

export default LottieAnimation;
