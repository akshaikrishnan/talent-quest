import React from "react";

export default function Divider({ text }: { text: string }) {
  return (
    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">{text}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}
