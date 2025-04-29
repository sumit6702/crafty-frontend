import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import { serverAction, serverLogs } from "@/lib/api/servers_helps";
import { useParams } from "next/navigation";
import CommandInput from "./command-input";

export default function CommandPanel() {
  const params = useParams();
  const [log, setLog] = useState<string>("");

  const handleAction = async (action: string) => {
    const token = localStorage.getItem("token") || "";
    const serverId = (params.slug as string) || "";

    await serverAction(token, serverId, action);
  };

  useEffect(() => {
    let isMounted = true; // To avoid setting state on unmounted component
    const token = localStorage.getItem("token") || "";
    const serverId = (params.slug as string) || "";

    const fetchLogs = async () => {
      const res = await serverLogs(token, serverId);
      if (res?.data && isMounted) {
        console.log(res.data);
        setLog(res.data);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 3000); // 3 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [params.slug]);

  return (
    <section className="py-4">
      <Card className="min-h-[65vh] min-w-[40vw] bg-default-200 border-2 border-secondary-200">
        <CardHeader>
          <div className="flex w-full gap-x-6">
            <Button
              className="w-full"
              variant="flat"
              color="success"
              onPress={() => handleAction("start_server")}
            >
              Start
            </Button>
            <Button
              className="w-full"
              variant="flat"
              color="secondary"
              onPress={() => handleAction("restart_server")}
            >
              Restart
            </Button>
            <Button
              className="w-full"
              variant="flat"
              color="danger"
              onPress={() => handleAction("stop_server")}
            >
              Stop
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          {log && log.length > 0 ? (
            <pre
              className="whitespace-pre-wrap max-h-80 overflow-y-scroll"
              dangerouslySetInnerHTML={{ __html: Array.from(log).join("\n") }}
            />
          ) : (
            <div className="flex h-full m-auto text-danger text-xl font-bold">
              No log Found!
            </div>
          )}
        </CardBody>
        <CardFooter>
          <CommandInput />
        </CardFooter>
      </Card>
    </section>
  );
}
