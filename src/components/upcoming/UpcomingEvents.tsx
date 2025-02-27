import {
    IonContent,
    IonList,
    IonButton,
    IonImg,
  } from "@ionic/react";
import { ConferenceEvent } from "../../types";
import EventCard from "../eventcard/EventCard";
import { useHistory } from "react-router-dom";


interface EventListProps {
    events: ConferenceEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
    const history = useHistory();
return (
    events.length === 0 ?
    <IonContent class="ion-text-center ion-justify-content-around">
        <div style={{paddingTop: "35%", height: "100%"}}>
            <IonImg src="../../assets/no-event.webp" style={{height: "30%"}}/>
            <h3>No events yet</h3>
            <br></br>
            <IonButton routerLink="/explore">Explore</IonButton>
        </div>
    </IonContent>
    :
    <IonList>
    {events.map((event) => (
        <EventCard key={event.id} event={event} onClick={
            () => history.push({
                pathname: `/upcoming/event/${event.id}`,
                state: { event: event, isSaved: true }
            })
        }/>
    ))}
    </IonList>
);
};

export default EventList;