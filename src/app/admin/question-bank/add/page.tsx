"use client";

import { Button } from "@/components/ui/button";
import ComboBox from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/utils/supabase/client";
import { Select } from "@radix-ui/react-select";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { set, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

type OptionType = {
  option: string;
  is_correct: boolean;
};

interface AddQuestionProps {
  skill: string;
  level: string | number;
  question: string;
  options: OptionType[];
}

export default function AddQuestion() {
  const supabase = createClient();
  const [skills, setSkills] = useState<any>([]);
  const [levels, setlevels] = useState<any>([]);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddQuestionProps>({
    defaultValues: {
      question: "",
      options: [{ option: "option 1", is_correct: false }],
    },
    mode: "onChange",
  });
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "options",
      rules: {
        required: "Option can't be empty!",
      },
    });

  console.log("errors", errors);

  const onSubmit = async (data: AddQuestionProps) => {
    console.log("data", data);
    const { data: question, error } = await supabase
      .from("questionbank")
      .insert([
        {
          question: data.question,
          skill: skills.find((skill: any) => skill.skill === data.skill).id,
          level: data.level
            ? levels.find((level: any) => level.title === data.level).id
            : 1,
        },
      ])
      .select();
    if (error) {
      toast(error.message);
    }
    const answerRows = data.options.map((option, index) => {
      return {
        question_id: question?.[0].id,
        option: option.option,
        is_correct: option.is_correct,
      };
    });
    const { data: answer, error: ansError } = await supabase
      .from("answers")
      .insert(answerRows)
      .select();
    if (answer) {
      const prevLevel = data.level || 1;
      const prevSkill = data.skill;
      reset();
      setValue("options", [
        { option: "", is_correct: false },
        { option: "", is_correct: false },
        { option: "", is_correct: false },
        { option: "", is_correct: false },
      ]);
      setValue("level", prevLevel);
      setValue("skill", prevSkill);
      toast("Question added successfully!");
    } else toast(ansError?.message);
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await supabase.from("skills").select("*");
      setSkills(data);
    };
    const fetchLevels = async () => {
      const { data } = await supabase.from("level").select("*");
      setlevels(data);
    };
    fetchSkills();
    fetchLevels();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Add Question
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
        <div className="flex gap-5">
          <div className="grid  items-center gap-1.5 mb-8 relative">
            <Label htmlFor="name">Question</Label>
            <ComboBox
              name="skill"
              control={control}
              value={watch("skill")}
              setValue={(e: string) => {
                setValue("skill", e);
              }}
              options={skills}
              selector={"skill"}
            />
            <Input
              {...register("question", { required: "Question is required!" })}
              type="hidden"
              id="name"
              placeholder="Enter Question"
            />
            {errors.question && (
              <small className="text-red-500 absolute top-16 ">
                {errors.question.message}
              </small>
            )}
          </div>
          <div className="grid  items-center gap-1.5 mb-8 relative">
            <Label htmlFor="name">Question</Label>
            <select {...register("level")}>
              {levels.map((level: any) => (
                <option key={level.id} value={level.title}>
                  {level.title}
                </option>
              ))}
            </select>

            <Input
              {...register("question", { required: "Question is required!" })}
              type="hidden"
              id="name"
              placeholder="Enter Question"
            />
            {errors.question && (
              <small className="text-red-500 absolute top-16 ">
                {errors.question.message}
              </small>
            )}
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5 mb-8 relative">
          <Label htmlFor="name">Question</Label>
          <Input
            {...register("question", { required: "Question is required!" })}
            type="text"
            id="name"
            placeholder="Enter Question"
          />
          {errors.question && (
            <small className="text-red-500 absolute top-16 ">
              {errors.question.message}
            </small>
          )}
        </div>
        {fields.map((field, index) => (
          <div className="flex items-center gap-4" key={field.id}>
            <div className="grid w-full items-center gap-1.5 mb-8 relative">
              <Label htmlFor="name">Option</Label>
              <Input
                {...register(`options.${index}.option`, {
                  required: "Option is required!",
                })}
                type="text"
                id="name"
                placeholder="Option"
              />
              {errors.options && (
                <small className="text-red-500 absolute top-16 ">
                  {errors.options.message}
                </small>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                onCheckedChange={(e) => {
                  console.log(e);
                  setValue(`options.${index}.is_correct`, e);
                }}
                value={`options.${index}.is_correct`}
              />
              <Label htmlFor="airplane-mode">Correct Answer</Label>
            </div>
            <Button
              type="button"
              className="me-2"
              variant={"destructive"}
              onClick={() => remove(index)}
            >
              <Minus />
            </Button>
            <Button
              type="button"
              onClick={() =>
                insert(index + 1, { option: "", is_correct: false })
              }
            >
              <Plus />
            </Button>
          </div>
        ))}
        <Button type="submit">Add Question </Button>
      </form>
    </div>
  );
}
