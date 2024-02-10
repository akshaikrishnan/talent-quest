"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/utils/supabase/client";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

type OptionType = {
  option: string;
  is_correct: boolean;
};

interface AddQuestionProps {
  question: string;
  options: OptionType[];
}

export default function AddQuestion() {
  const supabase = createClient();
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddQuestionProps>({
    defaultValues: {
      question: "",
      options: [{ option: "option 1", is_correct: true }],
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

  const onSubmit = (data: AddQuestionProps) => {};

  return (
    <div className="container mx-auto py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Add Question
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
        <div className="grid w-full items-center gap-1.5 mb-8 relative">
          <Label htmlFor="name">Question</Label>
          <Input
            {...register("question", { required: "Question is required!" })}
            type="text"
            id="name"
            placeholder="Name"
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
                placeholder="Name"
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
                {...register(`options.${index}.is_correct`)}
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
