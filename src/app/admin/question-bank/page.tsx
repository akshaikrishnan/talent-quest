import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cx } from "@/lib/cx";
import groupByQuestionIdOptimized from "@/lib/group-questions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

async function getData() {
  // Fetch data from your API here.
  const cookieeStore = cookies();
  const supabase = createClient(cookieeStore);

  const { data: answers = [] } = await supabase
    .from("answers_duplicate")
    .select("*, questionbank(question, level(title), skill(skill))");
  console.log("skills", groupByQuestionIdOptimized(answers));
  return groupByQuestionIdOptimized(answers);
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      {data?.map((item: any) => (
        <Card key={item?.id} className="mb-4">
          <CardHeader>
            <CardTitle>{item?.question}</CardTitle>
            <CardDescription>
              {item.skill} - <em>{item?.level}</em>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {item?.options?.map((option: any) => (
              <p
                className={cx("mb2", option.is_correct && "text-green-700")}
                key={option?.id}
              >
                {option?.option}
              </p>
            ))}
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
}
