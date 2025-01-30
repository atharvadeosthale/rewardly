import { auth } from "@clerk/nextjs/server";
import { Reward } from "@/database/schemas/reward";
import { RewardModal } from "./reward-modal";
import RewardCard from "./reward-card";
import { fetchRewards } from "@/backend/getters/reward";

async function RewardList() {
  const { userId } = await auth();
  if (!userId) return null;

  const rewards = await fetchRewards(userId);

  if (!rewards || !rewards.length) {
    return (
      <div className="text-center text-muted-foreground mt-5">
        No rewards yet. Start by adding one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-5">
      {rewards.map((reward: Reward) => (
        <RewardCard reward={reward} key={reward.id} />
      ))}
    </div>
  );
}

export default async function RewardsSection() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Your Rewards</h2>
        <RewardModal />
      </div>
      <RewardList />
    </div>
  );
}
