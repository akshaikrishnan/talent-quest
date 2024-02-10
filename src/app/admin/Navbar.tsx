"use client";

import { Nav } from "@/components/admin/sidebar/Sidebar";
import { Separator } from "@radix-ui/react-select";
import {
  UserPlus,
  Users2,
  Lightbulb,
  BarChart4,
  DatabaseZap,
  Trash2,
  Archive,
  Wrench,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (link: string) => pathname?.includes(link);
  return (
    <div className="w-[250px]">
      <Nav
        isCollapsed={false}
        links={[
          {
            title: "New Interview",
            icon: UserPlus,
            variant: isActive("/admin/new-candidate") ? "default" : "ghost",
            link: "/admin/new-candidate",
          },
          {
            title: "Candidates",
            icon: Users2,
            variant: isActive("/admin/candidates") ? "default" : "ghost",
            link: "/admin/candidates",
          },
          {
            title: "Skills",
            // label: "9",
            icon: Lightbulb,
            variant: isActive("/admin/skills") ? "default" : "ghost",
            link: "/admin/skills",
          },
          {
            title: "Levels",
            label: "",
            icon: BarChart4,
            variant: isActive("/admin/levels") ? "default" : "ghost",
            link: "/admin/levels",
          },
          {
            title: "Question Bank",
            label: "23",
            icon: DatabaseZap,
            variant: isActive("/admin/question-bank") ? "default" : "ghost",
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
  );
}
