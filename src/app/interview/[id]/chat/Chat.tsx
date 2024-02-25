"use client";

import { ChatScrollAnchor } from "@/components/chat/ChatScrollIndex";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat({
  skills,
  user,
}: {
  skills: string[];
  user: any;
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    body: {
      user: user?.id,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit();
      event.preventDefault();
    }
  };
  // useEffect(() => {
  //   append({
  //     role: "user",
  //     content: `I want you to act as an interviewer. your name is 'Talent Quest' at company "NaN Tehnologies" and my name is ${
  //       user?.name
  //     } I will be the candidate and you will ask me the interview questions for the ${"developer"} position and the skills are ${skills?.join(
  //       ", "
  //     )}. I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers you can ask questions with code snippets. Ask 3 questions only then you can wind up the interview by a thankyou note. You can start by introducing yourself`,
  //   });
  // }, []);
  return (
    <div>
      <ScrollArea
        style={{ height: "calc(100dvh - 180px)", overflowAnchor: "auto" }}
        className=" w-full rounded-md border"
      >
        <Card
          className="w-full  flex-col-reverse border-none shadow-none "
          style={{ overflowAnchor: "auto" }}
        >
          <CardContent className="flex flex-col p-6 ">
            <div className="flex flex-col gap-2">
              {messages.map((m, index) =>
                index > 0 ? (
                  <div key={m.id}>
                    {m.role === "user" ? (
                      <div className="flex flex-row-reverse items-end gap-2">
                        <div className="rounded-lg bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-800 w-[75%] p-4 text-sm order-2">
                          {m.content}
                        </div>
                        <img
                          alt="Avatar"
                          className="order-1 rounded-full"
                          height="40"
                          src="/images/user.jpg"
                          style={{
                            aspectRatio: "40/40",
                            objectFit: "cover",
                          }}
                          width="40"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-row items-end gap-2">
                        <img
                          alt="Avatar"
                          className="order-1"
                          height="40"
                          src="/images/tq-logo.svg"
                          style={{
                            aspectRatio: "40/40",
                            objectFit: "cover",
                          }}
                          width="40"
                        />
                        <div className="rounded-lg bg-orange-50 border border-orange-200 w-[75%] p-4 text-sm dark:bg-orange-900 dark:border-orange-800 order-2">
                          {m.content}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </CardContent>
          <ChatScrollAnchor trackVisibility={isLoading} />
        </Card>
      </ScrollArea>
      <div className="fixed bottom-0 pb-5 w-full mx-auto px-9">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {isLoading ? "Loading..." : ""}
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex gap-2 items-end"
        >
          <Textarea
            tabIndex={0}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={isLoading}
            className="w-full"
            value={input}
            placeholder={isLoading ? "Hold on..." : "Write your Reply"}
            onChange={handleInputChange}
          />
          <Button disabled={isLoading} type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}