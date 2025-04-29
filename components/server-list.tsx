"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Link,
  Button,
  addToast,
  Skeleton,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  getServers,
  getServerStats,
  serverAction,
} from "@/lib/api/servers_helps";
import { useParams } from "next/navigation";
import { serverDelete } from "@/lib/api/server_action";

interface Server {
  server_id: number;
  server_uuid: string;
  server_name: string;
  server_port: number;
  type: string;
  // extra stats:
  running?: boolean;
  mem?: string;
  cpu?: number;
  world_size?: string;
  online?: number;
  max?: number;
}

export default function ServerList() {
  const [notify, setNotify] = React.useState<string | null>(null);
  const [placement, setPlacement] = React.useState<
    "top-right" | "top-left" | "bottom-right" | "bottom-left"
  >("top-right");
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || ""; // replace dynamically later
      const response = await getServers(token);
      if (response?.status === "ok" && Array.isArray(response.data)) {
        const baseServers = response.data;

        // Fetch stats for each server in parallel
        const serversWithStats = await Promise.all(
          baseServers.map(async (server: any) => {
            try {
              const stats = await getServerStats(token, server.server_id);
              return {
                ...server,
                running: stats.running,
                mem: stats.mem,
                cpu: stats.cpu,
                world_size: stats.world_size,
                online: stats.online,
                max: stats.max,
              };
            } catch (error) {
              console.error(
                `Failed to fetch stats for server ${server.server_id}`,
                error
              );
              return server; // fallback to just server data
            }
          })
        );

        setServers(serversWithStats);
      }
    } catch (error) {
      console.error("Failed to fetch servers", error);
    } finally {
      setLoading(false);
    }
  };

  type ActionParams = {
    serverID: string;
    action: string;
  };

  const handleAction = async ({ serverID, action }: ActionParams) => {
    const token = localStorage.getItem("token") || "";
    const res = await serverAction(token, serverID, action);
    console.log(res);
    if (res.status === "ok") {
      // Assuming 200 is the success status code
      // setNotify(``);
      setTimeout(async () => {
        await fetchServers();
      }, 4000);
      return addToast({
        title: "Server Action",
        description: `Server ${action} successfully`,
        // @ts-ignore
        variant: "flat",
        color: "secondary",
      });
    }
  };

  const handleDelete = async (serverID: string) => {
    const token = localStorage.getItem("token") || "";
    const res = await serverDelete(token, serverID);
    if (res.status === "ok") {
      // setNotify(`Server deleted successfully`);
      setTimeout(async () => {
        await fetchServers();
      }, 4000);
      return addToast({
        title: "Server Action",
        description: "Server deleted successfully",
        // @ts-ignore
        variant: "flat",
        color: "secondary",
      });
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  if (loading) {
    return (
      <Table isVirtualized maxTableHeight={300}>
        <TableHeader>
          <TableColumn>Server Name</TableColumn>
          <TableColumn>Size</TableColumn>
          <TableColumn>Players</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            {[...Array(6)].map((_, i) => (
              <TableCell key={i}>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                </Skeleton>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <Table isVirtualized maxTableHeight={300}>
        <TableHeader>
          <TableColumn>Server Name</TableColumn>
          <TableColumn>Size</TableColumn>
          <TableColumn>Players</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {servers.map((server) => (
            <TableRow key={server.server_id}>
              <TableCell>
                <Link href={`/server/${server.server_id}`}>
                  <Icon
                    icon="heroicons:server-stack-solid"
                    width="22"
                    height="22"
                  />
                  <span className="ml-2">{server.server_name}</span>
                </Link>
              </TableCell>
              <TableCell>{server.world_size ?? "N/A"}</TableCell>
              <TableCell>
                {server.online !== undefined
                  ? `${server.online}/${server.max} Max`
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Tooltip content={server.type.toUpperCase()}>
                  <Chip variant="solid" size="sm">
                    {server.type.replace("minecraft-", "").toUpperCase()}
                  </Chip>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip content={String(server.server_port)}>
                  <Chip
                    variant="solid"
                    color={server.running ? "success" : "danger"}
                    size="sm"
                  >
                    {server.running ? "Online" : "Offline"}
                  </Chip>
                </Tooltip>
              </TableCell>
              <TableCell className="">
                <div className="flex w-fit items-center gap-x-2">
                  <Tooltip content="Play">
                    <button
                      className="p-1"
                      onClick={() =>
                        handleAction({
                          serverID: server.server_id.toString(),
                          action: "start_server",
                        })
                      }
                    >
                      <Icon
                        icon="heroicons:play-16-solid"
                        width="22"
                        height="22"
                      />
                    </button>
                  </Tooltip>
                  <Tooltip content="Clone">
                    <button
                      className="p-1"
                      onClick={() =>
                        handleAction({
                          serverID: server.server_id.toString(),
                          action: "clone_server",
                        })
                      }
                    >
                      <Icon icon="eva:copy-fill" width="22" height="22" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Kill">
                    <button
                      className="p-1"
                      disabled={!server.running}
                      onClick={() =>
                        handleAction({
                          serverID: server.server_id.toString(),
                          action: "kill_server",
                        })
                      }
                    >
                      <Icon
                        icon="heroicons:stop-16-solid"
                        width="22"
                        height="22"
                      />
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <button
                      className="p-1"
                      onClick={() => handleDelete(server.server_id.toString())}
                    >
                      <Icon
                        icon="heroicons:trash-16-solid"
                        width="22"
                        height="22"
                      />
                    </button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
