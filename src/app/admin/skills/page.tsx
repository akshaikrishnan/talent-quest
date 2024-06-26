import { createClient } from "@/utils/supabase/server";
import { Skill, columns } from "./columns";
import { cookies } from "next/headers";
import { DataTable } from "./data-table";

export default async function Skills() {
  async function getData(): Promise<Skill[]> {
    // Fetch data from your API here.
    const cookieeStore = cookies();
    const supabase = createClient(cookieeStore);

    const { data: skills = [] } = await supabase.from("skills").select("*");
    let { data: skillsData = [], error } = await supabase
      .from("skills")
      .select("*");
    if (Array.isArray(skillsData)) return skillsData;
    return [];
  }
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8">
        Skills
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
