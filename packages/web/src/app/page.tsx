import { trpc } from "@/lib/router";
import Image from "next/image";

export default async function Home() {
  const test = await trpc.users.fetch();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
