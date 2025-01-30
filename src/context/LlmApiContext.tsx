import React, {
  useContext,
  useMemo,
} from "react";
import * as services from "../services";
import { appConfig } from "../config";
import { AxiosInstance } from "axios";

interface LlmApiContextType {
  api: AxiosInstance;
}

const LlmApiContext = React.createContext<LlmApiContextType>({
  api: {} as any, // only for initializing
});

export const LlmApiContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const api = useMemo(() => {
    return services.perplexityApiInst(appConfig.perplexityApi);
  }, [appConfig.perplexityApi]);

  return (
    <LlmApiContext.Provider
      value={{
        api,
      }}
    >
      {children}
    </LlmApiContext.Provider>
  );
};

export const useLlmApiContext = () => {
  return useContext(LlmApiContext);
};
