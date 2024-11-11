import axios, { AxiosInstance, AxiosResponse } from "axios";
import { appConfig } from "../data";

export const perplexityApiInst = (apiKey: string) => {
  const apiInst = axios.create({
    baseURL: appConfig.perplexityEndpoint,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  return apiInst;
};
