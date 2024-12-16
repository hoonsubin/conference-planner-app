import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonNavLink,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Attendee, TravelEvent, FlightPlan } from "../types";
import { person } from "ionicons/icons";
import { DateTime } from "luxon";
import * as services from "../services";
import { useLlmApiContext } from "../context/LlmApiContext";
import { useState } from "react";
import ShareGenItineraryPage from "./ShareGenItineraryPage";

interface UserItineraryPageProps {
  selectedEvent: TravelEvent;
  attendees: Attendee[];
}

const UserItineraryPage: React.FC<UserItineraryPageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [flightPlans, setFlightPlans] = useState<FlightPlan[]>([]);
  const { api } = useLlmApiContext();

  const onClickGenerate = async () => {
    setIsLoading(true);
    services
      .fetchFlightPath(api, props.selectedEvent, props.attendees)
      .then((i) => {
        console.log(i);
        setFlightPlans(i);
        setIsLoading(false);
      });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Final Check</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonLoading
          message="Generating..."
          spinner="circles"
          isOpen={isLoading}
        />
        <h1>Conference</h1>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{props.selectedEvent.name}</IonCardTitle>
            <IonCardSubtitle>
              <a href={props.selectedEvent.eventLink}>
                {props.selectedEvent.eventLink}
              </a>
            </IonCardSubtitle>
            <IonCardContent>{props.selectedEvent.description}</IonCardContent>
          </IonCardHeader>
        </IonCard>

        <h1>Attendees</h1>
        <IonList>
          <IonListHeader>People</IonListHeader>
          {props.attendees.length > 0 ? (
            props.attendees.map((i) => {
              return (
                <IonItem className="people-item" key={crypto.randomUUID()}>
                  <IonIcon slot="start" icon={person}></IonIcon>
                  <IonLabel>
                    <strong>{i.name}</strong>
                    <br />
                    <IonText>
                      {i.homeCity.cityName}, {i.homeCity.countryName}
                    </IonText>
                    <>
                      <br />
                      <IonText>
                        Departing on {DateTime.fromISO(i.departTime!).day}
                      </IonText>{" "}
                      <IonText>
                        Arrival {DateTime.fromISO(i.arriveTime!).day}
                      </IonText>
                    </>
                  </IonLabel>
                </IonItem>
              );
            })
          ) : (
            <h1>Please add an attendee</h1>
          )}
        </IonList>

        {flightPlans.length > 0 ? (
          <IonNavLink
            routerDirection="forward"
            component={() => (
              <ShareGenItineraryPage
                selectedEvent={props.selectedEvent}
                attendees={props.attendees}
                flightPlans={flightPlans}
              />
            )}
          >
            <IonButton color="danger" expand="block">
              Next
            </IonButton>
          </IonNavLink>
        ) : (
          <IonButton expand="block" onClick={() => onClickGenerate()}>
            Generate Itinerary
          </IonButton>
        )}
      </IonContent>
    </>
  );
};

export default UserItineraryPage;
