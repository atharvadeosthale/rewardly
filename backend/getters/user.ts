// Getters that ONLY run on server

import "server-only";
import { db } from "@/database/db";
import { usersTable } from "@/database/schemas/user";
import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

export async function getCoins(userId: string) {
  "use cache";
  cacheTag(`users-${userId}`);

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1)
    .then((rows) => rows[0]);

  if (!user) return null;

  return user.balance;
}
