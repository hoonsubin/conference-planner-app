import React, { useContext, useMemo, useCallback } from "react";
import * as services from "../services";
import { appConfig } from "../config";
import { AxiosInstance } from "axios";
import { FlightItinerary, ConferenceEvent, Attendee, Location } from "../types";
import { DateTime } from "luxon";

interface LlmApiContextType {
  perplexityApi: AxiosInstance;
  fetchConferenceEventApi: (
    eventTags: string,
    location: Location,
    fromWhen: DateTime
  ) => Promise<ConferenceEvent[]> | null;
  fetchFlightItineraryApi: (
    conference: ConferenceEvent,
    attendee: Attendee,
    flightArrivalTime?: DateTime
  ) => Promise<FlightItinerary[]> | null;
}

const LlmApiContext = React.createContext<LlmApiContextType>({
  perplexityApi: {} as any, // only for initializing
  fetchConferenceEventApi: () => null,
  fetchFlightItineraryApi: () => null,
});

export const LlmApiContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const perplexityApi = useMemo(() => {
    return services.perplexityApiInst(appConfig.perplexityApi);
  }, [appConfig.perplexityApi]);

  const fetchConferenceEventApi = useCallback(
    (
      eventTags: string,
      location: Location,
      fromWhen: DateTime = DateTime.now()
    ) => {
      return services.fetchConferenceList(
        perplexityApi,
        eventTags,
        location,
        fromWhen
      );
    },
    [perplexityApi]
  );

  const fetchFlightItineraryApi = useCallback(
    (
      conference: ConferenceEvent,
      attendee: Attendee,
      flightArrivalTime?: DateTime
    ) => {
      return services.fetchFlightSchedule(perplexityApi, conference, attendee, flightArrivalTime);
    },
    [perplexityApi]
  );

  return (
    <LlmApiContext.Provider
      value={{
        perplexityApi,
        fetchConferenceEventApi,
        fetchFlightItineraryApi,
      }}
    >
      {children}
    </LlmApiContext.Provider>
  );
};

export const useLlmApiContext = () => {
  return useContext(LlmApiContext);
};
