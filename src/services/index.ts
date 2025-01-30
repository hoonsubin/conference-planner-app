import * as llmPrompts from "./llmPrePrompt";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { appConfig } from "../config";
import {
  PerplexityApiRes,
  PerplexityApiReq,
  TravelEvent,
  Attendee,
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

export const fetchFlightPath = async (
  api: AxiosInstance,
  conference: TravelEvent,
  attendees: Attendee[]
) => {
  const promps: PerplexityApiReq[] = attendees.map((i) => {
    const departCity = `${i.homeCity.cityName}, ${i.homeCity.countryName}`;

    // create a prompt for the LLM
    const newReq: PerplexityApiReq = {
      model: appConfig.perplexityModel,
      messages: [
        {
          role: "system",
          content: llmPrompts.systemPrompt,
        },
        {
          role: "user",
          content: llmPrompts.getBestPathPrompt(
            conference.venueAddr,
            departCity,
            DateTime.fromISO(i.arriveTime!)
          ),
        },
      ],
      temperature: 0,
    };
    return newReq;
  });

  const flightsPromise = promps.map(async (i, index) => {
    const currentAttendeeId = attendees[index].id;

    try {
      // todo: handle timeout errors or when the AI cannot find any results
      // send the prompts to the LLM API
      const res: AxiosResponse<PerplexityApiRes> = await api.post(
        "/chat/completions",
        i
      );

      const resData = res.data;

      if (resData) {
        //console.log(resData);

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
            ...i,
            attendeeId: currentAttendeeId,
          };
        });
      } else {
        throw new Error(
          "Error with the response. Status: " + res.status.toString()
        );
      }
    } catch (err) {
      // todo: retry the API call if the result was not desirable.
      console.error(err);

      return [];
    }
  });

  const resolvedRes = Promise.all(flightsPromise);

  return (await resolvedRes).flat();
};

export const fetchConferenceList = async (
  api: AxiosInstance,
  eventTags: string,
  location: string,
  when: DateTime = DateTime.now()
) => {
  if (!eventTags) {
    throw new Error("No event tag was provided");
  }
  if (!location) {
    throw new Error("No event location was provided");
  }

  // create a prompt for the LLM
  const newReq: PerplexityApiReq = {
    model: appConfig.perplexityModel,
    messages: [
      {
        role: "system",
        content: llmPrompts.systemPrompt,
      },
      {
        role: "user",
        content: llmPrompts.getEventListPrompt(eventTags, location, when),
      },
    ],
    temperature: 0,
  };

  try {
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

      // although we can easily modify FetchedEventListType to look like TravelEvent,
      return eventObj.map((i) => {
        return {
          id: crypto.randomUUID(),
          name: i.name,
          description: i.description,
          venueAddr: i.venueLocation,
          eventLink: i.eventLink,
          eventStart: i.startDate.match("TB")
            ? DateTime.fromISO(i.startDate)
            : i.startDate,
          eventEnd: i.endDate.match("TB")
            ? DateTime.fromISO(i.endDate)
            : i.startDate,
        } as TravelEvent;
      });
    } else {
      throw new Error(
        "Error with the response. Status: " + res.status.toString()
      );
    }
  } catch (err) {
    // todo: retry the API call if the result was not desirable.
    console.error(err);

    return [];
  }
};
