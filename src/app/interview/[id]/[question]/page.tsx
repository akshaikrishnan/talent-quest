"use client";

import ExamQuestion from "@/components/ExamQuestion";
import ExamFooter from "@/components/examfooter";
import { ExamContext } from "@/providers/ExamProvider";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const supabase = createClient();
  const { user } = useContext(ExamContext);
  const { question } = useParams();
  console.log(user);
  const [questions, setQuestions] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (questions?.length < question) {
      setCurrentIndex(Number(question) - 1);
    }
  }, [question, questions]);

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
      <ExamQuestion
        key={currentIndex}
        qno={question}
        question={questions[currentIndex]}
      />
      <ExamFooter
        currentIndex={currentIndex}
        questionsLength={questions?.length}
        questions={questions}
      />
    </div>
  );
}
