import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function Dashboard() {
  await auth.protect();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
}
