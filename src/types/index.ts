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

export interface Attendee {
    name: string;
    homeCity: string;
    departTime: Date;
    arriveTime: Date;
    maxBudget: Budget;
}