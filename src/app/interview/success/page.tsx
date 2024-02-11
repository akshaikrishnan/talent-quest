import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[600px] py-12 space-y-4">
      <div className="flex flex-col items-center space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Thank you for appearing in the exam.
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          We will contact you soon with the results. For further information,
          please check your email.
        </p>
      </div>
      <Link
        className="inline-flex h-10 items-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        href="/"
      >
        Homepage
      </Link>
    </div>
  );
}
