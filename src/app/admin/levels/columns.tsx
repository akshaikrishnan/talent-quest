"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Level = {
  id: string;
  level: string;
};

export const columns: ColumnDef<Level>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "Level",
  },
  {
    accessorKey: "description", // Split the skills string into an array of skills and trim any whitespace from the start and end of each skill.
    header: "Description",
    cell: (info) => {
      const value = info.getValue() as any; //casting may not be required here
      return (
        <>
          {/* <div className="max-w-96 "> */}
          {value.map((v: any) => (
            <p key={v}>{v}</p>
          ))}
          {/* </div> */}
        </>
      );
    },
  },
];
