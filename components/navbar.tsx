import { ThemeToggler } from "./theme-toggler";
import { NavbarAuthChecker } from "./navbar-auth-checker";
import { Suspense } from "react";

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
              <NavbarAuthChecker />
            </Suspense>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
}
