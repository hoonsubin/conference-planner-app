import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as services from "../services";
import { appConfig } from "../data";
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
  }, [appConfig.perplexityApi])

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

export const useTravelEventContext = () => {
  return useContext(LlmApiContext);
};
