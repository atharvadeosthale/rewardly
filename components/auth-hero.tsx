import React, { Suspense } from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words =
  "Track your habits, reward yourself, and build a better you. Join Rewardly today and turn your productivity into rewards.";

export default function AuthHero() {
  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center relative">
      <div className="relative z-10  space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
          Rewardly
        </h1>
        <div className="max-w-md">
          <TextGenerateEffect words={words} />
        </div>
        <div className="flex flex-col gap-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              ✨
            </div>
            <p>Set and track your daily habits</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
              🎯
            </div>
            <p>Complete tasks and earn rewards</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              🎉
            </div>
            <p>Treat yourself with earned rewards</p>
          </div>
        </div>
      </div>
      <Suspense>
        <BackgroundBeams />
      </Suspense>
    </div>
  );
}
