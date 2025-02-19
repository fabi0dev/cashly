import axios, { AxiosInstance, AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { HTTP_STATUS_CODES } from "@/constants/HTTPStatusCodes";
import { toastError, toastSuccess } from "@/lib/toast";

export const Api = (): AxiosInstance => {
  const client = axios.create({
    baseURL:
      import.meta.env.MODE === "development"
        ? "/api"
        : import.meta.env.VITE_BASE_URL,
    timeout: 60000,
  });

  //token interceptor
  client.interceptors.request.use((config) => {
    const { authData } = useAuthStore.getState();

    if (authData?.token) {
      config.headers.Authorization = `Bearer ${authData?.token}`;
    }
    return config;
  }, Promise.reject);

  //error interceptor
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (!error.response) {
        return Promise.reject(error);
      }

      const { status, data } = error.response;

      if (status === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
        showErrorToast();
        addReconnectListener();
      }

      return Promise.reject(data as ApiErrorResponse);
    }
  );

  return client;
};

const showErrorToast = () =>
  toastError(
    "Não foi possível conectar ao servidor. Tente novamente mais tarde."
  );

const showReconnectToast = () =>
  toastSuccess("O servidor está disponível novamente.");

const handleReconnect = () => {
  showReconnectToast();
  removeReconnectListener();
};

let isReconnectListenerActive = false;

const addReconnectListener = () => {
  if (!isReconnectListenerActive) {
    window.addEventListener("online", handleReconnect);
    isReconnectListenerActive = true;
  }
};

const removeReconnectListener = () => {
  window.removeEventListener("online", handleReconnect);
  isReconnectListenerActive = false;
};

export interface ApiErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
