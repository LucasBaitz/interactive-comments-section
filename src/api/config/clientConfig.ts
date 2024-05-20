import { getUserJwt } from "@/utils/userStorage";
import axios, { AxiosInstance } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const clientConfig: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

clientConfig.interceptors.request.use((config) => {
  const authToken = getUserJwt();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default clientConfig;
