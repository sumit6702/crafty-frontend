"use client";

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
export default function Logout() {
  const router = useRouter();
  const handleLogout = () => {
    // Clear the token from cookies
    document.cookie = "token=; path=/; max-age=0; secure; SameSite=Strict";
    // Redirect to the login page
    router.push("/login");
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
