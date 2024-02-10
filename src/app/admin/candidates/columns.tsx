"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  level: "fresher" | "intermediate" | "experienced";
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "matchingSkills", // Split the skills string into an array of skills and trim any whitespace from the start and end of each skill.
    header: "Skills",
    cell: (info) => {
      const value = info.getValue() as any; //casting may not be required here
      return (
        <>
          <div className="max-w-96 flex flex-wrap gap-2">
            {value.map((v: any) => (
              <Badge variant={"outline"} key={value.id}>
                {v.skill}
              </Badge>
            ))}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "level.title",
    header: "Level",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
];
