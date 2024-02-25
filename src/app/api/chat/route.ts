import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const updateChat = async (user: string, messages: Message[]) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("chat")
    .select("*")
    .eq("user", user);
  if (data) {
    await supabase.from("chat").update({ message: messages }).eq("user", user);
  } else {
    await supabase.from("chat").insert({
      user,
      message: messages,
    });
  }
};

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages, user } = await req.json();
  console.log("user", user);

  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildGoogleGenAIPrompt(messages));

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream, {
    onCompletion: (completion) => {
      updateChat(user, messages);
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
