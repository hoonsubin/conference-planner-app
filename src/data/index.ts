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
    "Health",
    "Music",
    "Sports",
    "IoT",
    "Virtual Reality",
    "Augmented Reality",
    "Education",
    "Finance",
    "Marketing",
    "Science",
    "Engineering",
    "Literature",
    "Art",
    "Travel",
    "Food",
    "Fashion",
    "Environment",
    "Politics"
]

export const supportedEventLocations = [
    "Germany",
    "USA",
    "Italy",
    "Japan",
    "Thailand",
    "Australia",
    "Canada",
    "UK",
    "France",
    "Spain",
    "Brazil",
    "China",
    "India",
    "Russia",
    "South Africa",
    "Mexico",
    "Argentina",
    "Nigeria",
    "Egypt",
    "Saudi Arabia",
    "UAE",
    "Turkey",
]
