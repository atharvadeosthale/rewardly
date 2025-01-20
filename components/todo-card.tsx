"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { Todo } from "@/database/schemas/todo";
import { completeTodo } from "@/app/actions/todo";

export default function TodoCard({ todo, key }: { todo: Todo; key?: number }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    setClicked(true);
    await completeTodo(todo.id);
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
        <CardTitle className="text-sm font-medium">{todo.title}</CardTitle>
        {clicked ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {todo.rewardCoins} coins
        </div>
      </CardContent>
    </Card>
  );
}
