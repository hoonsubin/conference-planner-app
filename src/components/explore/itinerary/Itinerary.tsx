import React, { useEffect, useState } from 'react';
import { IonAlert, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonText, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useHistory, useLocation } from 'react-router';
import { Attendee, FlightPlan, TravelEvent, Budget } from '../../../types';
import * as utils from "../../../services";
import { useLlmApiContext } from '../../../context/LlmApiContext';
import { airplane, bookmarkOutline, link, location, shareOutline } from 'ionicons/icons';
import dayjs, { Dayjs } from 'dayjs';

interface ItineraryProps {
    
}

const Itinerary: React.FC<ItineraryProps> = ({ }) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: TravelEvent, attendees: Attendee[], budgets: Budget, matchFlights: boolean };
    const { api } = useLlmApiContext();
    const [flightPlans, setFlightPlans] = useState<FlightPlan[]>([]);
    const [matchFlights, setMatchFlights] = useState(data.matchFlights);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        //console.log("Itinerary data", data);
        const fetchItinerariesAsync = async () => {
            console.log("fetching itineraries");
            const fetchedFlightPlans = await utils.fetchFlightPath(api, data.event, data.attendees);
            return fetchedFlightPlans;
        }
        fetchItinerariesAsync()
        .then((e) => {
            setFlightPlans(e);
            console.log("flightPlans", flightPlans);
        })
    }, [useIonViewDidEnter]);

    return (
        <IonPage>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Do you want to save this journey?'}
                message={'You can just save it or share all itineraries with your attendees.'}
                buttons={[
                    {
                        text: 'Save & Share',
                        role: 'save-share',
                        handler: () => {
                            console.log('Save & Share clicked');
                        }
                    },
                    {
                        text: 'Save',
                        role: 'save',
                        handler: () => {
                            console.log('Save clicked');
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }
                ]}
            />
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Itineraries</IonTitle>
                    <IonButtons slot="end">
                        <IonButton className='ion-padding' onClick={() => {
                                setShowAlert(true);
                            }
                        }>
                            <IonIcon slot="end" icon={bookmarkOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {
                flightPlans.length === 0 ?
                // loading spinnner
                <IonContent>
                    <IonLoading
                        message="Fetching itineraries..."
                        spinner="circles"
                        isOpen={flightPlans.length === 0}
                    />
                </IonContent>
                :   
                <IonContent>
                    <div className="ion-padding" style={
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: "nowrap",
                            overflowX: "auto",
                            // whiteSpace: "nowrap",
                            WebkitOverflowScrolling: "touch",
                        }
                    }>
                    {
                        flightPlans.map((fp) => {
                            return (
                                <div key={fp.attendeeId} style={
                                    {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexWrap: "nowrap",
                                    }}
                                    >
                                    <IonCard
                                        key={fp.attendeeId}
                                        className='ion-padding'
                                        style={
                                            {
                                                minWidth: "300px",
                                                minHeight: "560px",
                                                maxHeight: "800px",
                                            }
                                        }>
                                        <IonCardTitle>{fp.name}</IonCardTitle>
                                        <IonCardSubtitle>{fp.attendeeId}</IonCardSubtitle>
                                        <IonCardContent>
                                            <br />
                                            <IonText style={ {display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' } }>
                                                <h2>{dayjs(fp.departDate).format('DD.MM.YYYY')}</h2>
                                                <h1>{dayjs(fp.departDate).format('HH:mm')}</h1>
                                            </IonText>
                                            <br />
                                            <div style={ {display: 'flex', flexDirection: 'row'} }>
                                                <IonIcon icon={location} className="ion-padding-end"></IonIcon>
                                                <IonText>
                                                    <h4>{fp.departLocation}</h4>
                                                </IonText>
                                            </div>
                                            <br />
                                            <div style={ {display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'} }>
                                                <div style={{ borderLeft: "1px solid white", marginLeft: "5px", minHeight: "80px" }}></div>
                                                <IonIcon icon={airplane} className="ion-padding-end"></IonIcon>
                                                <div>
                                                    <IonText>
                                                        <h2>{fp.airline}</h2>
                                                    </IonText>
                                                </div>
                                                <IonText>{fp.flightNo}</IonText>
                                            </div>
                                            <br />
                                            <div style={ {display: 'flex', flexDirection: 'row'} }>
                                                <IonIcon icon={location} className="ion-padding-end"></IonIcon>
                                                <IonText>
                                                    <h4>{fp.arrivingLocation}</h4>
                                                </IonText>
                                            </div>
                                            <br />
                                            <IonText style={ {display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' } }>
                                                <h2>{dayjs(fp.arrivalDate).format('DD.MM.YYYY')}</h2>
                                                <h1>{dayjs(fp.arrivalDate).format('HH:mm')}</h1>
                                            </IonText>
                                            <br />
                                            <br />
                                            <div>
                                                <IonIcon icon={link} className="ion-padding-end"></IonIcon>
                                                <IonText>Booking Link:</IonText>
                                            </div>
                                            <br />
                                            <IonText>
                                                <a href={fp.bookingLink}>{fp.bookingLink}</a>
                                            </IonText>
                                        </IonCardContent>
                                    </IonCard>
                                    <IonButton expand='block' className='ion-padding'>
                                        Share itinerary
                                        <IonIcon slot="end" icon={shareOutline}></IonIcon>
                                    </IonButton>
                                </div>
                            );
                        })
                    }
                    </div>
                </IonContent>
            }
        </IonPage>
    );
};

export default Itinerary;