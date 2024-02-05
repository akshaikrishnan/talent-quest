import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: skills, error } = await supabase.from("skills").select("*");

  return Response.json({ skills });
}
