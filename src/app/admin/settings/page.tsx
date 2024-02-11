/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xiSjIAI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  return (
    <div className="grid w-full place-items-center">
      <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="text-sm">bash</p>
        </div>
        <div className="mt-4">
          <p className="text-green-400 animate-in fade-in-20">
            $ team <span className="text-orange-600">NaN </span>
            <span className="text-gray-400 animate-in fade-in-10">
              --presents
            </span>
          </p>
          <p className="text-white animate-in fade-in-20 delay-75">
            + TalentQuest@0.1beta
          </p>
          <p className="text-white animate-in fade-in-30 delay-100">
            added 3 packages, and audited 1 package in 3s
          </p>
          <p className="text-green-400 animate-in fade-in-40 delay-150">
            $ Nithin Harikumar
          </p>
          <p className="text-green-400 animate-in fade-in-50 delay-200">
            $ akshai Krishnan
          </p>
          <p className="text-green-400 animate-in fade-in-60 delay-300">
            $ Nivin Narayanan
          </p>
          <p className="text-gray-400 animate-in fade-in-70 delay-1000">
            $ Ajnaz
          </p>
        </div>
      </aside>
    </div>
  );
}
