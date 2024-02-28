"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="grid place-items-center py-32 w-full">Please Wait...</div>
  );
}
