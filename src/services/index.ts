import * as llmPrompts from "./llmPrePrompt";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { appConfig } from "../config";
import {
  PerplexityApiRes,
  ConferenceEvent,
  Attendee,
  Location,
  FlightItinerary,
} from "../types";
import stripJsonComments from "strip-json-comments";
import { DateTime } from "luxon";

export const perplexityApiInst = (apiKey: string) => {
  const apiInst = axios.create({
    baseURL: appConfig.perplexityEndpoint,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    timeout: 60000,
  });

  return apiInst;
};

export const backendApiInst = () => {
  const apiInst = axios.create({
    baseURL: appConfig.backendEndpoint,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 60000,
  });

  return apiInst;
};

export const fetchFlightSchedule = async (
  api: AxiosInstance,
  conference: ConferenceEvent,
  attendee: Attendee,
  flightArrivalTime?: DateTime // defaults to the conference start day if none
) => {
  const arrivalTime = flightArrivalTime || conference.eventStartDate;

  try {

    console.log(arrivalTime);
    const formattedIsoString =
      DateTime.fromISO(arrivalTime.toString()).toISO({ // more strict enforcement
        suppressMilliseconds: true,
        includeOffset: false,
      }) + "Z";

    const payload = {
      conferenceCity: conference.venueAddress.city,
      conferenceCountry: conference.venueAddress.country,
      departCity: attendee.departLocation.city,
      departCountry: attendee.departLocation.country,
      fromWhen: formattedIsoString,
    };
    console.log(`Sending ${JSON.stringify(payload)} to /flights`)
    
    const res: AxiosResponse<{ success: boolean; data: FlightItinerary[] }> =
      await api.post("/flights", payload);

    const fetchedFlights = res.data.data;

    console.log(fetchedFlights);

    if (fetchedFlights) {
      return fetchedFlights;
    } else {
      throw new Error(
        `Failed to fetch flight data!\nClient payload: ${JSON.stringify(
          payload
        )}`
      );
    }

    /*
    const newReq = llmPrompts.fetchFlightsApiPayload(
      conference.venueAddress,
      attendee.departLocation,
      arrivalTime
    );
    // todo: handle timeout errors or when the AI cannot find any results
    // send the prompts to the LLM API
    const res: AxiosResponse<PerplexityApiRes> = await api.post(
      "/chat/completions",
      newReq
    );

    const resData = res.data;

    if (resData) {
      console.log(resData.choices[0].message.content);

      // clean the response to be a proper JSON string
      const cleanJsonString = stripJsonComments(
        resData.choices[0].message.content
          .replaceAll("```", "")
          .replaceAll("json", "")
          .replaceAll("\n", "")
      );

      console.log(cleanJsonString);

      const transportOptionObj: llmPrompts.FetchedTransportListType[] =
        JSON.parse(cleanJsonString);

      //return transportOptionObj;
      return transportOptionObj.map((i) => {
        return {
          id: crypto.randomUUID(),
          flightNo: i.flightNo,
          airline: i.airline,
          bookingLink: i.bookingLink,
          departAddress: {
            //todo: fix these
            city: i.deportAddressCity,
            country: i.deportAddressCountry,
            fullAddr: i.deportAddressStreet,
          },
          arrivalAddress: {
            city: i.arrivalAddressCity,
            country: i.arrivalAddressCountry,
            fullAddr: i.arrivalAddressStreet,
          },
          departTime: DateTime.fromISO(i.departTime),
          arrivalTime: DateTime.fromISO(i.arrivalTime),
        };
      }) as FlightItinerary[];
    } else {
      throw new Error(
        "Error with the response. Status: " + res.status.toString()
      );
    }
    */
  } catch (err) {
    // todo: retry the API call if the result was not desirable.
    console.error(err);

    return [];
  }
};

export const fetchConferenceList = async (
  api: AxiosInstance,
  eventTags: string,
  location: Location,
  when: DateTime = DateTime.now()
) => {
  if (!eventTags) {
    throw new Error("No event tag was provided");
  }
  if (!location) {
    throw new Error("No event location was provided");
  }

  try {
    const formattedIsoString =
      DateTime.fromISO(when.toString()).toISO({ // more strict enforcement
        suppressMilliseconds: true,
        includeOffset: false,
      }) + "Z";

    const payload = {
      eventTags: eventTags,
      city: location.city,
      country: location.country,
      fromWhen: formattedIsoString,
    };
    const res: AxiosResponse<{ success: boolean; data: ConferenceEvent[] }> =
      await api.post("/events", payload);

    const fetchedEv = res.data.data;

    console.log(fetchedEv);

    if (Array.isArray(fetchedEv)) {
      return fetchedEv;
    } else {
      throw new Error(
        `Failed to fetch event data!\nClient payload: ${JSON.stringify(
          payload
        )}`
      );
    }

    /*
    // create a prompt for the LLM
    const newReq = llmPrompts.fetchEventsApiPayload(eventTags, location, when);

    console.log(`Sending the following request\n${JSON.stringify(newReq)}`);
    // todo: handle timeout errors or when the AI cannot find any results
    // send the prompts to the LLM API
    const res: AxiosResponse<PerplexityApiRes> = await api.post(
      "/chat/completions",
      newReq
    );
    const resData = res.data;

    if (resData) {
      // clean the response to be a proper JSON string
      const cleanJsonString = stripJsonComments(
        resData.choices[0].message.content
          .replaceAll("```", "")
          .replaceAll("json", "")
          .replaceAll("\n", "")
      );

      console.log(
        `Sanitized ${resData.choices[0].message.content} to ${cleanJsonString}`
      );

      // make sure to remove the comments before parsing
      const eventObj: llmPrompts.FetchedEventListType[] =
        JSON.parse(cleanJsonString);

      // although we can easily modify FetchedEventListType to look like Event,
      return eventObj.map((i) => {
        return {
          id: crypto.randomUUID(),
          name: i.name,
          eventDescription: i.eventDescription,
          venueAddress: {
            city: i.venueAddressCity,
            country: i.venueAddressCountry,
            fullAddr: i.venueAddressStreet,
          },
          eventUrl: i.eventUrl,
          eventStartDate: i.eventStartDate.match("TB")
            ? DateTime.fromISO(i.eventStartDate)
            : i.eventStartDate,
          eventEndDate: i.eventEndDate.match("TB")
            ? DateTime.fromISO(i.eventEndDate)
            : i.eventStartDate,
          //thumbnail: i.thumbnail,
        } as ConferenceEvent; // todo: fix this
      });
    } else {
      throw new Error(
        "Error with the response. Status: " + res.status.toString()
      );
    }
    */
  } catch (err) {
    // todo: retry the API call if the result was not desirable.
    console.error(err);

    return [];
  }
};
