"use client";
import { Tabs, Tab } from "@heroui/tabs";
import { Icon } from "@iconify/react";
import ServerConfig from "./serverConfig";
import CommandPanel from "./command-pannel";
import { Key, useEffect, useState } from "react";

export default function Server() {
  const [activeTab, setActiveTab] = useState<string>("terminal");
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  const handleTabChange = (key: Key) => {
    const tabKey = key.toString();
    setActiveTab(tabKey);
    localStorage.setItem("activeTab", tabKey);
  };

  return (
    <section className="p-4">
      <Tabs
        aria-label="Options"
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="terminal"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="material-symbols:terminal" width={16} height={16} />
              <span>Terminal</span>
            </div>
          }
        >
          <CommandPanel />
        </Tab>
        <Tab
          key="schedule"
          title={
            <div className="flex items-center space-x-2">
              <Icon
                icon="material-symbols:calendar-today"
                width={16}
                height={16}
              />
              <span>Schedule</span>
            </div>
          }
        ></Tab>
        <Tab
          key="backup"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="material-symbols:backup" width={16} height={16} />
              <span>Backup</span>
            </div>
          }
        ></Tab>
        <Tab
          key="files"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="material-symbols:folder" width={16} height={16} />
              <span>Files</span>
            </div>
          }
        ></Tab>
        <Tab
          key="config"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="material-symbols:settings" width={16} height={16} />
              <span>Config</span>
            </div>
          }
        >
          <ServerConfig />
        </Tab>
      </Tabs>
    </section>
  );
}
