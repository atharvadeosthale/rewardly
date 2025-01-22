import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/db";
import { Reward } from "@/database/schemas/reward";
import { eq } from "drizzle-orm";
import { usersTable } from "@/database/schemas/user";
import { RewardModal } from "./reward-modal";
import RewardCard from "./reward-card";
import { rewardsTable } from "@/database/schemas/reward";

async function RewardList() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerk_id, userId),
  });

  if (!user) return null;

  const rewards = await db.query.rewardsTable.findMany({
    where: (rewards) => eq(rewards.createdBy, user.id),
  });

  if (!rewards.length) {
    return (
      <div className="text-center text-muted-foreground">
        No rewards yet. Start by adding one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
