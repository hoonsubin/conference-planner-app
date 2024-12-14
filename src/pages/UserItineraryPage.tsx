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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Attendee, TravelEvent } from "../types";
import { person } from "ionicons/icons";
import { DateTime } from "luxon";

interface UserItineraryPageProps {
  selectedEvent: TravelEvent;
  attendees: Attendee[];
}

const UserItineraryPage: React.FC<UserItineraryPageProps> = (props) => {
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

        <IonButton
          expand="block"
          onClick={() => console.log("implement this behavior")}
        >
          Generate Itinerary
        </IonButton>
      </IonContent>
    </>
  );
};

export default UserItineraryPage;
