"use client";

import { ChatScrollAnchor } from "@/components/chat/ChatScrollIndex";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    api: "/api/practice",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const params = useSearchParams();
  const user = params.get("user");
  const skills = params.getAll("skill");
  const level = params.get("level");
  const position = params.get("position");

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
  useEffect(() => {
    append({
      role: "user",
      content: `I want you to act as an interviewer. your name is 'Talent Quest' at company "NaN Tehnologies" ${
        user && "and my name is " + user
      } I will be the candidate and you will ask me the interview questions for the ${
        position || "developer"
      } position, expertise level is ${level} ${
        skills && "and the skills are " + skills?.join(", ")
      }. I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers, you can ask questions with code snippets. Ask 5 to 8 questions only then you can wind up the interview by a thankyou note.  My first sentence is "Hi"`,
    });
  }, []);
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
                          <Markdown
                            children={m.content}
                            components={{
                              code(props) {
                                const { children, className, node, ...rest } =
                                  props;
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                // Filter out the ref from rest if it exists
                                const { ref, ...filteredRest } = rest;
                                return match ? (
                                  <SyntaxHighlighter
                                    {...filteredRest} // Use filteredRest instead of rest
                                    PreTag="div"
                                    children={String(children).replace(
                                      /\n$/,
                                      ""
                                    )}
                                    language={match[1]}
                                    style={vscDarkPlus}
                                  />
                                ) : (
                                  <code {...rest} className={className}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          />
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
        {isLoading && (
          <div className="flex space-x-2 items-center  pb-2">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce"></div>
          </div>
        )}

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
