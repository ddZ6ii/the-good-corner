import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AXIOS_BASE_CONFIG = {
  // Resolve only if the status code is less than 500
  validateStatus: (status: number): boolean => status < 500,
};

type UseAxiosReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export function useAxios<T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): UseAxiosReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    setIsLoading(true);

    async function fetchData(): Promise<void> {
      try {
        const response = await axios<T>({
          ...AXIOS_BASE_CONFIG,
          ...config,
          url: `${BASE_URL}/${endpoint}`,
          signal: controller.signal,
        });
        console.log("response", response);
        if (!ignore) {
          setData(response.data);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError || error instanceof Error) {
          if (!ignore) {
            setError(error.message);
          }
          return;
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void fetchData();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [endpoint, config]);

  return {
    data,
    isLoading,
    error,
  };
}
