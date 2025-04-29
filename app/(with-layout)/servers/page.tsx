import ServerList from "@/components/server-list";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Servers() {
  return (
    <section className="mt-4 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Servers</h2>
        <Button
          startContent={
            <Icon icon="material-symbols:add-rounded" width="16" height="16" />
          }
          as={Link}
          href="/server/create"
          variant="flat"
          color="secondary"
        >
          Create Server
        </Button>
      </div>
      <ServerList />
    </section>
  );
}
