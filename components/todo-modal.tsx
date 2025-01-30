"use client";

import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTodo } from "@/backend/actions/todo";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  coins: z.number().min(1, "Coins must be at least 1"),
});

type TodoFormData = z.infer<typeof todoSchema>;

function ModalContents() {
  const { setOpen } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = async (data: TodoFormData) => {
    try {
      await createTodo(data);
      toast.success("Todo created successfully");
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create todo");
    }
  };

  return (
    <>
      <ModalContent>
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold mb-5">
          Add a new task
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Add a new task to your list. Provide a description and the number of
          coins you will get after completing the task. Make sure you do not
          abuse the system for your own benefit as this app tries to keep you
          accountable and only allows you to reward yourself after completing
          the task.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter your task"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              {...register("description")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coins">Reward Coins</Label>
            <Input
              id="coins"
              type="number"
              placeholder="Enter coins (min: 1)"
              {...register("coins", { valueAsNumber: true })}
            />
            {errors.coins && (
              <p className="text-sm text-red-500">{errors.coins.message}</p>
            )}
          </div>
        </form>
      </ModalContent>
      <ModalFooter className="gap-4">
        <button
          onClick={() => {
            reset();
            setOpen(false);
          }}
          className="px-4 py-2 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Todo"}
        </button>
      </ModalFooter>
    </>
  );
}

export function TodoModal() {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn px-4 py-2 rounded-md">
          Add Todo
        </ModalTrigger>
        <ModalBody>
          <ModalContents />
        </ModalBody>
      </Modal>
    </div>
  );
}
