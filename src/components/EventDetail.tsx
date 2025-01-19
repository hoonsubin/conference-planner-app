import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonText,
    IonBackButton,
    IonButtons,
    IonIcon,
  } from "@ionic/react";
import { TravelEvent } from "../types";
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import { pinOutline } from "ionicons/icons";


interface EventDetailProps 

extends RouteComponentProps<{
    id: string;
}>

{
    // event: TravelEvent;
}

const EventDetail: React.FC<EventDetailProps> = ({}) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: TravelEvent };
return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>{data ? data.event.name : "Event Detail"}</IonTitle>
            </IonToolbar>
        </IonHeader>
        {
            data ?
            <IonContent class="ion-padding">
                <h1>{data.event.name}</h1>
                <h4>
                    {data.event.eventStart ? data.event.eventStart.toLocaleString().split('T')[0] : "no date available"}
                </h4>
                <p>{data.event.description}</p>
                <br></br>
                <IonIcon icon={pinOutline} className="ion-padding-end"></IonIcon>
                <IonText>{data.event.venueAddr}</IonText>
                <br></br>
                <br></br>
                {/* {data.event.eventLink != "TBA" &&
                <span className="ion-align-items-center">
                    <IonIcon icon={linkOutline} className="ion-padding-end"></IonIcon>
                    <a 
                    // href={data.event.eventLink}
                    >
                        {
                            data.event.eventLink.split('//')[1].includes('/') ?
                            data.event.eventLink.split('//')[1].split('/')[0] :
                            data.event.eventLink.split('//')[1]
                        }
                    </a>
                </span>
                } */}
                <br></br>
                <br></br>
                <IonButton
                    // routerLink={`/explore/journey/${data.event.id}`}
                    expand="block"
                    onClick={
                        () => {
                            history.push({
                                pathname: `/explore/journey`, 
                                state: { event: data.event}
                            });
                        }
                    }
                >
                    Create journey
                </IonButton>
            </IonContent>
            :
            <IonContent class="ion-padding ion-text-center">
                <IonText class="ion-text-center">No event specified</IonText>
            </IonContent>
        }
    </IonPage>
);
};

export default EventDetail;