import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonImg,
  } from "@ionic/react";
import { TravelEvent } from "../types";


interface EventListProps {
    events: TravelEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
return (
    events.length === 0 ?
    <IonContent class="ion-text-center ion-justify-content-around">
        <div style={{paddingTop: "35%", height: "100%"}}>
            <IonImg src="../../resources/no-event.webp" style={{height: "30%"}}/>
            <h3>No events yet</h3>
            <br></br>
            <IonButton routerLink="/explore">Explore</IonButton>
        </div>
    </IonContent>
    :
    <IonList>
    {events.map((event) => (
        <IonCard key={event.id} routerLink={`/upcoming/events/${event.id}`}>
            <IonCardHeader>
                <IonCardSubtitle>{event.eventStart ? event.eventStart.toString() : "TBD"}</IonCardSubtitle>
                <IonCardTitle>{event.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonText>{event.description}</IonText>
                <br></br>
                <IonText>{event.venueAddr}</IonText>
            </IonCardContent>
        </IonCard>
    ))}
    </IonList>
);
};

export default EventList;