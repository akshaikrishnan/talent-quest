import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { ExamContext } from "@/providers/ExamProvider";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function ExamFooter({
  currentIndex,
  questionsLength,
  questions,
}: {
  currentIndex: number;
  questionsLength: number;
  questions: any;
}) {
  const supabase = createClient();
  const router = useRouter();
  const { id } = useParams();
  const { answers, user } = useContext(ExamContext);
  const navigateQn = (index: number) => {
    console.log(index + currentIndex);
    if (
      index + Number(currentIndex) >= 0 &&
      index + currentIndex < questionsLength
    ) {
      router.replace(`${index + currentIndex + 1}`);
    }
  };

  const finishExam = async () => {
    const allQuestions = questions.map((question: any) => {
      return {
        candidate_id: user.id,
        question_id: question.id,
        answer_id: answers.find(
          (answer: any) => answer.question === question.id
        )
          ? answers.find((answer: any) => answer.question === question.id)
              .answer
          : null,
      };
    });

    // const answeredQuestions = answers.map((answer: any) => {
    //   return {
    //     candidate_id: user.id,
    //     question_id: answer.question,
    //     answer_id: answer.answer,
    //   };
    // });

    const { data: all, error } = await supabase
      .from("exams")
      .insert(allQuestions)
      .select();

    if (all) {
      toast("Submitted Successfully");
      router.push(`/interview/success`);
    }

    // console.log(exam)
  };

  return (
    <footer className="fixed bottom-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Button variant={"outline"} onClick={() => navigateQn(-1)}>
          <ChevronLeftIcon className="me-2" /> Previous
        </Button>
        {currentIndex !== questionsLength - 1 && (
          <Button className="pl-5" onClick={() => navigateQn(1)}>
            Next
            <ChevronRightIcon className="ms-2" />
          </Button>
        )}
        {currentIndex === questionsLength - 1 && (
          <Button className="pl-5" onClick={() => finishExam()}>
            Finish
          </Button>
        )}
      </div>
    </footer>
  );
}
