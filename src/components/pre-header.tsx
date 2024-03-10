"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LIK6nHjIMIY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { PartyPopper, SpeakerIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Announcement() {
  const pathname = usePathname();
  if (pathname !== "/") {
    return null;
  }
  return (
    <div className="bg-orange-500 flex items-center justify-center">
      <div className="px-2 py-1 md:py-2 md:px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PartyPopper className="w-3 h-3 text-gray-100" />
              <div className="font-semibold text-gray-100">
                AI Interview Prep: Now Available!
              </div>
            </div>
            <Link className="text-gray-100 hover:underline" href="/practice">
              Practice Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
