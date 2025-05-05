"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Code,
  CardHeader,
  CardBody,
  Switch,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { serverConfig, serverStats } from "@/lib/api/craftyController";

type Server = {
  stats_id: number;
  created: string;
  server_id: {
    server_id: string;
    server_name: string;
    path: string;
    executable: string;
    log_path: string;
    execution_command: string;
    auto_start: boolean;
    auto_start_delay: number;
    crash_detection: boolean;
    stop_command: string;
    executable_update_url: string;
    server_ip: string;
    server_port: number;
    logs_delete_after: number;
    type: string;
    show_status: boolean;
    created_by: number;
    shutdown_timeout: number;
    ignored_exits: string;
    count_players: boolean;
  };
  started: string;
  running: boolean;
  cpu: number;
  mem: number;
  mem_percent: number;
  world_name: string;
  world_size: string;
  server_port: number;
  int_ping_results: string;
  online: number;
  max: number;
  players: string;
  desc: string;
  icon: string | null;
  version: string;
  updating: boolean;
  waiting_start: boolean;
  first_run: boolean;
  crashed: boolean;
  importing: boolean;
};

export default function ServerConfig() {
  const params = useParams();
  const serverID = params.slug as string;
  const [action, setAction] = useState<string | null>(null);
  const [serverS, setServerS] = useState<Server | null>(null);
  const [formState, setFormState] = useState({
    server_name: "",
    path: "",
    executable: "",
    execution_command: "",
    stop_command: "",
    auto_start: false,
    auto_start_delay: 0,
    crash_detection: false,
    executable_update_url: "",
    server_ip: "",
    shutdown_timeout: 0,
    ignored_exits: "",
    logs_delete_after: 0,
    count_players: false,
    show_status: false,
    // ...add other fields as needed
  });

  const fetchServer = async () => {
    try {
      const { data } = await serverStats(serverID);
      setServerS(data);
    } catch (error) {
      console.error("Failed to fetch server status:", error);
    }
  };

  useEffect(() => {
    fetchServer();
  }, []);

  useEffect(() => {
    if (serverS) {
      setFormState({
        server_name: serverS.server_id.server_name || "",
        path: serverS.server_id.path || "",
        executable: serverS.server_id.executable || "",
        execution_command: serverS.server_id.execution_command || "",
        stop_command: serverS.server_id.stop_command || "",
        auto_start: serverS.server_id.auto_start || false,
        auto_start_delay: serverS.server_id.auto_start_delay || 0,
        crash_detection: serverS.server_id.crash_detection || false,
        executable_update_url: serverS.server_id.executable_update_url || "",
        server_ip: serverS.server_id.server_ip || "",
        shutdown_timeout: serverS.server_id.shutdown_timeout || 0,
        ignored_exits: serverS.server_id.ignored_exits || "",
        logs_delete_after: serverS.server_id.logs_delete_after || 0,
        count_players: serverS.server_id.count_players || false,
        show_status: serverS.server_id.show_status || false,
        // ...add other fields as needed
      });
    }
  }, [serverS]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await serverConfig(serverID, JSON.stringify(formState));
      fetchServer();
    } catch (error) {
      console.error("Failed to update server:", error);
    }
  };

  return (
    <section className="grid grid-cols-12 p-4 border rounded-xl border-secondary-100">
      <div className="col-span-6">
        <Form
          className="w-full max-w-sm flex flex-col gap-4"
          onReset={() => setAction("reset")}
          onSubmit={handleFormSubmit}
        >
          <Input
            errorMessage="What you wish to call this server"
            label="Server Name"
            labelPlacement="outside"
            name="server_name"
            placeholder="Enter your server name"
            type="text"
            value={formState.server_name}
            onChange={handleInputChange}
          />

          <Input
            errorMessage="Absolute full path (not including executable)"
            label="Server Path"
            labelPlacement="outside"
            name="path"
            placeholder="/servers/602a2d2e"
            type="text"
            value={formState.path}
            onChange={handleInputChange}
          />
          <Input
            errorMessage="The server's executable file"
            label="Server Executable"
            labelPlacement="outside"
            name="executable"
            placeholder="bedrock_server"
            type="text"
            value={formState.executable}
            onChange={handleInputChange}
          />
          <Input
            errorMessage="What will be launched in a hidden terminal"
            label="Server Execution Command"
            labelPlacement="outside"
            name="execution_command"
            placeholder="bedrock_server"
            type="text"
            value={formState.execution_command}
            onChange={handleInputChange}
          />
          <Input
            errorMessage="Command to send the program to stop it"
            label="Server Stop Command"
            labelPlacement="outside"
            name="stop_command"
            placeholder="bedrock_server"
            type="text"
            value={formState.stop_command}
            onChange={handleInputChange}
          />
          <Input
            errorMessage=" Delay before auto starting (If enabled below)"
            label="Server Autostart Delay"
            labelPlacement="outside"
            name="auto_start_delay"
            placeholder="bedrock_server"
            type="number"
            value={formState.auto_start_delay?.toString()}
            onChange={handleInputChange}
          />
          <Input
            errorMessage="Direct Download URL for updates."
            label="Server Executable Update URL "
            labelPlacement="outside"
            name="executable_update_url"
            placeholder="bedrock_server"
            type="text"
            value={formState.executable_update_url}
            onChange={handleInputChange}
          />
          <Input
            errorMessage="IP Crafty should connect to for stats (Try a real ip instead of 127.0.0.1 if you have issues)"
            label="Server IP"
            labelPlacement="outside"
            name="server_ip"
            placeholder="bedrock_server"
            type="text"
            value={formState.server_ip}
            onChange={handleInputChange}
          />
          <Input
            errorMessage="How long Crafty will wait for your server to shutdown after executing the  stop command before it forces the process down."
            label="Shutdown Timeout"
            labelPlacement="outside"
            name="shutdown_timeout"
            placeholder="bedrock_server"
            type="number"
            value={formState.shutdown_timeout?.toString()}
            onChange={handleInputChange}
          />
          <Input
            errorMessage=" Exit codes Crafty's Crash detection should ignore as a normal 'stop' (separated by commas)"
            label="Ignored Crash Exit Codes"
            labelPlacement="outside"
            name="ignored_exits"
            placeholder="bedrock_server"
            type="text"
            value={formState.ignored_exits?.toString()}
            onChange={handleInputChange}
          />
          <Input
            errorMessage=" How many days will a log file has to be old to get deleted (0 is off)"
            label="Remove Old Logs After"
            labelPlacement="outside"
            name="logs_delete_after"
            placeholder="bedrock_server"
            type="number"
            value={formState.logs_delete_after?.toString()}
            onChange={handleInputChange}
          />
          {/* SWITCHS */}
          <Switch
            isSelected={formState.auto_start}
            onChange={(e) => handleSwitchChange("auto_start", e.target.checked)}
            name="auto_start"
          >
            Server Auto Start
          </Switch>
          <Switch
            isSelected={formState.crash_detection}
            onChange={(e) =>
              handleSwitchChange("crash_detection", e.target.checked)
            }
            name="crash_detection"
          >
            Server Crash Detection
          </Switch>
          <Switch
            isSelected={formState.count_players}
            onChange={(e) =>
              handleSwitchChange("count_players", e.target.checked)
            }
            name="count_players"
          >
            Include server in total player count
          </Switch>
          <Switch
            isSelected={formState.show_status}
            onChange={(e) =>
              handleSwitchChange("show_status", e.target.checked)
            }
            name="show_status"
          >
            Show On Public Status Page
          </Switch>
          <div className="flex gap-2">
            <Button
              color="primary"
              type="submit"
              onPress={(e) => {
                console.log(formState);
              }}
              startContent={<Icon icon="material-symbols:save" />}
            >
              Save
            </Button>
            <Button
              type="reset"
              variant="flat"
              startContent={<Icon icon="material-symbols:delete" />}
            >
              Cancel
            </Button>
          </div>
          {action && (
            <div className="text-small text-default-500">
              Action: <code>{action}</code>
            </div>
          )}
        </Form>
      </div>
      <div className="col-span-6">
        <Card className="p-2 mt-2">
          <CardHeader>
            <div>
              <h2 className="text-2xl">Server Config Area</h2>
              <p className="text-sm text-default-400">
                Here you can configure your server.
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <p className="mb-2">
              It is recommended to <span className="text-danger-500">NOT</span>{" "}
              change the paths of a server managed by Crafty. Changing paths{" "}
              <span className="text-danger-500">CAN </span>
              break things, especially on Linux type operating systems where
              file permissions are more locked down.
            </p>
            <p className="mb-2">
              If you feel you have to change a where a server is located you may
              do so as long as you give the "crafty" user permission to read /
              write to the server path.
            </p>
            <p className="mb-2">
              On Linux this is best done by executing the following:
              <br />
              <Code color="danger" className="mb-2 mt-2">
                sudo chown crafty:crafty /path/to/your/server -R
              </Code>
              <Code color="danger" className="mb-2">
                sudo chmod 2775 /path/to/your/server -R
              </Code>
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
