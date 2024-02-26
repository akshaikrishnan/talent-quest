import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const user = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: questions, error } = await supabase
    .from("questionbank")
    .select("*")
    .in("skill", user.skills)
    .eq("level", user.level);
  return Response.json({ questions });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skills = searchParams
    .get("skills")
    ?.split(",")
    .map((skill) => skill.toLowerCase());

  return Response.json({ hi: "hello" });
}
