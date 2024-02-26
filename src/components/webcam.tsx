"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import Webcam from "react-webcam";

export default function WebcamComponent() {
  const [userMedia, setUserMedia] = useState<any>(null);
  const requestPermission = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setUserMedia(stream);
    // const video: any = document.querySelector("video#webcam");
    // if (video) video.srcObject = stream;
  };
  return (
    <div className="fixed w-28 aspect-video top-14 right-8">
      {/* {userMedia && (
        <video
          id="webcam"
          src={userMedia}
          className="w-full h-full"
          autoPlay
        ></video>
      )}
      {!userMedia && (
        <Button onClick={requestPermission}>Request Permission</Button>
      )} */}
      <Webcam height={600} width={600} />
    </div>
  );
}
