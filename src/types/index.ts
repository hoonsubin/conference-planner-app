export * from './perplexityApi';

export interface TravelEvent {
    id: string;
    name: string;
    venueAddr: string;
    eventLink: string;
    description: string;
    eventStart: Date | 'TBD';
    eventEnd: Date | 'TBD';
}

type Budget = {
    amount: number;
    currency: string;
}

type HomeCity = {
    cityName: string;
    countryName: string;
}

export interface Attendee {
    id: string;
    name: string;
    email: string;
    homeCity: HomeCity;
    departTime: Date;
    arriveTime: Date;
    maxBudget?: Budget;
}