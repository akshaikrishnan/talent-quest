import { ChatScrollAnchor } from "@/components/chat/ChatScrollIndex";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Chathistory({ chat }: { chat: any[] }) {
  return (
    <Card
      className="w-full  flex-col-reverse border-none shadow-none "
      style={{ overflowAnchor: "auto" }}
    >
      <CardContent className="flex flex-col p-6 ">
        <div className="flex flex-col gap-2">
          {chat?.map((m, index) =>
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
                                children={String(children).replace(/\n$/, "")}
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
        {chat?.length === 0 && (
          <div className="py-32 grid place-items-center mb-5">
            No Chat history found!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
