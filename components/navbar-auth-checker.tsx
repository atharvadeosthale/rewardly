import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import Link from "next/link";

export async function NavbarAuthChecker() {
  const { userId } = await auth();
  return userId ? (
    <UserButton appearance={{ baseTheme: dark }} />
  ) : (
    <Link href="/login">Login</Link>
  );
}
