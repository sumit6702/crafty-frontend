import axios from "axios";
import { API_URL, API_ENDPOINTS } from "../constants";
import { v4 as uuidv4 } from "uuid";
const getUrl = (endpoint: string) => `${API_URL}${endpoint}`;

export async function serverDelete(token: string, serverId: string) {
  try {
    const response = await axios.request({
      method: "DELETE",
      url: getUrl(`${API_ENDPOINTS.SERVERS}/${serverId}/`),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting server:",
      error?.response?.statusText || error.message
    );
    return null;
  }
}
