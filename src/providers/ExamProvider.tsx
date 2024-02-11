"use client";

import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

export const ExamContext = createContext<any>(null);
export default function ExamProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: user, error } = await supabase
        .from("candidates")
        .select("*")
        .eq("id", params.id)
        .single();
      setUser(user);
      console.log(params.id);
    };
    console.log("hello");
    getUser();
  }, []);
  return (
    <ExamContext.Provider value={{ user }}>{children}</ExamContext.Provider>
  );
}
