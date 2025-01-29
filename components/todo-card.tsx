"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, Circle, Coins, Trash2 } from "lucide-react";
import { Todo } from "@/database/schemas/todo";
import { completeTodo, deleteTodo } from "@/app/actions/todo";
import { Button } from "./ui/button";

export default function TodoCard({ todo, key }: { todo: Todo; key?: number }) {
  const [clicked, setClicked] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleClick = async () => {
    setClicked(true);
    await completeTodo(todo.id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleting(true);
    await deleteTodo(todo.id);
    setDeleting(false);
  };

  return (
    <Card
      key={key}
      className={`group hover:border-primary/50 transition-colors ${
        clicked && "opacity-50"
      }`}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{todo.title}</CardTitle>
          {todo.description ? (
            <p className="text-sm text-muted-foreground mt-1">
              {todo.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1 italic">
              No description provided.
            </p>
          )}
        </div>
        {clicked ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Coins className="w-3 h-3 text-yellow-500" />
            {todo.rewardCoins} coins
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
