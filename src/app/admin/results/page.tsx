import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface DataEntry {
  id: number;
  created_at: string;
  question_id: number;
  answer_id: number | null;
  candidate_id: string;
  candidates: { name: string };
  answers: { is_correct?: boolean } | null;
}

interface ResultEntry {
  candidate: string;
  questions: number;
  rightAnswers: number;
  id: string;
  created_at: string;
}
function formatCandidateResults(data: DataEntry[]): ResultEntry[] {
  // Group data by candidate_id
  const groupedData: Record<
    string,
    {
      candidate: string;
      questions: number[];
      correctAnswers: number[];
      id: string;
      created_at: string;
    }
  > = data.reduce((acc, item) => {
    if (!acc[item.candidate_id]) {
      acc[item.candidate_id] = {
        candidate: item.candidates.name,
        id: item.candidate_id,
        questions: [],
        correctAnswers: [],
        created_at: item.created_at,
      };
    }
    acc[item.candidate_id].questions.push(item.question_id);
    if (item.answers?.is_correct) {
      acc[item.candidate_id].correctAnswers.push(item.question_id);
    }
    return acc;
  }, {} as Record<string, any>);

  // Transform grouped data into the desired format
  const result: ResultEntry[] = Object.values(groupedData).map(
    ({ candidate, questions, correctAnswers, id, created_at }) => ({
      candidate,
      questions: questions.length,
      rightAnswers: correctAnswers.length,
      id,
      created_at,
    })
  );

  return result;
}

export default async function page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: exams, error } = await supabase
    .from("exams")
    .select("*, candidates(name), answers(is_correct)");
  const formattedResults: ResultEntry[] = formatCandidateResults(
    exams as DataEntry[]
  );
  return (
    <div className="container mx-auto py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8">
        Results
      </h1>
      <DataTable columns={columns} data={formattedResults} />
    </div>
  );
}
