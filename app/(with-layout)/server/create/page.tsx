"use client";
import { ServerCreate } from "@/components/server-creates";
import { Tabs, Tab } from "@heroui/tabs";
import { Icon } from "@iconify/react";

export default function CreateServer() {
  return (
    <section>
      <Tabs aria-label="Tabs sizes">
        <Tab
          key="mc-java"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="heroicons:computer-desktop" width="20" height="20" />
              <span>Minecraft Java</span>
            </div>
          }
        >
          <ServerCreate />
        </Tab>
        <Tab
          key="mc-bedrock"
          title={
            <div className="flex items-center space-x-2">
              <Icon
                icon="heroicons:device-phone-mobile"
                width="20"
                height="20"
              />
              <span>Minecraft Bedrock</span>
            </div>
          }
        />
      </Tabs>
    </section>
  );
}
