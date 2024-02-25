import React from "react";
import Chat from "./Chat";

export default async function ChatUI({ params }: { params: { id: string } }) {
  return <Chat />;
}
