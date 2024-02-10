"use client";

import Navbar from "./Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Navbar />
      {children}
    </div>
  );
}
