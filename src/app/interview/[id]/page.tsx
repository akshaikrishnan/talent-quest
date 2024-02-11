import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { instructions } from "@/lib/instructions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { use } from "react";

export default async function Exam({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: user, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: skills, error: skillError } = await supabase
    .from("skills")
    .select("*")
    .in("id", user.skills);

  return (
    <div className="container mx-auto">
      <div className="card p-10 text-center mb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          TalentQuest : Interview
        </h1>
      </div>

      <Table className="w-full md:w-1/2 mx-auto">
        <TableCaption>Instructions</TableCaption>
        <TableBody>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableCell>{user?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableCell>{user?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Phone</TableHead>
            <TableCell>{user?.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableCell>{user?.summary}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Skills</TableHead>
            <TableCell>
              <div className="flex flex-wrap gap-y-2 mb-5">
                {skills?.map((skill: any) => (
                  <Badge variant={"secondary"} key={skill?.id} className="mr-2">
                    {skill?.skill}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <ScrollArea className="h-72 w-full md:w-1/2 rounded-md border mx-auto">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">
            Instructions
          </h4>
          {instructions.instructions.map((tag) => (
            <>
              <div key={tag} className="text-sm mb-2">
                {tag}
              </div>
            </>
          ))}
        </div>
      </ScrollArea>

      <div className="p-5 text-center">
        <Link href={`/interview/${params.id}/1`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}
