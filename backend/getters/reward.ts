// Getters that ONLY run on server

import "server-only";
import { db } from "@/database/db";
import { rewardsTable } from "@/database/schemas/reward";
import { usersTable } from "@/database/schemas/user";
import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

export async function fetchRewards(userId: string) {
  "use cache";
  cacheTag(`rewards-${userId}`);

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1)
    .then((rows) => rows[0]);

  if (!user) return null;

  const rewards = await db
    .select()
    .from(rewardsTable)
    .where(eq(rewardsTable.createdBy, user.id));

  return rewards;
}
