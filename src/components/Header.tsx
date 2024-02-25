"use client";
import React from "react";
import { ModeToggle } from "./DarkModeToggle";
import Image from "next/image";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const showFinish = path?.includes("/chat");

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
          <div className="flex items-center gap-3">
            {showFinish && (
              <Link href="/interview/success">
                <Button variant="destructive" size="sm">
                  End Interview
                </Button>
              </Link>
            )}
            <ModeToggle />
          </div>
        </div>
      </header>
      {/* <ProgressBar
        height="3px"
        color="#ea580c"
        options={{ showSpinner: false }}
        shallowRouting
      /> */}
    </>
  );
}
