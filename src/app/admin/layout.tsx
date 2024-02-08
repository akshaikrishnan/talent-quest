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
              link: "/admin/new-candidate",
            },
            {
              title: "Candidates",
              icon: Users2,
              variant: "ghost",
              link: "/admin/candidates",
            },
            {
              title: "Skills",
              // label: "9",
              icon: Lightbulb,
              variant: "ghost",
              link: "/admin/skills",
            },
            {
              title: "Levels",
              label: "",
              icon: BarChart4,
              variant: "ghost",
              link: "/admin/levels",
            },
            {
              title: "Question Bank",
              label: "23",
              icon: DatabaseZap,
              variant: "ghost",
              link: "/admin/question-bank",
            },
            {
              title: "Trash",
              label: "",
              icon: Trash2,
              variant: "ghost",
              link: "/admin/trash",
            },
            {
              title: "Archive",
              label: "",
              icon: Archive,
              variant: "ghost",
              link: "/admin/archive",
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
              link: "/admin/settings",
            },
          ]}
        />
      </div>
      {children}
    </div>
  );
}
