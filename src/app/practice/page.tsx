import { createClient } from "@/utils/supabase/server";
import InputForm from "./PracticeForm";
import { cookies } from "next/headers";

export default async function Practice() {
  const cookiestore = cookies();
  const supabase = createClient(cookiestore);
  const { data: skills, error: skillerror } = await supabase
    .from("skills")
    .select("*");
  const { data: levels, error: levelerror } = await supabase
    .from("level")
    .select("*");

  console.log(levels);
  return (
    <main className="container mx-auto py-5">
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
        {" "}
        Get Interview Ready: Practice with Our{" "}
        <span className="text-orange-500">AI Assistant</span>
      </h1>
      <p className="text-center leading-7 [&:not(:first-child)]:mt-6 mb-6 text-gray-500 ">
        Feeling unprepared for your upcoming interview? Simulate a real
        interview experience with our advanced AI interview assistant. Fill out
        the form below to customize your mock interview based on your desired
        job position and skills.
      </p>
      <InputForm skills={skills} levels={levels} />
    </main>
  );
}
