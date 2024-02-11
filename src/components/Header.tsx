"use client";
import React from "react";
import { ModeToggle } from "./DarkModeToggle";
import Image from "next/image";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={"/images/tq-logo.svg"}
              width={50}
              height={50}
              className="-rotate-[92deg]"
              alt="logo"
            />
            <h1 className="text-xl font-bold">Talent Quest</h1>
          </div>
          <ModeToggle />
        </div>
      </header>
      <ProgressBar
        height="3px"
        color="#ea580c"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
