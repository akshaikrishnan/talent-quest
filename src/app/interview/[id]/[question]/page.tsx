"use client";

import ExamFooter from "@/components/examfooter";
import { ExamContext } from "@/providers/ExamProvider";
import { createClient } from "@/utils/supabase/client";
import { useContext, useEffect, useState } from "react";

export default function page() {
  const supabase = createClient();
  const { user } = useContext(ExamContext);
  console.log(user);
  const [questions, setQuestions] = useState<any>([]);

  useEffect(() => {
    if (user?.skills) {
      const fetchQuestions = async () => {
        const { data } = await supabase
          .from("questionbank")
          .select("*")
          .in("skill", user.skills)
          .eq("level", user.level);
        setQuestions(data);
      };
      fetchQuestions();
    }
  }, [user]);
  return (
    <div>
      <ExamFooter />
    </div>
  );
}
