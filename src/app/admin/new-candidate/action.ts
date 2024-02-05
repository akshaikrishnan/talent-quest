"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function createCandidate(data: FormData) {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const email = data.get("email") as string;
  const name = data.get("name") as string;
  const phone = data.get("tel") as string;
  const skills = data.get("skills") as string;
  const skill = skills.split(",").map((skill) => Number(skill.trim()));
  const level = data.get("level") as string;
  const summary = data.get("summary") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  console.log([{ name, email, phone, skill, level, summary }]);

  const { data: user, error } = await supabase
    .from("candidates")
    .insert([{ name, email, phone, skills: skill, level, summary }])
    .select();

  return {
    status: "success",
    message: user,
    error,
  };
}
