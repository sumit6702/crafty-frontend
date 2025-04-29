"use client";
import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Code,
  CardHeader,
  CardBody,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export default function ServerConfig() {
  const [action, setAction] = React.useState<string | null>(null);
  return (
    <section className="grid grid-cols-12 p-4 border rounded-xl border-secondary-100">
      <div className="col-span-6">
        <Form
          className="w-full max-w-sm flex flex-col gap-4"
          onReset={() => setAction("reset")}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            setAction(JSON.stringify(data, null, 2));
          }}
        >
          <Input
            errorMessage="What you wish to call this server"
            label="Server Name"
            labelPlacement="outside"
            name="server_name"
            placeholder="Enter your server name"
            type="text"
          />

          <Input
            errorMessage="Absolute full path (not including executable)"
            label="Server Path"
            labelPlacement="outside"
            name="server_path"
            placeholder="/servers/602a2d2e"
            type="text"
          />
          <Input
            errorMessage="The server's executable file"
            label="Server Executable"
            labelPlacement="outside"
            name="server_executable"
            placeholder="bedrock_server"
            type="text"
          />
          <Input
            errorMessage="What will be launched in a hidden terminal"
            label="Server Execution Command"
            labelPlacement="outside"
            name="server_executable"
            placeholder="bedrock_server"
            type="text"
          />
          <div className="flex gap-2">
            <Button
              color="primary"
              type="submit"
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
