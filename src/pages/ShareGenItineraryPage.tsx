import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Attendee, FlightPlan, TravelEvent } from "../types";
import { DateTime, Interval } from "luxon";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
// import { IonicSlides } from '@ionic/react';
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import 'swiper/css/keyboard';
// import 'swiper/css/pagination';
// import '@ionic/react/css/ionic-swiper.css';

interface ShareGenItineraryPageProps {
  selectedEvent: TravelEvent;
  attendees: Attendee[];
  flightPlans: FlightPlan[];
}

const ShareGenItineraryPage: React.FC<ShareGenItineraryPageProps> = (props) => {
  const getFlightItinerary = (attendeeId: string) => {
    return props.flightPlans.filter((i) => {
      return i.attendeeId === attendeeId;
    });
  };

  const getDateSequence = (startDate: DateTime, endDate: DateTime) => {
    const interval = Interval.fromDateTimes(
      startDate,
      endDate.plus({ days: 1 })
    );

    const isoDates = interval
      .splitBy({ days: 1 })
      .map((d) => d.start!.toISODate());

    return isoDates.map((i) => {
      return { date: i, textColor: "#800080", backgroundColor: "#ffc0cb" };
    });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Itinerary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h1>Attendee Itinerary</h1>
        {props.attendees.map((attendee) => {
          const travelDates = getDateSequence(
            DateTime.fromISO(attendee.departTime!),
            DateTime.fromISO(attendee.arriveTime!)
          );
          return (
            <IonCard key={crypto.randomUUID()}>
              <IonCardHeader>
                <IonCardTitle>{attendee.name}</IonCardTitle>
                <IonCardSubtitle>
                  Departing from {attendee.homeCity.cityName},{" "}
                  {attendee.homeCity.countryName}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonDatetime
                  presentation="date"
                  value={travelDates[0].date}
                  highlightedDates={travelDates}
                ></IonDatetime>
                <IonList>
                  <IonListHeader>Flight Options</IonListHeader>
                  {getFlightItinerary(attendee.id).map((flight) => {
                    return (
                      <IonItem key={crypto.randomUUID()}>
                        <IonLabel>
                          <strong>{flight.name}</strong>
                          <br />
                          <IonText>Airport: {flight.arrivingLocation}</IonText>
                          <br />
                          <IonText>Airline: {flight.airline}</IonText>
                          <br />
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={flight.bookingLink}
                          >
                            <small>Booking Link</small>
                          </a>

                          <br />
                          <IonNote color="medium" className="ion-text-wrap">
                            Departing from <em>{flight.departLocation}</em> and arriving
                            at <em>{flight.arrivingLocation}</em>
                          </IonNote>
                        </IonLabel>
                      </IonItem>
                    );
                  })}
                </IonList>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    </>
  );
};

export default ShareGenItineraryPage;
