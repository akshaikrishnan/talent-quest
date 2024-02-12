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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [shareModal, setShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    tel: z.string().min(10).max(10),
    skills: z.array(z.string()),
    summary: z.string().min(10).max(1000),
    level: z.string(),
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserResume>({
    // resolver: zodResolver(formSchema),
    defaultValues: resume,
  });

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
      .insert({
        name: data.name,
        email: data.email,
        phone: data.tel,
        summary: data.summary,
        level: data.professionalLevel,
        skills: data.skills,
        experience: data.experience,
        educations: data.education,
        active: true,
      })
      .select();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Candidate ${data.name} Created`);
    if (typeof window !== "undefined")
      setShareLink(`${window.location.origin}/interview/${user[0].id}`);
    setShareModal(true);
  };

  const copy = () => {
    if (typeof window !== "undefined") navigator.clipboard.writeText(shareLink);
    toast.success("Link Copied");
  };

  const mail = async () => {
    toast.loading("Sending Email", { id: "mail" });
    const res = await fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        recipient: watch("email"),
        subject: "Talent Quest Interview",
        // text: `Hi ${watch("name")},
        //  Here is your interview link: ${shareLink}`,
        html: `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interview Invitation from TalentQuest</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 20px;
    }
    .logo {
      display: block;
      margin-bottom: 20px;
    }
    .content {
      line-height: 1.5;
    }
    .link {
      display: inline-block;
      border: 1px solid #007bff;
      padding: 8px 16px;
      color: #007bff;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s ease-in-out;
    }
    .link:hover {
      background-color: #0062cc;
    }
  </style>
</head>
<body>
  <img src="https://talent-quest.vercel.app/images/tq-logo.svg" alt="Company Logo" class="logo">
TalentQuest
  <div class="content">
    <p>Hi ${watch("name")},</p>
    <p>We're excited to invite you to an interview for the ${watch(
      "summary"
    )} position at TalentQuest!</p>
    <p>Please follow this link to join the interview at your scheduled time:</p>
    <a href="${shareLink}" class="link">Join Interview</a>
    <p>We look forward to getting to know you better.</p>
    <p>Best regards,</p>
    <p>The TalentQuest Team</p>
    <p>P.S. If you have any questions, please feel free to reply to this email or reach out to us at {contact information}.</p>
  </div>
</body>
</html>`,
      }),
    }).then(() => {
      toast.success("Email Sent", { id: "mail" });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-8 relative">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name", { required: "Name is required!" })}
            type="text"
            id="name"
            placeholder="Name"
          />
          {errors.name && (
            <small className="text-red-500 absolute top-16 ">
              {errors.name.message}
            </small>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-5  mb-8 relative">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", { required: "Email is required!" })}
              type="email"
              id="email"
              placeholder="Email"
            />
            {errors.email && (
              <small className="text-red-500 absolute top-16">
                {errors.email.message}
              </small>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="tel">Phone</Label>
            <Input
              {...register("tel")}
              type="tel"
              id="tel"
              placeholder="Phone"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-8 relative">
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
            <Select
              onValueChange={(e) => {
                setValue("professionalLevel", e, { shouldValidate: true });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Levels</SelectLabel>
                  {levels?.map((level: any) => (
                    <SelectItem key={level?.id} value={level?.id?.toString()}>
                      {level?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("professionalLevel", {
                required: "Professional level is required!",
              })}
            />
            {errors.professionalLevel && (
              <small className="text-red-500 absolute top-16">
                {errors.professionalLevel.message}
              </small>
            )}
          </div>
        </div>
        {watch("experience")?.length > 0 && (
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

      <Dialog open={shareModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share interview link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                value={shareLink}
                defaultValue={shareLink}
                readOnly
              />
            </div>
            <Button type="submit" onClick={copy} size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShareModal(false);
                }}
              >
                Close
              </Button>
            </DialogClose>
            <Button onClick={mail} size="sm" className="px-3">
              Send Mail
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
