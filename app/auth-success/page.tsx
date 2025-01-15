import { db } from "@/database/db";
import { usersTable } from "@/database/schemas";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function AuthSuccessHandler() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId));

  console.log("existingUser from in-house auth handler", existingUser);

  if (existingUser) {
    console.log("User already exists", userId);
    return redirect("/dashboard");
  }

  await db.insert(usersTable).values({
    clerk_id: userId,
  });

  console.log("User created through in-house auth handler", userId);

  return redirect("/dashboard");
}
