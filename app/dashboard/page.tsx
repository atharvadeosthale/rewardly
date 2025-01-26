import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import DashboardHero from "@/components/dashboard-hero";
import TodosSection from "@/components/todos-section";
import RewardsSection from "@/components/rewards-section";

export default async function Dashboard() {
  await auth.protect();

  return (
    <div className="max-w-6xl mx-auto space-y-8 my-10">
      <DashboardHero />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense
          fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 bg-muted rounded" />
              <div className="grid grid-cols-1 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg" />
                ))}
              </div>
            </div>
          }
        >
          <TodosSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 bg-muted rounded" />
              <div className="grid grid-cols-1 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg" />
                ))}
              </div>
            </div>
          }
        >
          <RewardsSection />
        </Suspense>
      </div>
    </div>
  );
}
