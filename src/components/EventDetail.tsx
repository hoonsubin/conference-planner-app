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
    IonBackButton,
    IonButtons,
    IonIcon,
  } from "@ionic/react";
import { TravelEvent } from "../types";
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import { linkOutline, pinOutline, timeOutline } from "ionicons/icons";


interface EventDetailProps 

extends RouteComponentProps<{
    id: string;
}>

{
    // event: TravelEvent;
}

const EventDetail: React.FC<EventDetailProps> = ({ match }) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: TravelEvent };
    const event = data.event;
return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>{event.name}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
            <h1>{event.name}</h1>
            <h4>
                {event.eventStart ? event.eventStart.toLocaleString().split('T')[0] : "no date available"}
            </h4>
            <p>{event.description}</p>
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
            <br></br>
            <br></br>
            <IonButton
                // routerLink={`/explore/journey/${event.id}`}
                expand="block"
                onClick={
                    () => {
                        history.push({
                            pathname: `/explore/journey/${event.id}`, 
                            state: { event: event}
                        });
                    }
                }
            >
                Create journey
            </IonButton>
        </IonContent>
    </IonPage>
);
};

export default EventDetail;