import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import findMatchingSkills from "@/lib/skill-parser";
import { createCandidate } from "@/app/admin/new-candidate/action";
import { Button } from "./ui/button";

interface UserResume {
  name: string;
  email: string;
  tel: string;
  summary: string;
  professionalLevel: string;
  experience: string;
  education: string;
  skills: any;
  languages: string;
  certifications: string;
  projects: string;
  awards: string;
}

export default function ResumeForm({ resume }: any) {
  const [levels, setLevels] = useState<any>([]);
  const [skills, setSkills] = useState<any>([]);

  const { register, setValue } = useForm({ defaultValues: resume });

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await fetch("/api/levels");
      const { levels } = await res.json();

      setLevels(levels);
    };
    const fetchSkills = async () => {
      const res = await fetch("/api/skills");
      const { skills } = await res.json();
      setSkills(skills);
    };

    fetchLevels();
    fetchSkills();
  }, []);

  useEffect(() => {
    console.log(resume);
    setValue("name", resume?.profile?.name);
    setValue("email", resume?.profile?.email);
    setValue("tel", resume?.profile?.phone);
    setValue("summary", resume?.profile?.summary);
    // setValue("professionalLevel", resume?.professionalLevel);

    const matchSkills = findMatchingSkills(
      resume?.skills?.featuredSkills,
      skills
    );
    setValue("skills", matchSkills);
  }, [resume]);
  return (
    <form action={createCandidate}>
      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="name">Name</Label>
        <Input {...register("name")} type="text" id="name" placeholder="Name" />
      </div>
      <div className="grid md:grid-cols-2 gap-5  mb-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="tel">Phone</Label>
          <Input {...register("tel")} type="tel" id="tel" placeholder="Phone" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Summary</Label>
          <Input
            type="text"
            {...register("summary")}
            id="text"
            placeholder="Summary"
          />
        </div>
        <input type="hidden" {...register("skills")} />
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="text">Professional Level</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Levels</SelectLabel>
                {levels?.map((level: any) => (
                  <SelectItem key={level?.id} value={level?.title}>
                    {level?.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit">submit</Button>
    </form>
  );
}
