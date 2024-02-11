import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Chart from "./Chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ResultDetail({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: skills = [] } = await supabase.from("skills").select("*");
  console.log("skills", skills);
  const { data: user, error: userError } = await supabase
    .from("candidates")
    .select("*, level(title)")
    .eq("id", params.id)
    .single();
  const matchingSkills = user.skills.map((skill: number) =>
    skills?.find((s) => s.id === skill)
  );
  const { data: exams, error } = await supabase
    .from("exams")
    .select("*, answers(*), questionbank(*)")
    .eq("candidate_id", params.id);

  console.log(user);
  const correctAnswersCount =
    exams?.filter((item) => item.answers && item.answers.is_correct).length ||
    0;
  const totalQuestionsCount = exams?.length || 0;
  console.log(correctAnswersCount, totalQuestionsCount);

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>
            {user?.summary} {user?.level?.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3">
            <div className="col-span-2 w-1/2">
              {matchingSkills?.map((skill: any) => (
                <Badge
                  className="me-2 mb-2"
                  variant={"secondary"}
                  key={skill?.id}
                >
                  {skill?.skill}
                </Badge>
              ))}
            </div>
            <div className="col-span-1">
              <Chart
                correct={correctAnswersCount}
                wrong={totalQuestionsCount - correctAnswersCount}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
