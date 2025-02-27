import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ConferenceEvent,
  Attendee,
  FlightItinerary,
  AttendeeItinerary,
  Budget,
} from "../types";
import * as utils from "../utils";
import { appConfig } from "../config";
import _ from "lodash";

interface TravelDataContextType {
  allAttendees: Attendee[];
  savedConferenceEvents: ConferenceEvent[];
  savedFlights: FlightItinerary[];
  allAttendeeItinerary: AttendeeItinerary[];

  addNewAttendee: (newAttendee: Attendee) => void;
  saveConferenceEvent: (newEvent: ConferenceEvent) => void;
  createNewAttendeeItinerary: (
    eventToAttend: ConferenceEvent,
    personAttending: Attendee,
    flights: FlightItinerary[],
    budget?: Budget
  ) => void;

  getAttendee: (attendeeId: string) => Attendee | null;
  getAttendeeItinerary: (eventId: string) => AttendeeItinerary | null;
  getFlightItinerary: (flightId: string) => FlightItinerary | null;
  getConferenceEvent: (confId: string) => ConferenceEvent | null;

  removeAttendee: (attendeeId: string) => void;
  removeConferenceEvent: (confId: string) => void;
  removeFlightItinerary: (flightId: string) => void;
}

const TravelDataContext = React.createContext<TravelDataContextType>({
  allAttendees: [],
  savedConferenceEvents: [],
  savedFlights: [],
  allAttendeeItinerary: [],

  addNewAttendee: () => {},
  saveConferenceEvent: () => {},
  createNewAttendeeItinerary: () => {},

  getAttendee: () => null,
  getAttendeeItinerary: () => null,
  getFlightItinerary: () => null,
  getConferenceEvent: () => null,

  removeAttendee: () => {},
  removeConferenceEvent: () => {},
  removeFlightItinerary: () => {},
});

