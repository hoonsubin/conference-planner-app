import { DateTime } from "luxon";

export * from "./perplexityApi";

export interface TravelEvent {
  id: string;
  name: string;
  venueAddr: string;
  eventLink: string;
  description: string;
  eventStart: DateTime | "TBD";
  eventEnd: DateTime | "TBD";
}

type Budget = {
  amount: number;
  currency: string;
};

type HomeCity = {
  cityName: string;
  countryName: string;
};

export interface Attendee {
  id: string;
  name: string;
  email: string;
  homeCity: HomeCity;
  departTime?: string;
  arriveTime?: string;
  maxBudget?: Budget;
}
