import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  addToast,
  Tooltip,
} from "@heroui/react";
// import { serverTypes } from "@/lib/api/servers_helps";
import { serverJars } from "@/lib/api/craftyController";
import { Icon } from "@iconify/react";

const loadServerTypesFromCache = () => {
  const raw = localStorage.getItem("serverTypes");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const isFresh = Date.now() - parsed.timestamp < 30 * 60 * 1000; // 30 mins
    return isFresh ? parsed.data : null;
  } catch {
    return null;
  }
};

export function ServerCreate() {
  const [serverData, setServerData] = React.useState([]);

  const handleReloadCache = async () => {
    const fresh = await serverJars();
    if (fresh) setServerData(fresh.data);
    addToast({
      title: "Server Types",
      description: "Server types reloaded successfully",
      // @ts-ignore
      variant: "flat",
      color: "secondary",
    });
  };

  useEffect(() => {
    const loadServerData = async () => {
      const cached = loadServerTypesFromCache();
      if (cached) {
        setServerData(cached);
      } else {
        const fresh = await serverJars();
        if (fresh) setServerData(fresh.data);
      }
    };
    loadServerData();
  }, []);

  console.log(serverData);
  return (
    <section>
      <Form className="w-full max-w-xs">
        <Select
          className="max-w-xs"
          label="Server Type"
          placeholder="Select Server Type"
        >
          {
            <SelectItem key="1" value="1">
              Minecraft Java
            </SelectItem>
          }
        </Select>

        <Select
          className="max-w-xs"
          label="Server Select"
          placeholder="Select Server Select"
        >
          {
            <SelectItem key="1" value="1">
              Minecraft Fabric
            </SelectItem>
          }
        </Select>

        <Select
          className="max-w-xs"
          label="Server Version"
          placeholder="Select Server Version"
        >
          {
            <SelectItem key="1" value="1">
              1.19.2
            </SelectItem>
          }
        </Select>

        <Tooltip content="Reload Server Types">
          <Button onPress={async () => handleReloadCache()}>
            <Icon icon="mage:reload-reverse" width="20" height="20" />
          </Button>
        </Tooltip>
      </Form>
    </section>
  );
}

export function ServerExisitng() {
  return <div>ServerExisitng</div>;
}

export function ServerZipFile() {
  return <div>ServerZipFile</div>;
}

// const serverTypes = async () => {
//   const token = localStorage.getItem("token") || "";
//   try {
//     const res = await serverTypes(token);
//     console.log(res.data);
//   } catch (error) {}
// };
// serverType();
