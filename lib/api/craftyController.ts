import apiClient from "@/utilis/apiClient";
import { v4 as uuidv4 } from "uuid";

type LogoutResponse = {
  status: string;
};

export async function login(username: string, password: string) {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout() {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) throw new Error("Token not found in cookies");
    const response = await apiClient.post(
      "/auth/invalidate_tokens",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    document.cookie = "token=; path=/; max-age=0; secure; SameSite=Strict";
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function servers() {
  try {
    const response = await apiClient.get("/servers");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch servers");
  }
}

export async function serverStats(id: string) {
  try {
    const response = await apiClient.get(`/servers/${id}/stats`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch server stats");
  }
}

export async function serverLogs(id: string) {
  try {
    const response = await apiClient.get(`/servers/${id}/logs`, {
      params: { colors: "true" },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch server logs");
  }
}

export async function serverAction(id: string, action: string) {
  try {
    const response = await apiClient.post(`/servers/${id}/action/${action}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to perform server action");
  }
}

export async function serverCommand(id: string, command: string) {
  try {
    const response = await apiClient.post(`/servers/${id}/stdin/`, command, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send server command");
  }
}

export async function serverBackup(id: string) {
  try {
    const backupUUID = uuidv4();
    const response = await apiClient.post(
      `/servers/${id}/action/backup_server/${backupUUID}/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to backup server");
  }
}

export async function serverDelete(id: string) {
  try {
    const response = await apiClient.delete(`/servers/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete server");
  }
}

export async function serverJars() {
  try {
    const response = await apiClient.get("/crafty/JarCache");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch server jars");
  }
}
