import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: levels, error } = await supabase.from("level").select("*");

  return Response.json({ levels });
}
