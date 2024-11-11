import { TransportType } from "../types";

export const eventType = ["Blockchain", "AI", "Logistics", "IT"];

export const systemPrompt = `Only output the JSON list data without other messages. Find at least 10 items per topic for all requests. If there is no item, output an empty JSON array.`

// we create a type descriptor here so that we can dynamically change the objects we expect from the LLM. This pattern only works with string props.
const eventListTypeDescriptor = {
    "name": "Name of the event",
    "description": "The detailed description of the event and what to expect from it",
    "eventLink": "The URL of the official event page",
    "venueLocation": "The full event venue address (TBD or only the city if the venue is not known yet)",
    "startDate": "ISO standard time of when the event starts",
    "endDate": "ISO standard time of when the event officially ends"
}

export type FetchedEventListType = typeof eventListTypeDescriptor;

export const getEventListPrompt = (
  confType: typeof eventType | string[],
  confLoc: string,
  startDate: Date
) => `Create a list of conferences and events regarding ${confType.join(',')} or other related topics near ${confLoc} from ${startDate.toISOString()} and onwards.

The output should be a JSON data with the following properties:
${JSON.stringify(eventListTypeDescriptor)}
`;

const transportListTypeDescriptor = {
    "name": "Flight name or the train name",
    "method": "The travel method",
    "bookingLink": "Where to book it",
    "departLocation": "The complete address of the departing location (either a train station or an airport)",
    "arrivingLocation": "The complete address of the arriving location (either a train station or an airport)",
    "departDate": "UTC unix epoch time of when I should depart",
    "arrivalDate": "UTC unix epoch time of when I will be arriving"
};

export type FetchedTransportListType = typeof transportListTypeDescriptor;

export const getBestPathPrompt = (
  confLoc: string,
  startLoc: string,
  startDate: Date,
  method: TransportType
) => `I want to travel to ${confLoc} from ${startLoc} using ${method} on ${startDate}. What is the optimal way? Create a list of all the optimal ways to travel there as a JSON file.

The output should be a JSON data with the following properties:
${JSON.stringify(transportListTypeDescriptor)}
`;
