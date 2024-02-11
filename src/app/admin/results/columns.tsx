"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Exams = {
  candidate: string;
  questions: number;
  rightAnswers: number;
  id: string;
  created_at: string;
};

export const columns: ColumnDef<Exams>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: (info) => {
      const value = info.getValue() as any; //casting may not be required here
      return <>{new Date(value).toLocaleDateString("en-UK")}</>;
    },
  },
  {
    accessorKey: "candidate",
    header: "Candidate",
  },
  {
    header: "Number of Questions",
    accessorKey: "questions",
  },
  {
    header: "Right Answers",
    accessorKey: "rightAnswers",
  },
  {
    accessorKey: "id", // Split the skills string into an array of skills and trim any whitespace from the start and end of each skill.
    header: "Details",
    cell: (info) => {
      const value = info.getValue() as any; //casting may not be required here
      return (
        <>
          <Link href={`/admin/results/${value}`}>
            <Button>View Details</Button>
          </Link>
        </>
      );
    },
  },
];
