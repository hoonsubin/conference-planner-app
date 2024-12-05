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
    email: "hello@email.lol",
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
    email: "hello@email.lol",
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
    email: "hello@email.lol",
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
    email: "hello@email.lol",
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
    email: "hello@email.lol",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Barcelona",
      countryName: "Spain"
    },
  },
]