import { Attendee } from "../types";

export const appConfig = {
  perplexityApi: "", // only for testing. Do not commit
  perplexityEndpoint: "https://api.perplexity.ai",
  perplexityModel: "llama-3.1-sonar-large-128k-online",
  attendeeListSaveKey: "ATT",
  eventListSaveKey: "EV"
};

export const supportedEventTypes = [
    "Video Games",
    "Blockchain",
    "IT",
    "AI",
    "Investment",
    "Real-Estate",
    "Custom Event"
]

export const supportedEventLocations = [
    "Germany",
    "USA",
    "Italy",
    "Japan",
    "Thailand",
    "Custom Location"
]

export const testAttendees: Attendee[] = [
  {
    id: crypto.randomUUID(),
    name: "Hoon",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Munich",
      countryName: "Germany"
    }
  },
  {
    id: crypto.randomUUID(),
    name: "Kai",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Munich",
      countryName: "Germany"
    }
  },
  {
    id: crypto.randomUUID(),
    name: "Yo mama",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Mane",
      countryName: "USA"
    }
  },
  {
    id: crypto.randomUUID(),
    name: "Ben Dover",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Idaho",
      countryName: "USA"
    },
  },
  {
    id: crypto.randomUUID(),
    name: "Moe Lester",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Barcelona",
      countryName: "Spain"
    },
  },
]