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
    IonLoading,
    useIonViewDidEnter,
    IonBackButton,
    IonButtons,
    IonIcon,
  } from "@ionic/react";
import { TravelEvent } from "../types";
import { useLlmApiContext } from "../context/LlmApiContext";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import * as utils from "../services";
import { linkOutline, pinOutline, timeOutline} from "ionicons/icons";

interface FetchEventsParams {
    event: string;
    location: string;
}

const EventResults: React.FC = () => {
    const history = useHistory();
    const loc = useLocation();
    const { api } = useLlmApiContext();
    const data = loc.state as { event: string, location: string };
    const eventStr = data.event;
    const locationStr = data.location;
    const [events, setEvents] = useState<TravelEvent[]>([]);

    useEffect(() => {
        const fetchEventsAsync = async () => {
            console.log("fetching events");
            const fetchedEvents = await utils.fetchConferenceList(api, eventStr, locationStr);
            // console.log("fetchedEvents", fetchedEvents);
            // setEvents(fetchedEvents);
            // console.log("events", events);
            return fetchedEvents;
        }
        fetchEventsAsync()
        .then((e) => {
            setEvents(e);
            console.log("events", events);
          })
    }, [useIonViewDidEnter]);

return (
    <IonContent>
    {
        events.length === 0 ?
        // loading spinnner
        <IonContent>
            <IonLoading
                message="Fetching events..."
                spinner="circles"
                isOpen={events.length === 0}
            />
        </IonContent>
        :
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Results</IonTitle>
                </IonToolbar>
                {/* <h2 className="ion-padding-start">{eventStr} in {locationStr}:</h2> */}
            </IonHeader>
            <IonContent>
                <IonList>
                {events.map((event) => (
                    <IonCard key={event.id} 
                    // routerLink={`/explore/events/${event.id}`}
                    onClick={
                        () => {
                            history.push({
                                pathname: `/explore/event/${event.id}`, 
                                state: { event: event}
                            });
                        }
                    }
                    >
                        <IonCardHeader>
                            <IonCardSubtitle>
                                <IonIcon icon={timeOutline} className="ion-padding-end"></IonIcon>
                                {event.eventStart ? event.eventStart.toLocaleString().split('T')[0] : "no date available"}
                            </IonCardSubtitle>
                            <br></br>
                            <IonCardTitle>{event.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className="ion-padding">
                            <IonText className="ion-margin-bottom">{event.description}</IonText>
                            <br></br>
                            <br></br>
                            <IonIcon icon={pinOutline} className="ion-padding-end"></IonIcon>
                            <IonText>{event.venueAddr}</IonText>
                            <br></br>
                            <br></br>
                            {event.eventLink != "TBA" &&
                            <span className="ion-align-items-center">
                                <IonIcon icon={linkOutline} className="ion-padding-end"></IonIcon>
                                <a 
                                // href={event.eventLink}
                                >
                                    {
                                        event.eventLink.split('//')[1].includes('/') ?
                                        event.eventLink.split('//')[1].split('/')[0] :
                                        event.eventLink.split('//')[1]
                                    }
                                </a>
                            </span>
                            }
                        </IonCardContent>
                        {/* <IonButton fill="clear">Create journey</IonButton> */}
                    </IonCard>
                ))}
                </IonList>
            </IonContent>
        </IonPage>
    }
    </IonContent>
);
};

export default EventResults;