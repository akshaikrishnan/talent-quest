import React from "react";
import Image from "next/image";

export default function LoadingAnimation() {
  return (
    <div className="h-screen grid place-items-center w-full">
      <div className="relative">
        <Image
          className="animate-spin "
          src="/images/tq-logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="animate-spin direction-reverse  absolute -top-4 -left-4 rounded-full h-32 w-32 border-b-2 border-gray-200"></div>
      </div>

      <h1 className="text-xl font-bold animate-bounce">Loading...</h1>
    </div>
  );
}
