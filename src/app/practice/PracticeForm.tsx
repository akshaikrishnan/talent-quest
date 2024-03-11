"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { SkillsSelect } from "@/components/SkillsSelect";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  level: z.string({
    required_error: "Please select a level.",
  }),
});

export default function InputForm({
  skills,
  levels,
}: {
  skills: any[] | null;
  levels: any[] | null;
}) {
  const [displaySkills, setDisplaySkills] = useState<any>([]);
  const router = useRouter();
  // const [levelDescription, setLevelDescription] = useState([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      position: "",
    },
  });
  const handleSkillChange = (skill: any) => {
    const selectedSkills = [...displaySkills, skill];
    setDisplaySkills([...new Set(selectedSkills)]);
    console.log(displaySkills, selectedSkills);
  };
  const levelWatch = form.watch("level");

  const levelDetail = useMemo(
    () => levels?.find((e: any) => e.title === levelWatch)?.description,
    [levelWatch]
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let params = new URLSearchParams();
    params.append("user", data.name);
    params.append("position", data.position);
    params.append("level", data.level);
    displaySkills.forEach((skill: string) => {
      params.append("skill", skill);
    });
    toast.success(`Interview is starting now. All the best, ${data.name} 👍`);
    router.push(`/practice/chat?${params.toString()}`);
  }
  return (
    <Card className="pt-5 md:w-2/3 mx-auto">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6 mx-auto"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Akshai" {...field} />
                  </FormControl>
                  <FormDescription>This is your display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Frontend Developer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Desired position you were attending
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels?.map((level) => (
                        <SelectItem key={level.title} value={level.title}>
                          {level.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    <ul>
                      {levelDetail?.map((detail: string) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {displaySkills?.length > 0 && (
              <div className="flex flex-wrap gap-y-2 mb-5">
                {displaySkills?.map((skill: any) => (
                  <Badge variant={"secondary"} key={skill} className="mr-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
            <div>
              <SkillsSelect
                selected={displaySkills}
                onChange={handleSkillChange}
                skills={skills}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
