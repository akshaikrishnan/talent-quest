import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cx } from "@/lib/cx";
import Chart from "@/components/Chart";

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
    .select("*, answers(*), questionbank(*,skills(skill),level(title))")
    .eq("candidate_id", params.id);

  console.log(exams?.[0]);
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
          <div className="grid grid-cols-3 gap-12 items-start">
            <div className="col-span-2">
              {matchingSkills?.map((skill: any) => (
                <Badge
                  className="me-2 mb-2"
                  variant={"secondary"}
                  key={skill?.id}
                >
                  {skill?.skill}
                </Badge>
              ))}
              <div className="grid w-full items-center gap-1.5 pt-4">
                <Label htmlFor="tel">Education</Label>
                <Accordion type="single" collapsible className="w-full">
                  {user?.educations?.map((education: any, index: number) => (
                    <AccordionItem value="item-1" key={index}>
                      <AccordionTrigger>
                        {education?.school || education?.date}
                      </AccordionTrigger>
                      <AccordionContent>
                        <h6>{education?.degree}</h6>
                        <small>{education?.date}</small>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="grid w-full items-center gap-1.5 pt-4">
                <Label htmlFor="tel">Experience</Label>
                <Accordion type="single" collapsible className="w-full">
                  {user?.experience?.map((experience: any, index: number) => (
                    <AccordionItem value="item-1" key={index}>
                      <AccordionTrigger>
                        {experience?.companyName} - {experience?.jobTitle}
                      </AccordionTrigger>
                      <AccordionContent>
                        <h6 className="text-xs font-mono">
                          {experience?.date}
                        </h6>
                        {experience?.descriptions?.map((desc: string) => (
                          <p className="text-xs" key={desc}>
                            {desc}
                          </p>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <div className="col-span-1">
              <Chart
                correct={correctAnswersCount}
                wrong={totalQuestionsCount - correctAnswersCount}
                totalQuestionsCount={totalQuestionsCount}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {exams?.map((item: any) => (
        <Card key={item?.id} className="mb-4">
          <CardHeader>
            <CardTitle>{item?.questionbank.question}</CardTitle>
            <CardDescription>
              {item?.questionbank?.skills?.skill} -{" "}
              <em>{item?.questionbank?.level?.title}</em>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p
              className={cx(
                "mb2",
                item?.answers?.is_correct
                  ? "text-green-700 font-bold"
                  : "text-red-500"
              )}
            >
              {item?.answers?.option}
            </p>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
}