export const TravelDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ===all state list===
  // todo: ensure that the first attendee is the current user profile
  const [allAttendees, setAttendees] = useState<Attendee[]>(
    utils.loadListLocally(appConfig.attendeeListSaveKey) || []
  );

  const [savedConferenceEvents, setSavedConferenceEvents] = useState<
    ConferenceEvent[]
  >(utils.loadListLocally(appConfig.eventListSaveKey) || []);

  const [savedFlights, setSavedFlights] = useState<FlightItinerary[]>(
    utils.loadListLocally(appConfig.savedFlightItineraryKey) || []
  );

  const [allAttendeeItinerary, setAttendeeItinerary] = useState<
    AttendeeItinerary[]
  >(utils.loadListLocally(appConfig.attendeeItineraryListSaveKey) || []);

  // ===getter functions===

  const getAttendee = useCallback(
    (attendeeId: string) => {
      if (!attendeeId) {
        return null;
      }

      const attendeeIndex = _.findIndex(
        allAttendees,
        (allAttendees) => allAttendees.id === attendeeId
      );

      if (attendeeIndex === -1) {
        return null;
      }
      return allAttendees[attendeeIndex];
    },
    [allAttendees]
  );

  const getAttendeeItinerary = useCallback(
    (eventId: string) => {
      if (!eventId) {
        return null;
      }
      const itineraryIndex = _.findIndex(
        allAttendeeItinerary,
        (i) => i.eventId === eventId
      );

      if (itineraryIndex === -1) {
        return null;
      }
      return allAttendeeItinerary[itineraryIndex];
    },
    [allAttendeeItinerary]
  );

  const getFlightItinerary = useCallback(
    (flightId: string) => {
      if (!flightId) {
        return null;
      }

      const flightIndex = _.findIndex(savedFlights, (i) => i.id === flightId);

      if (flightIndex === -1) {
        return null;
      }
      return savedFlights[flightIndex];
    },
    [savedFlights]
  );

  const getConferenceEvent = useCallback(
    (confId: string) => {
      if (!confId) {
        return null;
      }

      const confIndex = _.findIndex(
        savedConferenceEvents,
        (i) => i.id === confId
      );

      if (confIndex === -1) {
        return null;
      }
      return savedConferenceEvents[confIndex];
    },
    [savedConferenceEvents]
  );

  // ===remover functions===

  const removeAttendee = useCallback(
    (attendeeId: string) => {
      setAttendees(_.remove(allAttendees, (i) => i.id === attendeeId));
    },
    [allAttendees]
  );

  const removeConferenceEvent = useCallback(
    (confId: string) => {
      setSavedConferenceEvents(
        _.remove(savedConferenceEvents, (i) => i.id === confId)
      );
    },
    [savedConferenceEvents]
  );

  const removeFlightItinerary = useCallback(
    (flightId: string) => {
      setSavedFlights(_.remove(savedFlights, (i) => i.id === flightId));
    },
    [savedFlights]
  );

  // ===adder functions===
  const addNewAttendee = useCallback(
    (newAttendee: Attendee) => {
      const oldAttendee = getAttendee(newAttendee.id);
      if (!!oldAttendee) {
        console.log(
          `Attendee ${newAttendee.name} (ID: ${newAttendee.id}) already exists. Updating instead.`
        );

        // remove the attendee first
        removeAttendee(newAttendee.id);

        setAttendees([
          ...allAttendees,
          {
            ...oldAttendee,
            ...newAttendee, // overwrite the old attendee info with the new attendee
          },
        ]);
      } else {
        setAttendees([...allAttendees, newAttendee]);
      }
    },
    [allAttendees]
  );

  const saveConferenceEvent = useCallback(
    (newEvent: ConferenceEvent) => {
      if (!!getConferenceEvent(newEvent.id)) {
        console.warn(
          `Conference ${newEvent.name} (ID: ${newEvent.id}) already exists.`
        );
        return;
      }
      setSavedConferenceEvents([...savedConferenceEvents, newEvent]);
    },
    [savedConferenceEvents]
  );

  const createNewAttendeeItinerary = useCallback(
    (
      eventToAttend: ConferenceEvent,
      personAttending: Attendee,
      flights: FlightItinerary[],
      budget?: Budget
    ) => {
      // todo: check if the ref ID for all properties exist
      // also, only save the flight object if it's part of an itinerary

      if (!getAttendee(personAttending.id)) {
        console.warn(
          `Attendee ${personAttending.name} (ID: ${personAttending.id}) does not exist in the database. Saving them locally.`
        );
        addNewAttendee(personAttending);
      }

      if (!getConferenceEvent(eventToAttend.id)) {
        console.warn(
          `Conference ${eventToAttend.name} (ID: ${eventToAttend.id} does not exist in the database. Saving them locally.)`
        );
        saveConferenceEvent(eventToAttend);
      }

      const flightIds = _.map(flights, (i) => {
        if (!getFlightItinerary(i.id)) {
          console.log(
            `Flight ${i.flightNo} (ID: ${i.id}) does not exist in the database. Saving them locally.`
          );
          setSavedFlights([...savedFlights, i]);
        }
        return i.id;
      });

      const itineraryToAdd: AttendeeItinerary = {
        eventId: eventToAttend.id,
        attendeeId: personAttending.id,
        flightIds,
        budget,
      };

      setAttendeeItinerary([...allAttendeeItinerary, itineraryToAdd]);
    },
    [
      allAttendeeItinerary,
      savedFlights,
      setAttendeeItinerary,
      getAttendee,
      addNewAttendee,
      getConferenceEvent,
      saveConferenceEvent,
      getFlightItinerary,
      setSavedFlights,
    ]
  );

  // ===background state updates and clean ups===

  // sync the active state data with the browser-saved data
  useEffect(() => {
    allAttendees.length > 0 &&
      utils.saveListLocally(allAttendees, appConfig.attendeeListSaveKey);

    savedConferenceEvents.length > 0 &&
      utils.saveListLocally(savedConferenceEvents, appConfig.eventListSaveKey);

    savedFlights.length > 0 &&
      utils.saveListLocally(savedFlights, appConfig.savedFlightItineraryKey);

    allAttendeeItinerary.length > 0 &&
      utils.saveListLocally(
        allAttendeeItinerary,
        appConfig.attendeeItineraryListSaveKey
      );
  }, [allAttendees, savedConferenceEvents, savedFlights, allAttendeeItinerary]);

  return (
    <TravelDataContext.Provider
      value={{
        allAttendees,
        savedConferenceEvents,
        savedFlights,
        allAttendeeItinerary,

        addNewAttendee,
        saveConferenceEvent,
        createNewAttendeeItinerary,

        getAttendee,
        getAttendeeItinerary,
        getFlightItinerary,
        getConferenceEvent,

        removeAttendee,
        removeConferenceEvent,
        removeFlightItinerary,
      }}
    >
      {children}
    </TravelDataContext.Provider>
  );
};

export const useConferenceEventContext = () => {
  return useContext(TravelDataContext);
};
