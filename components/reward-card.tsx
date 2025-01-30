"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Coins, Gift, Trash2 } from "lucide-react";
import { Reward } from "@/database/schemas/reward";
import { claimReward, deleteReward } from "@/backend/actions/reward";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function RewardCard({ reward }: { reward: Reward }) {
  const [claiming, setClaiming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleClaim = async () => {
    try {
      setClaiming(true);
      await claimReward(reward.id);
      toast.success("Reward claimed successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to claim reward");
      }
    }
    setClaiming(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      setDeleting(true);
      await deleteReward(reward.id);
      toast.success("Reward deleted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete reward");
      }
    }
    setDeleting(false);
  };

  return (
    <Card
      className={`group hover:border-primary/50 transition-colors cursor-pointer ${
        claiming && "opacity-50"
      }`}
      onClick={handleClaim}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{reward.name}</CardTitle>
        <Gift className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{reward.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Coins className="w-3 h-3 text-yellow-500" />
            {reward.cost} coins
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
