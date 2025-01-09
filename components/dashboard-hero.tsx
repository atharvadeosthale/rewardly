import { BackgroundBeams } from "./ui/background-beams";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function DashboardHero() {
  return (
    <div className="w-full relative h-[300px] flex items-center justify-center overflow-hidden rounded-lg border bg-background">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
          Welcome to Rewardly
        </h1>
        <div className="max-w-2xl mx-auto px-4">
          <TextGenerateEffect words="Add todos, complete them, earn coins and spend them on rewards that you set yourself. Peak productivity." />
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
