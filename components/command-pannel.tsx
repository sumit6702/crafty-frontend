import React, { useEffect, useState, useCallback } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import { useParams } from "next/navigation";
import CommandInput from "./command-input";
import {
  serverAction,
  serverLogs,
  serverStats,
} from "@/lib/api/craftyController";

export default function CommandPanel() {
  const { slug } = useParams();
  const serverId = (slug as string) || "";

  const [log, setLog] = useState<string>("");
  const [serverRunning, setServerRunning] = useState<boolean>(false);

  const serverStatus = useCallback(async () => {
    try {
      const { data } = await serverStats(serverId);
      setServerRunning(data.running);
    } catch (error) {
      console.error("Failed to fetch server status:", error);
    }
  }, [serverId]);

  const handleAction = useCallback(
    async (action: string) => {
      try {
        await serverAction(serverId, action);
        serverStatus();
        setTimeout(serverStatus, 4000);
      } catch (error) {
        console.error("Failed to perform server action:", error);
      }
    },
    [serverId, serverStatus]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchLogs = async () => {
      try {
        const { data } = await serverLogs(serverId);
        if (isMounted) {
          setLog(data);
        }
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };

    serverStatus();
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [serverId, serverStatus]);

  return (
    <section className="py-4">
      <Card className="min-h-[65vh] min-w-[40vw] bg-default-200 border-2 border-secondary-200">
        <CardHeader>
          <div className="flex w-full gap-x-6">
            <Button
              className="w-full"
              variant={serverRunning ? "flat" : "solid"}
              color={serverRunning ? "default" : "success"}
              onPress={() => handleAction("start_server")}
              disabled={serverRunning}
            >
              Start
            </Button>
            <Button
              className="w-full"
              variant={serverRunning ? "solid" : "flat"}
              color={serverRunning ? "success" : "default"}
              onPress={() => handleAction("restart_server")}
              disabled={!serverRunning}
            >
              Restart
            </Button>
            <Button
              className="w-full"
              variant={serverRunning ? "solid" : "flat"}
              color={serverRunning ? "danger" : "default"}
              onPress={() => handleAction("stop_server")}
              disabled={!serverRunning}
            >
              Stop
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          {log ? (
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
