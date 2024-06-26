"use client";
import { HeroSection } from "@/components/home/HeroSection";
import { PortfolioParallax } from "@/components/home/PortfolioSection";
import { AnimatedTooltip } from "@/components/home/TechStack";
import { products, techStack } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeroSection />
      <PortfolioParallax products={products} />
      <main className="flex-1">
        {/* <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Hire Smarter, Not Harder
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Reduce bias, save time, and find the perfect fit with
                  TalentQuest&apos;s AI interview platform.
                </p>
              </div>
              <div className="space-x-4 pt-8">
                <Link href="/admin/new-candidate">
                  <Button>Get Started</Button>
                </Link>
                <Link href="#learn">
                  <Button variant={"secondary"}>Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section> */}
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          id="learn"
        >
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/images/page.png"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    Innovation
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Effortless Interview Creation.
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Generate unique, structured interview questions in minutes,
                    tailored to each role and candidate.Identify top talent
                    objectively with AI-powered scoring and insights.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
                    href="/admin/new-candidate"
                  >
                    Get Started
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border  border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 dark:text-black focus-visible:ring-gray-300"
                    href="/practice"
                  >
                    Practice with AI
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Resume Fetching
              </div>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Cutting-Edge Resume Fetching Algorithm
              </h2>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/candidate/new-candidate"
              >
                Get Started
              </Link>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Security
              </div>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                At TalentQuest, we understand the importance of accurate and
                efficient candidate assessment. That&apos;s why we&apos;ve
                developed a sophisticated resume fetching algorithm that goes
                beyond simple text extraction. Our AI-powered solution delves
                deeper, unearthing the valuable skills hidden within each PDF
                document.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md border  border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="/admin/settings"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        <section className="pt-10 w-full border-t ">
          <h6 className="text-xl font-bold text-center text-gray-500">
            Our Tech Stack
          </h6>
          <div className="flex  flex-row items-center justify-center mb-10 pt-10 w-full">
            <AnimatedTooltip items={techStack} />
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 NaN Inc. All rights reserved. Made with ❤️ and JavaScript.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
