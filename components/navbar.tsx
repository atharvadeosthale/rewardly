"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";
import { ThemeToggler } from "./theme-toggler";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Rewardly</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggler />
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <UserCircle2 className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
