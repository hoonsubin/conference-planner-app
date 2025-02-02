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
    IonCard,
    IonCardContent,
  } from "@ionic/react";
import { ConferenceEvent } from "../../../types";
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import { calendarOutline, heart, heartOutline, locationOutline, openOutline, pinOutline, timeOutline } from "ionicons/icons";
import "./EventDetail.css";
import dayjs from "dayjs";
import { appConfig } from "../../../config";
import { useEffect, useState } from "react";
import { useConferenceEventContext } from "../../../context/TravelDataContext";
import { Browser } from '@capacitor/browser';

interface EventDetailProps 

extends RouteComponentProps<{
    id: string;
}>

{
    // event: ConferenceEvent;
}

const EventDetail: React.FC<EventDetailProps> = ({}) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: ConferenceEvent, isSaved: boolean };
    const [isSaved, setIsSaved] = useState(data?.isSaved);
    const { saveConferenceEvent, removeConferenceEvent } = useConferenceEventContext();
    const [imageSize, setImageSize] = useState(
        window.innerWidth < 768 ? Math.round(window.innerWidth * 0.25).toString() : Math.round(window.innerHeight * 0.15).toString()
    );

    // useEffect(() => {
    //     console.log("triggerd useEffect");
    //     console.log("data", data);
    // }, []);

    function handleEventSave() {
        if (isSaved) {
            // TODO: @kai check event id
            removeConferenceEvent(data.event.id);
        } else {
            saveConferenceEvent(data.event);
        }
        setIsSaved(!isSaved);
    }

    async function openMaps(address: string) {
        const url = `https://www.google.com/maps?q=${address}`;
        await Browser.open({ url });
    }

    function openNativeMaps(address: string) {
        const url = `geo:${0},${0}?q=${address}`;
        window.open(url, '_system');
    }
    
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
            <IonContent className="ion-padding detail-content">
                {/* <IonCard className="event-detail-card">
                    <IonCardContent>
                        <img 
                            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
                            className="event-detail-image"
                            alt="Event Image" 
                        />
                    </IonCardContent>
                </IonCard> */}
                <IonCard className="event-detail-card">
                    <IonCardContent class="flex-space-card ion-padding">
                        <h1 className="gradient-headline">{data.event.name}</h1>
                        <IonIcon icon={isSaved ? heart : heartOutline} size="large" style={
                            {'marginRight': '8px', 'color': isSaved ? 'red' : '--ion-color-primary-contrast'}
                        }
                        onClick={() => {handleEventSave()}}
                        ></IonIcon>
                    </IonCardContent>
                </IonCard>
                <IonCard className="event-detail-card">
                    <IonCardContent className="ion-padding" style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'start'}}>
                        <div style={{'display': 'flex', 'flexDirection': 'row', 'rowGap': '10px', 'alignItems': 'center'}}>
                            <IonIcon icon={calendarOutline} size="large" style={
                                {'marginRight': '10px', 'marginLeft': '10px'}
                            }></IonIcon>
                            <div>
                                <span style={{'fontWeight': 'bold'}}>Date</span><br></br>
                                <span>
                                    {data.event.eventStartDate ? dayjs(data.event.eventStartDate.toLocaleString()).format('MMMM D, YYYY') : "no date available"}
                                </span>
                            </div>
                        </div>
                        <div style={{'display': 'flex', 'flexDirection': 'row', 'rowGap': '10px', 'alignItems': 'center', 'marginLeft': '20px'}}>
                            <IonIcon icon={timeOutline} size="large" style={{'marginRight': '10px', 'marginLeft': '10px'}}></IonIcon>
                            <div>
                                <span style={{'fontWeight': 'bold'}}>Time</span><br></br>
                                <span>
                                    {data.event.eventStartDate ? dayjs(data.event.eventStartDate.toLocaleString()).format('h:mm A') : "no date available"}
                                </span>
                            </div>
                        </div>
                    </IonCardContent>
                </IonCard>
                <IonCard className="event-detail-card">
                    <IonCardContent style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between'}}>
                        <div style={{'display': 'flex', 'flexDirection': 'row', 'rowGap': '10px', 'alignItems': 'center'}}>
                            <IonIcon icon={locationOutline} size="large" style={
                                {'marginRight': '10px', 'marginLeft': '10px'}
                            }></IonIcon>
                            <div>
                                <h4 style={{'fontWeight': 'bold'}}>Location</h4>
                                <h4>
                                    {data.event.venueAddress?.fullAddr}
                                </h4>
                            </div>
                        </div>
                        {
                            appConfig.mapsApi != "" &&
                            <img
                                style={{'borderRadius': '10px', marginLeft: '16px'}}
                                // TODO: @kai check city usage for viewport
                                src={`https://maps.googleapis.com/maps/api/staticmap?center=1600+${data.event.venueAddress?.fullAddr}&zoom=13&size=${imageSize}x${imageSize}&maptype=roadmap&markers=color:red|1600+${data.event.venueAddress?.fullAddr}&key=${appConfig.mapsApi}`}
                                alt="Map view of event location"
                                onClick={() => openMaps(data.event.venueAddress?.fullAddr)}
                            />
                        }
                    </IonCardContent>
                </IonCard>
                <IonCard className="event-detail-card">
                    <IonCardContent>
                        <div className="ion-padding">
                        <h3 style={{'fontWeight': 'bold'}}>About the event</h3>
                        <br></br>
                        <p>{data.event.eventDescription}</p>
                        </div>
                    </IonCardContent>
                </IonCard>
                <IonCard className="event-detail-card">
                    <IonCardContent className="flex-space-card">
                        <div className="ion-padding">
                        <h3>Link to event</h3>
                        {/* {data.event.eventLink != "TBA" &&
                        <span className="ion-align-items-center">
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
                        </div>
                        <IonIcon icon={openOutline} size="large" style={
                            {'marginRight': '8px'}
                        }
                        onClick={() => {
                            Browser.open({ url: data.event.eventUrl });
                        }}
                        ></IonIcon>
                    </IonCardContent>
                </IonCard>
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