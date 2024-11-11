export * from './perplexityApi';

export type TransportType = 'Train' | 'Flight';

export interface TravelEvent {
    id: string;
    name: string;
    venueAddr: string;
    eventLink: string;
    description: string;
    eventStart: Date;
    eventEnd: Date;
}