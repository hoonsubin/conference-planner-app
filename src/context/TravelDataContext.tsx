import React, { useCallback, useContext, useEffect, useState } from "react";
import { ConferenceEvent, Attendee, FlightItinerary, AttendeeItinerary } from "../types";
import * as utils from "../utils";
import { appConfig } from "../config";

interface TravelDataContextType {
  attendees: Attendee[];
  conferenceEvents: ConferenceEvent[];
  addAttendee: (newAttendee: Attendee) => void;
  removeAttendee: (attendeeToRemove: Attendee) => void;
  getAttendee: (attendeeId: string) => Attendee | null;
  addAttendeeItinerary: (itineraryToAdd: AttendeeItinerary) => void;
  getAttendeeItinerary: (eventId: string) => AttendeeItinerary | null;
  addConferenceEvent: (newEvent: ConferenceEvent) => void;
  removeConferenceEvent: (eventToRemove: ConferenceEvent) => void;
}

const TravelDataContext = React.createContext<TravelDataContextType>({
  attendees: [],
  conferenceEvents: [],
  addAttendee: () => {},
  removeAttendee: () => {},
  getAttendeeItinerary: () => null,
  getAttendee: () => null,
  addAttendeeItinerary: () => {},
  addConferenceEvent: () => {},
  removeConferenceEvent: () => {},
});

export const TravelDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // todo: ensure that the first attendee is the current user profile
  const [attendees, setAttendees] = useState<Attendee[]>(
    utils.loadListLocally(appConfig.attendeeListSaveKey) || []
  );
  const [conferenceEvents, setConferenceEvents] = useState<ConferenceEvent[]>(
    utils.loadListLocally(appConfig.eventListSaveKey) || []
  );

  const addAttendee = (newAttendee: Attendee) => {
    //setAttendees([...attendees, newAttendee]);

    setAttendees((currentAttendees) => {
      const existingAttendeeIndex = currentAttendees.findIndex(
        (attendee) => attendee.id === newAttendee.id
      );

      // Update existing attendee if the ID exists
      if (existingAttendeeIndex !== -1) {
        const updatedAttendees = [...currentAttendees];
        updatedAttendees[existingAttendeeIndex] = {
          ...currentAttendees[existingAttendeeIndex],
          ...newAttendee,
        };
        return updatedAttendees;
      }

      // Add new attendee
      return [...currentAttendees, newAttendee];
    });
  };

  const removeAttendee = useCallback(
    (attendeeToRemove: Attendee) => {
      setAttendees(
        attendees.filter((attendee) => attendee !== attendeeToRemove)
      );
    },
    [attendees]
  );

  const getAttendee = useCallback(
    (attendeeId: string) => {
      if (!attendeeId) {
        return null;
      }

      const attendeeIndex = attendees.findIndex(
        (attendee) => attendee.id === attendeeId
      );

      if (attendeeIndex === -1) {
        return null;
      }
      return attendees[attendeeIndex];
    },
    [attendees]
  );

  const addConferenceEvent = useCallback(
    (newEvent: ConferenceEvent) => {
      setConferenceEvents([...conferenceEvents, newEvent]);
    },
    [conferenceEvents]
  );

  const removeConferenceEvent = useCallback(
    (eventToRemove: ConferenceEvent) => {
      setConferenceEvents(
        conferenceEvents.filter((event) => event !== eventToRemove)
      );
    },
    [conferenceEvents]
  );

  useEffect(() => {
    attendees.length > 0 &&
      utils.saveListLocally(attendees, appConfig.attendeeListSaveKey);
    conferenceEvents.length > 0 &&
      utils.saveListLocally(conferenceEvents, appConfig.eventListSaveKey);
  }, [attendees, conferenceEvents]);

  return (
    <TravelDataContext.Provider
      value={{
        attendees,
        conferenceEvents,
        addAttendee,
        removeAttendee,
        getAttendee,
        addConferenceEvent,
        removeConferenceEvent,
      }}
    >
      {children}
    </TravelDataContext.Provider>
  );
};

export const useTravelEventContext = () => {
  return useContext(TravelDataContext);
};
