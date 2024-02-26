import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getData() {
  // Fetch data from your API here.
  const cookieeStore = cookies();
  const supabase = createClient(cookieeStore);

  const { data: answers = [] } = await supabase
    .from("answers")
    .select("*, questionbank(question, level(title), skill(skill))")
    .order("id", { ascending: false });
  return groupByQuestionIdOptimized(answers);
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <div className="pb-8 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Question Bank
        </h1>
        <Link href={"question-bank/add"}>
          <Button>
            <Plus className="me-2" /> Add Question
          </Button>
        </Link>
      </div>

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
                className={cx(
                  "mb2",
                  option?.is_correct && "text-green-700 font-bold"
                )}
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
