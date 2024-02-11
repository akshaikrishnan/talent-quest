import { ExamContext } from "@/providers/ExamProvider";
import { createClient } from "@/utils/supabase/client";
import { useContext, useEffect, useState } from "react";

type AnswerType = {
  option: string;
  id: number;
};
export default function ExamQuestion({ question, qno }: any) {
  const supabase = createClient();
  const [options, setOptions] = useState<AnswerType[]>([]);
  const { selectAnswer, answers } = useContext(ExamContext);

  useEffect(() => {
    const getAnswers = async () => {
      const { data: answers } = await supabase
        .from("answers")
        .select("option,id")
        .eq("question_id", question.id);
      setOptions(answers as AnswerType[]);
    };
    if (question?.id) getAnswers();
  }, [question]);

  return (
    <div className="w-full max-w-xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in-20">
      <h1 className="text-2xl font-bold mb-4">Question {qno}</h1>
      <p className="text-lg text-gray-600 mb-8">{question?.question}</p>
      <form className="space-y-4">
        {options?.map((option) => {
          return (
            <div
              key={option.id}
              className="flex items-center border-2 border-transparent hover:border-gray-300 rounded-md p-2"
            >
              <input
                className="appearance-none h-6 w-6 rounded-full border-2 border-gray-300 checked:bg-gray-600 checked:border-transparent focus:outline-none"
                name={"question" + question.id}
                id={"option" + option.id}
                type="radio"
                value={option.id}
                checked={
                  answers?.find((a: any) => a.question === question.id)
                    ?.answer === option.id
                }
                onChange={(e) =>
                  selectAnswer({ question: question.id, answer: option.id })
                }
              />
              <label className="ml-2" htmlFor={"option" + option.id}>
                {option.option}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
}
