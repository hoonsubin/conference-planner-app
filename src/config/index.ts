const perplexityApi = import.meta.env.VITE_PERPLEXITY_API_KEY;
const gmapApi = import.meta.env.VITE_GMAPS_API_KEY;

export const appConfig = {
  perplexityApi: perplexityApi,
  mapsApi: gmapApi,
  perplexityEndpoint: "https://api.perplexity.ai",
  perplexityModel: "sonar-pro",
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

