import { Attendee } from "../types";

export const appConfig = {
  perplexityApi: "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", // only for testing. Do not commit
  perplexityEndpoint: "https://api.perplexity.ai",
  perplexityModel: "llama-3.1-sonar-large-128k-online",
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
    name: "Hoon",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Munich",
      countryName: "Germany"
    }
  },
  {
    name: "Kai",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Munich",
      countryName: "Germany"
    }
  },
  {
    name: "Yo mama",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Mane",
      countryName: "USA"
    }
  },
  {
    name: "Ben Dover",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Idaho",
      countryName: "USA"
    },
  },
  {
    name: "Moe Lester",
    departTime: new Date(),
    arriveTime: new Date(),
    homeCity: {
      cityName: "Barcelona",
      countryName: "Spain"
    },
  },
]