import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export async function NavbarAuthChecker() {
  const { userId } = await auth();
  return userId ? <UserButton /> : <Link href="/login">Login</Link>;
}
