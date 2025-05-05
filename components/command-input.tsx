"use client";

import { serverCommand } from "@/lib/api/craftyController";
import { Button, Form, Input } from "@heroui/react";
import { useParams } from "next/navigation";
import React from "react";

export default function CommandInput() {
  const params = useParams();
  const serverId = params.slug as string;

  const [command, setCommand] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!command.trim()) return;

    try {
      await serverCommand(serverId, command);
      setCommand("");
    } catch (error) {
      console.error("Command failed:", error);
    }
  };

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <div className="flex gap-x-2 w-full">
        <Input
          label="Command"
          labelPlacement="outside"
          name="command"
          placeholder="Enter your command"
          type="text"
          className="w-4/5"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button
          type="submit"
          variant="bordered"
          className="flex w-1/5 mt-auto mb-0"
        >
          Enter Command
        </Button>
      </div>
    </Form>
  );
}
