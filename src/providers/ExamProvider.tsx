"use client";

import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const ExamContext = createContext<any>(null);
export default function ExamProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useLocalStorage<any>("answers", []);
  const selectAnswer = (answer: any) => {
    console.log(answers);
    const prevAnswer = answers?.findIndex((a: any) => a.question === answer.question);
    if (prevAnswer >= 0) {
      const newAnswers = [...answers];
      newAnswers.splice(prevAnswer, 1);
      setAnswers([...newAnswers, answer]);
    } else {
      setAnswers([...answers, answer]);
    }

    console.log(answers);
  };

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
    <ExamContext.Provider value={{ user, selectAnswer, answers, setAnswers }}>
      {children}
    </ExamContext.Provider>
  );
}
