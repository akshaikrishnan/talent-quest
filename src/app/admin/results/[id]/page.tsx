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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chathistory from "@/components/admin/sidebar/Chathistory";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default async function ResultDetail({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: skills = [] } = await supabase.from("skills").select("*");
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

  const { data: userChat, error: userChatError } = await supabase
    .from("chat")
    .select("*")
    .eq("user", params.id);

  const correctAnswersCount =
    exams?.filter((item) => item.answers && item.answers.is_correct).length ||
    0;
  const totalQuestionsCount = exams?.length || 0;

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
          <Alert variant={user?.tabSwitches > 5 ? "destructive" : "default"}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Cheat Detection</AlertTitle>
            <AlertDescription>
              Candidate has switched tab{" "}
              <strong
                className={
                  user?.tabSwitches === 0
                    ? "text-green-500"
                    : user?.tabSwitches < 5
                    ? "text-orange-500"
                    : "text-red-500"
                }
              >
                {" "}
                {user?.tabSwitches}
              </strong>{" "}
              times during the interview!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <Tabs defaultValue="qa" className="w-full pt-5">
        <TabsList>
          <TabsTrigger value="qa">QA Round</TabsTrigger>
          {userChat && <TabsTrigger value="chat">Discussion Round</TabsTrigger>}
        </TabsList>
        <TabsContent value="qa">
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
        </TabsContent>
        <TabsContent value="chat">
          {userChat && <Chathistory chat={userChat?.[0]?.message} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
