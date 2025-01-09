import { ThemeToggler } from "./theme-toggler";
import { NavbarAuthChecker } from "./navbar-auth-checker";
import { Suspense } from "react";
import { db } from "@/database/db";
import { usersTable } from "@/database/schemas/user";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { Coins } from "lucide-react";

async function UserBalance() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerk_id, userId),
  });

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Coins className="w-4 h-4 text-yellow-500" />
      <span>{user.balance} coins</span>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Rewardly</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Suspense fallback={<div>Loading...</div>}>
              <UserBalance />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <NavbarAuthChecker />
            </Suspense>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
}
