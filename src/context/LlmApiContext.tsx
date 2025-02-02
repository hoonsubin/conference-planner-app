import React, { useContext, useMemo, useCallback } from "react";
import * as services from "../services";
import { appConfig } from "../config";
import { AxiosInstance } from "axios";
import { FlightItinerary, ConferenceEvent, Attendee, Location } from "../types";
import { DateTime } from "luxon";

// Define the interface for LlmApiContextType
interface LlmApiContextType {
  perplexityApi: AxiosInstance; // Axios instance to interact with Perplexity API

  // Function to fetch conference events, it accepts event tags, location and fromWhen (default is current date and time)
  fetchConferenceEventApi: (
    eventTags: string,
    location: Location,
    fromWhen?: DateTime
  ) => Promise<ConferenceEvent[]>;

  // Function to fetch flight itinerary, it accepts conference event, attendee and optional arrival time of the flight
  fetchFlightItineraryApi: (
    conference: ConferenceEvent,
    attendee: Attendee,
    flightArrivalTime?: DateTime
  ) => Promise<FlightItinerary[]> | null;
}

// Create a new context for LlmApiContextType with initial values
const LlmApiContext = React.createContext<LlmApiContextType>({
  perplexityApi: {} as any, // Initial value is an empty object

  fetchConferenceEventApi: async () => [], // Async function to return an empty array of ConferenceEvents

  fetchFlightItineraryApi: async () => [], // Async function to return an empty array of FlightItineraries
});

// Define a React functional component for LlmApiContextProvider, it accepts children as props
export const LlmApiContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use useMemo to create an instance of Perplexity API with app configuration
  const perplexityApi = useMemo(
    () => services.perplexityApiInst(appConfig.perplexityApi),
    [appConfig.perplexityApi]
  );

  // Use useCallback to create a memoized version of fetchConferenceEventApi function, it accepts event tags, location and fromWhen as arguments
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
      ); // Call the fetchConferenceList service with perplexityApi, event tags, location and fromWhen
    },
    [perplexityApi]
  ); // Add perplexityApi as a dependency to useCallback

  // Use useCallback to create a memoized version of fetchFlightItineraryApi function, it accepts conference, attendee and flightArrivalTime as arguments
  const fetchFlightItineraryApi = useCallback(
    (
      conference: ConferenceEvent,
      attendee: Attendee,
      flightArrivalTime?: DateTime
    ) => {
      return services.fetchFlightSchedule(
        perplexityApi,
        conference,
        attendee,
        flightArrivalTime
      ); // Call the fetchFlightSchedule service with perplexityApi, conference, attendee and flightArrivalTime
    },
    [perplexityApi]
  ); // Add perplexityApi as a dependency to useCallback

  return (
    /* Provide the context value to all children components */
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

// Define a custom hook to consume the LlmApiContext
export const useLlmApiContext = () => {
  return useContext(LlmApiContext); // Use the useContext hook to get the context value and return it
};
