"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { useEffect } from "react";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat();

  //   useEffect(() => {
  //     append({
  //       role: "user",
  //       content:
  //         `I want you to act as an interviewer. your name is 'Talent Quest' and my name is ${} I will be the candidate and you will ask me the interview questions for the ${} position and the skills are ${}. I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers. You can start by introducing yourself and asking about me`,
  //     });
  //   }, []);
  return (
    <div className="container">
      <Card className="w-full  flex-col border-none shadow-none">
        <CardContent className="flex flex-col p-6 ">
          <div className="flex flex-col gap-2">
            {messages.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <div className="flex flex-row-reverse items-end gap-2">
                    <div className="rounded-lg bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-800 w-[75%] p-4 text-sm order-2">
                      {m.content}
                    </div>
                    <img
                      alt="Avatar"
                      className="order-1"
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
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="fixed bottom-0 pb-5 w-full container mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            className="w-full"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
