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
import { createReward } from "@/actions/reward";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

const rewardSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  cost: z.number().min(1, "Cost must be at least 1"),
});

type RewardFormData = z.infer<typeof rewardSchema>;

function ModalContents() {
  const { setOpen } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RewardFormData>({
    resolver: zodResolver(rewardSchema),
  });

  const onSubmit = async (data: RewardFormData) => {
    try {
      await createReward(data);
      toast.success("Reward created successfully");
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create reward");
    }
  };

  return (
    <>
      <ModalContent>
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold mb-5">
          Add a new reward
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Add a new reward to your marketplace. Set a name, description, and the
          cost in coins. Remember to set reasonable costs that match the effort
          required to earn the coins.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Reward Name</Label>
            <Input
              id="name"
              placeholder="Enter reward name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter reward description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Cost (in coins)</Label>
            <Input
              id="cost"
              type="number"
              placeholder="Enter cost (min: 1)"
              {...register("cost", { valueAsNumber: true })}
            />
            {errors.cost && (
              <p className="text-sm text-red-500">{errors.cost.message}</p>
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
          {isSubmitting ? "Creating..." : "Create Reward"}
        </button>
      </ModalFooter>
    </>
  );
}

export function RewardModal() {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn px-4 py-2 rounded-md">
          Add Reward
        </ModalTrigger>
        <ModalBody>
          <ModalContents />
        </ModalBody>
      </Modal>
    </div>
  );
}
