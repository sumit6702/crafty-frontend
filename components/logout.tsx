"use client";

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/craftyController";

export default function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await logout();
    if (response?.status === "ok") {
      router.push("/login");
    } else {
      console.warn("Unexpected logout response:", response);
    }
  };
  return (
    <Button
      className="text-sm font-normal"
      startContent={<Icon icon="heroicons-solid:logout" />}
      variant="bordered"
      color="danger"
      onPress={handleLogout}
    >
      Log Out
    </Button>
  );
}
