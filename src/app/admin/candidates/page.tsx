import { createClient } from "@/utils/supabase/server";
import { Candidate, columns } from "./columns";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";
import findMatchingSkills from "@/lib/skill-parser";

async function getData(): Promise<Candidate[]> {
  // Fetch data from your API here.
  const cookieeStore = cookies();
  const supabase = createClient(cookieeStore);

  const { data: skills = [] } = await supabase.from("skills").select("*");
  console.log("skills", skills);
  let { data: candidates = [], error } = await supabase
    .from("candidates")
    .select("*, level(title)");
  console.log("candidates", candidates);
  const candidatesWithSkills = candidates?.map((candidate) => {
    const matchingSkills = candidate.skills.map((skill: number) =>
      skills?.find((s) => s.id === skill)
    );
    return { ...candidate, matchingSkills };
  });
  return candidatesWithSkills as Candidate[];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
