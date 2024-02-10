"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Skill = {
  id: string;
  skill: string;
  keywords: any;
};

export const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "skill",
    header: "Skill",
  },
  // {
  //   accessorKey: "keywords", // Split the skills string into an array of skills and trim any whitespace from the start and end of each skill.
  //   header: "Keywords",
  //   cell: (info) => {
  //     const value = info.getValue() as any; //casting may not be required here
  //     return (
  //       <>
  //         <div className="max-w-96 flex flex-wrap gap-2">
  //           {value.map((v: any) => (
  //             <Badge variant={"outline"} key={value.id}>
  //               {v.skill}
  //             </Badge>
  //           ))}
  //         </div>
  //       </>
  //     );
  //   },
  // },
];
