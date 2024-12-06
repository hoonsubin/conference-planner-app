import React, { useContext, useEffect, useState } from "react";
import { TravelEvent, Attendee } from "../types";
import * as utils from "../utils";
import { appConfig } from "../data";

interface TravelDataContextType {
  attendees: Attendee[];
  travelEvents: TravelEvent[];
  addAttendee: (newAttendee: Attendee) => void;
  removeAttendee: (attendeeToRemove: Attendee) => void;
  addTravelEvent: (newEvent: TravelEvent) => void;
  removeTravelEvent: (eventToRemove: TravelEvent) => void;
}

const TravelDataContext = React.createContext<TravelDataContextType>({
  attendees: [],
  travelEvents: [],
  addAttendee: () => {},
  removeAttendee: () => {},
  addTravelEvent: () => {},
  removeTravelEvent: () => {},
});

export const TravelDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [attendees, setAttendees] = useState<Attendee[]>(
    utils.loadListLocally(appConfig.attendeeListSaveKey) || []
  );
  const [travelEvents, setTravelEvents] = useState<TravelEvent[]>(
    utils.loadListLocally(appConfig.eventListSaveKey) || []
  );

  const addAttendee = (newAttendee: Attendee) => {
    setAttendees([...attendees, newAttendee]);
  };

  const removeAttendee = (attendeeToRemove: Attendee) => {
    setAttendees(attendees.filter((attendee) => attendee !== attendeeToRemove));
  };

  const addTravelEvent = (newEvent: TravelEvent) => {
    setTravelEvents([...travelEvents, newEvent]);
  };

  const removeTravelEvent = (eventToRemove: TravelEvent) => {
    setTravelEvents(travelEvents.filter((event) => event !== eventToRemove));
  };

  useEffect(() => {
    attendees.length > 0 && utils.saveListLocally(attendees, appConfig.attendeeListSaveKey);
    travelEvents.length > 0 && utils.saveListLocally(travelEvents, appConfig.eventListSaveKey);
  }, [attendees, travelEvents]);

  return (
    <TravelDataContext.Provider
      value={{
        attendees,
        travelEvents,
        addAttendee,
        removeAttendee,
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
