import React from "react";
import Chat from "./Chat";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ChatUI({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  console.log(params);
  const supabase = createClient(cookieStore);
  const { data: user, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: skills, error: skillError } = await supabase
    .from("skills")
    .select("*")
    .in("id", user.skills);

  const allSkills: string[] = skills?.map((skill: any) => skill.skill) || [
    "IT industry",
  ];
  console.log(user);

  return <Chat user={user} skills={allSkills} />;
}
