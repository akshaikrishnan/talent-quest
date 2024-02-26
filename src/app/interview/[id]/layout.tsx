import ExamFooter from "@/components/examfooter";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ExamProvider from "@/providers/ExamProvider";
import Webcam from "@/components/webcam";

export default async function ExamLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: user, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", params.id)
    .single();

  console.log(user);

  return (
    <>
      <ExamProvider>
        <Webcam />
        <main>{children}</main>
      </ExamProvider>
    </>
  );
}
