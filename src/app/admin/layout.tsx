"use client";

import { Nav } from "@/components/admin/sidebar/Sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  UserPlus,
  Lightbulb,
  ArchiveX,
  Trash2,
  Archive,
  Users2,
  AlertCircle,
  MessagesSquare,
  ShoppingCart,
  BarChart4,
  DatabaseZap,
  Wrench,
} from "lucide-react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-[250px]">
        <Nav
          isCollapsed={false}
          links={[
            {
              title: "New Interview",
              icon: UserPlus,
              variant: "default",
            },
            {
              title: "Candidates",
              icon: Users2,
              variant: "ghost",
            },
            {
              title: "Skills",
              // label: "9",
              icon: Lightbulb,
              variant: "ghost",
            },
            {
              title: "Levels",
              label: "",
              icon: BarChart4,
              variant: "ghost",
            },
            {
              title: "Question Bank",
              label: "23",
              icon: DatabaseZap,
              variant: "ghost",
            },
            {
              title: "Trash",
              label: "",
              icon: Trash2,
              variant: "ghost",
            },
            {
              title: "Archive",
              label: "",
              icon: Archive,
              variant: "ghost",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={false}
          links={[
            {
              title: "Settings",
              label: "972",
              icon: Wrench,
              variant: "ghost",
            },
          ]}
        />
      </div>
      {children}
    </div>
  );
}
