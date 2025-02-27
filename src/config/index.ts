const perplexityApi: string = import.meta.env.VITE_PERPLEXITY_API_KEY;
const gmapApi: string = import.meta.env.VITE_GMAPS_API_KEY;

export const appConfig = {
  perplexityApi: perplexityApi,
  mapsApi: gmapApi,
  perplexityEndpoint: "https://api.perplexity.ai",
  //backendEndpoint: "https://omkfhiqdyqkloogygxdf.supabase.co/functions/v1/conf-travel-fetch",
  backendEndpoint: "http://127.0.0.1:54321/functions/v1/conf-travel-fetch",
  perplexityModel: "sonar",
  attendeeListSaveKey: "ATT",
  eventListSaveKey: "EV",
  savedFlightItineraryKey: "FLIGHT",
  attendeeItineraryListSaveKey: "ATTEVIT"
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

