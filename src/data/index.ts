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
