import axios from "axios";
import { API_URL, API_ENDPOINTS } from "../constants";
import { v4 as uuidv4 } from "uuid";
const getUrl = (endpoint: string) => `${API_URL}${endpoint}`;

// 1. Get Servers
export async function getServers(token: string) {
  try {
    const response = await axios.get(getUrl(API_ENDPOINTS.SERVERS), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching servers:",
      error?.response?.statusText || error.message
    );
    return null;
  }
}

// 2. Get Server Stats
export async function getServerStats(token: string, serverId: number) {
  try {
    const response = await axios.get(
      getUrl(`${API_ENDPOINTS.SERVERS}/${serverId}/stats`),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data?.data;
  } catch (error: any) {
    throw new Error("Failed to fetch server stats");
  }
}

// 3. Server Backup
export async function serverBackup(token: string, serverId: string) {
  const backupUUID = uuidv4();
  try {
    const response = await axios.post(
      getUrl(
        `${API_ENDPOINTS.SERVERS}/${serverId}/action/backup_server/${backupUUID}/`
      ),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error backing up server:",
      error?.response?.statusText || error.message
    );
    return null;
  }
}

// 4. Server Action
export async function serverAction(
  token: string,
  serverId: string,
  action: string
) {
  try {
    const response = await axios.post(
      getUrl(`${API_ENDPOINTS.SERVERS}/${serverId}/action/${action}/`),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error performing server action:",
      error?.response?.statusText || error.message
    );
    return null;
  }
}

// 5. Server Command
export async function serverCommand(
  token: string,
  serverId: string,
  command: string
) {
  try {
    const response = await axios.post(
      getUrl(`${API_ENDPOINTS.SERVERS}/${serverId}/stdin/`),
      { command },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error sending server command:",
      error?.response?.statusText || error.message
    );
    return null;
  }
}

// 6. Server Logs
export async function serverLogs(token: string, serverId: string) {
  try {
    const response = await axios.request({
      method: "GET",
      url: getUrl(`${API_ENDPOINTS.SERVERS}/${serverId}/logs`),
      params: { colors: "true" },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching server logs:",
      error?.response?.statusText || error.message
    );
    return null;
  }
}

export async function serverTypes(token: string) {
  try {
    const response = await axios.request({
      method: "GET",
      url: getUrl(API_ENDPOINTS.JARCACHE),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.data;
    const cacheItem = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem("serverTypes", JSON.stringify(cacheItem));
    return data;
  } catch (error) {
    console.error("Error fetching server types:", error);
    return null;
  }
}
