import { serverCommand } from "@/lib/api/servers_helps";
import { Button, Form, Input } from "@heroui/react";
import { useParams } from "next/navigation";
import React from "react";

export default function CommandInput() {
  const params = useParams();
  const [command, setCommand] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<{
    [k: string]: FormDataEntryValue;
  } | null>(null);

  const onSubmit = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  const command_handler = async (command: string) => {
    const token = localStorage.getItem("token") || "";
    const serverId = (params.slug as string) || "";

    await serverCommand(token, serverId, command);
    setCommand(" ");
  };

  return (
    <Form className="w-full" onSubmit={onSubmit}>
      <div className="flex gap-x-2 w-full">
        <Input
          label="Command"
          labelPlacement="outside"
          name="command"
          placeholder="Enter your command"
          type="text"
          className="w-4/5"
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button
          type="submit"
          variant="bordered"
          className="flex w-1/5 mt-auto mb-0"
          onPress={() => command_handler(command)}
        >
          Enter Command
        </Button>
      </div>
      {/* {submitted && (
              <div className="text-small text-default-500">
                You submitted: <code>{JSON.stringify(submitted)}</code>
              </div>
            )} */}
    </Form>
  );
}
