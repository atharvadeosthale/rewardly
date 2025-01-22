"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/db";
import { rewardsTable } from "@/database/schemas/reward";
import { revalidatePath } from "next/cache";
import { usersTable } from "@/database/schemas";
import { eq } from "drizzle-orm";

type CreateRewardInput = {
  name: string;
  description: string;
  cost: number;
};

export async function createReward(input: CreateRewardInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1);

  await db.insert(rewardsTable).values({
    name: input.name,
    description: input.description,
    cost: input.cost,
    createdBy: user[0].id,
  });

  revalidatePath("/dashboard");
}

export async function claimReward(id: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1);

  const [reward] = await db
    .select()
    .from(rewardsTable)
    .where(eq(rewardsTable.id, id));

  if (!reward || reward.createdBy !== user[0].id) {
    throw new Error("Unauthorized");
  }

  if (user[0].balance < reward.cost) {
    throw new Error("Insufficient balance");
  }

  await db
    .update(usersTable)
    .set({ balance: user[0].balance - reward.cost })
    .where(eq(usersTable.id, user[0].id));

  revalidatePath("/dashboard");
}

export async function deleteReward(id: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1);

  const [reward] = await db
    .select()
    .from(rewardsTable)
    .where(eq(rewardsTable.id, id));

  if (!reward || reward.createdBy !== user[0].id) {
    throw new Error("Unauthorized");
  }

  await db.delete(rewardsTable).where(eq(rewardsTable.id, id));
  revalidatePath("/dashboard");
}
