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
import { SubmitHandler, useForm } from "react-hook-form";
import findMatchingSkills from "@/lib/skill-parser";
import { createCandidate } from "@/app/admin/new-candidate/action";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

interface UserResume {
  name: string;
  email: string;
  tel: string;
  summary: string;
  professionalLevel: string;
  experience: any[];
  education: any[];
  skills: any;
  languages: string;
  certifications: string;
  projects: string;
  awards: string;
}

export default function ResumeForm({ resume }: any) {
  const [levels, setLevels] = useState<any>([]);
  const [skills, setSkills] = useState<any>([]);
  const [selectedSkills, setSelectedSkills] = useState<any>([]);
  const [displaySkills, setDisplaySkills] = useState<any>([]);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserResume>({ defaultValues: resume });

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
    setValue("experience", resume?.workExperiences);
    setValue("education", resume?.educations);
    setValue("projects", resume?.projects);
    // setValue("professionalLevel", resume?.professionalLevel);

    const matchSkills = findMatchingSkills(
      resume?.skills?.featuredSkills,
      skills
    );

    const filteredSkills = [...new Set(matchSkills)];
    setValue("skills", filteredSkills);
    setSelectedSkills(filteredSkills);
  }, [resume]);

  useEffect(() => {
    const skillSelect = selectedSkills?.map((skill: any) =>
      skills.find((e: any) => skill === e.id)
    );
    setDisplaySkills(skillSelect);
  }, [selectedSkills]);

  const onSubmit: SubmitHandler<UserResume> = async (data) => {
    const supabase = createClient();
    const { data: user, error } = await supabase
      .from("candidates")
      .insert([{ name: data.name, email: data.email, phone: data.tel }])
      .select();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Candidate ${data.name} Created`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="grid md:grid-cols-2 gap-5 mb-5">
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
      {watch("experience")?.length && (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="tel">Experience</Label>
          <Accordion type="single" collapsible className="w-full">
            {watch("experience")?.map((experience: any, index: number) => (
              <AccordionItem value="item-1" key={index}>
                <AccordionTrigger>
                  {experience?.companyName} - {experience?.jobTitle}
                </AccordionTrigger>
                <AccordionContent>
                  <h6 className="text-xs font-mono">{experience?.date}</h6>
                  {experience?.descriptions?.map((desc: string) => (
                    <p className="text-xs" key={desc}>
                      {desc}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="tel">Education</Label>
        <Accordion type="single" collapsible className="w-full">
          {watch("education")?.map((education: any, index: number) => (
            <AccordionItem value="item-1" key={index}>
              <AccordionTrigger>{education?.school}</AccordionTrigger>
              <AccordionContent>
                <h6>{education?.degree}</h6>
                <small>{education?.date}</small>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex flex-wrap gap-y-2 mb-5">
        {displaySkills?.map((skill: any) => (
          <Badge variant={"secondary"} key={skill?.id} className="mr-2">
            {skill?.skill}
          </Badge>
        ))}
      </div>
      <Button type="submit">submit</Button>
    </form>
  );
}
