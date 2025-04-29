import Server from "@/components/server";
import { Divider } from "@heroui/react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <section>
      <h1 className="text-2xl">Server Details - hehe</h1>
      <span className="text-sm">UUID: {slug}</span>
      <Divider className="mt-2" />
      <Server />
    </section>
  );
}
