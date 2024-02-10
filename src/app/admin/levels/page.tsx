import { createClient } from "@/utils/supabase/server";
import { Level, columns } from "./columns";
import { cookies } from "next/headers";
import { DataTable } from "./data-table";

export default async function Skills() {
  async function getData(): Promise<Level[]> {
    // Fetch data from your API here.
    const cookieeStore = cookies();
    const supabase = createClient(cookieeStore);

    const { data: level = [] } = await supabase.from("level").select("*");
    console.log("skills", level);
    if (Array.isArray(level)) return level;
    return [];
  }
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
