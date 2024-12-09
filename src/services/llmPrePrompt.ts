export const systemPrompt = `Only output the JSON list data without other messages.
Find at least 10 items per topic for all requests. If there is no item, output an empty JSON array.
If you could not find a value for a specific property, say 'TBA' except for URLs.
Do not format the JSON string. This means never add "\`\`\`" or "\`\`\`json". `;

// we create a type descriptor here so that we can dynamically change the objects we expect from the LLM. This pattern only works with string props.
const eventListTypeDescriptor = {
  name: "Name of the event",
  description:
    "A long and detailed description of the event, agenda, the target audience, and what to expect from it",
  eventLink: "The URL of the official event page",
  venueLocation:
    "The full event venue address (TBD or only the city if the venue is not known yet)",
  startDate: "ISO standard time (year, month, day, time) of when the event starts",
  endDate: "ISO standard time (year, month, day, time) of when the event officially ends",
};

export type FetchedEventListType = typeof eventListTypeDescriptor;

export const getEventListPrompt = (
  confType: string,
  confLoc: string,
  startDate: Date
) => `Create a list of conferences and events regarding ${confType} or other related topics near ${confLoc} from ${startDate.toISOString()} and onwards.

The output should be a JSON data with the following properties:
${JSON.stringify(eventListTypeDescriptor)}
`;

const transportListTypeDescriptor = {
  name: "Flight provider",
  flightNo: "Flight number",
  airline: "The name of the airline company",
  bookingLink: "Where to book it",
  departLocation:
    "The complete address of the departing location (either a train station or an airport)",
  arrivingLocation:
    "The complete address of the arriving location (either a train station or an airport)",
  departDate: "ISO standard time (year, month, day, time) of when I should depart",
  arrivalDate: "ISO standard time (year, month, day, time) of when I will be arriving",
};

export type FetchedTransportListType = typeof transportListTypeDescriptor;

export const getBestPathPrompt = (
  confLoc: string,
  startLoc: string,
  startDate: Date,
) => `I want to travel to ${confLoc} from ${startLoc} on ${startDate}.
Search for all flight options departing from ${startLoc} around ${startDate} or other the closest time as a JSON file.

The output should be a JSON data with the following properties:
${JSON.stringify(transportListTypeDescriptor)}
`;
