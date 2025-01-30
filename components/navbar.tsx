import { ThemeToggler } from "./theme-toggler";
import { NavbarAuthChecker } from "./navbar-auth-checker";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { Coins } from "lucide-react";
import { getCoins } from "@/backend/getters/user";

async function UserBalance() {
  const { userId } = await auth();
  if (!userId) return null;

  const balance = await getCoins(userId);

  if (!balance) return null;

  return (
    <div className="flex items-center gap-2 text-sm border rounded-full px-3 py-2">
      <Coins className="w-4 h-4 text-yellow-500" />
      <span>{balance} coins</span>
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
            <Suspense
              fallback={
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
                  <div className="w-16 h-4 rounded bg-muted animate-pulse" />
                </div>
              }
            >
              <UserBalance />
            </Suspense>
            <Suspense
              fallback={
                <div className="w-20 h-8 rounded bg-muted animate-pulse" />
              }
            >
              <NavbarAuthChecker />
            </Suspense>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
}
