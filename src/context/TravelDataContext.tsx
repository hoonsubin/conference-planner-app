import React, { useCallback, useContext, useEffect, useState } from "react";
import { TravelEvent, Attendee } from "../types";
import * as utils from "../utils";
import { appConfig } from "../config";

interface TravelDataContextType {
  attendees: Attendee[];
  travelEvents: TravelEvent[];
  addAttendee: (newAttendee: Attendee) => void;
  removeAttendee: (attendeeToRemove: Attendee) => void;
  getAttendee: (attendeeId: string) => Attendee | null;
  addTravelEvent: (newEvent: TravelEvent) => void;
  removeTravelEvent: (eventToRemove: TravelEvent) => void;
}

const TravelDataContext = React.createContext<TravelDataContextType>({
  attendees: [],
  travelEvents: [],
  addAttendee: () => {},
  removeAttendee: () => {},
  getAttendee: () => null,
  addTravelEvent: () => {},
  removeTravelEvent: () => {},
});

export const TravelDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // todo: ensure that the first attendee is the current user profile
  const [attendees, setAttendees] = useState<Attendee[]>(
    utils.loadListLocally(appConfig.attendeeListSaveKey) || []
  );
  const [travelEvents, setTravelEvents] = useState<TravelEvent[]>(
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

  const addTravelEvent = useCallback(
    (newEvent: TravelEvent) => {
      setTravelEvents([...travelEvents, newEvent]);
    },
    [travelEvents]
  );

  const removeTravelEvent = useCallback(
    (eventToRemove: TravelEvent) => {
      setTravelEvents(travelEvents.filter((event) => event !== eventToRemove));
    },
    [travelEvents]
  );

  useEffect(() => {
    attendees.length > 0 &&
      utils.saveListLocally(attendees, appConfig.attendeeListSaveKey);
    travelEvents.length > 0 &&
      utils.saveListLocally(travelEvents, appConfig.eventListSaveKey);
  }, [attendees, travelEvents]);

  return (
    <TravelDataContext.Provider
      value={{
        attendees,
        travelEvents,
        addAttendee,
        removeAttendee,
        getAttendee,
        addTravelEvent,
        removeTravelEvent,
      }}
    >
      {children}
    </TravelDataContext.Provider>
  );
};

export const useTravelEventContext = () => {
  return useContext(TravelDataContext);
};
