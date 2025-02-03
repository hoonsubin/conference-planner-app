import React, { useEffect, useRef, useState } from 'react';
import { IonAlert, IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonLoading, IonModal, IonPage, IonText, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useHistory, useLocation } from 'react-router';
import { Attendee, FlightItinerary, ConferenceEvent, Budget, AttendeeItinerary } from '../../../types';
import * as services from "../../../services";
import { useLlmApiContext } from '../../../context/LlmApiContext';
import { airplane, bookmarkOutline, link, location, share, shareOutline } from 'ionicons/icons';
import dayjs, { Dayjs } from 'dayjs';
import attendees from '../../../config/dummyData';
import { max } from 'lodash';
import ItineraryCard from './ItineraryCard';
import SelectFlightPlanModal from './SelectFlightPlanModal';
import Lottie from 'react-lottie';
import CustomPopup from '../../general/custompopup/CustomPopup';
import loadingColorful from '../../../../resources/lottie/loading-colorful.json';
import paperAnimated from '../../../../resources/lottie/paper-animated.json';
import paperPlane from '../../../../resources/lottie/paper-plane.json';
import ReactConfetti from 'react-confetti';

interface ItineraryProps {
    
}

const Itinerary: React.FC<ItineraryProps> = ({ }) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: ConferenceEvent, attendees: Attendee[], budgets: Budget, matchFlights: boolean };
    const { perplexityApi } = useLlmApiContext();
    const [flightItineraries, setFlightItineraries] = useState<FlightItinerary[][]>([]);
    const [matchFlights, setMatchFlights] = useState(data.matchFlights);
    const [showAlert, setShowAlert] = useState(false);
    const [editAttendeeIndex, setEditAttendeeIndex] = useState<number>(0);
    const [selectedFlightPlanIndex, setSelectedFlightPlanIndex] = useState<number>(0);
    const [selectedFlightPlan, setSelectedFlightPlan] = useState<FlightItinerary>({} as FlightItinerary);
    const [attendeeItineraries, setAttendeeItineraries] = useState<AttendeeItinerary[]>([]);
    const [sentItineraries, setSentItineraries] = useState(false);

    useEffect(() => {
        //console.log("Itinerary data", data);
        const fetchItinerariesAsync = async () => {
            console.log("Fetching itineraries for each attendee");
            const itinerariesPerAttendee = await Promise.all(
            data.attendees.map(async (attendee) => {
                return services.fetchFlightSchedule(perplexityApi, data.event, attendee, data.event.eventStartDate);
            })
            );
            return itinerariesPerAttendee;
        }
        fetchItinerariesAsync()
            .then((allItineraries: FlightItinerary[][]) => {
            setFlightItineraries(allItineraries);
            console.log("All itineraries per attendee:", allItineraries);
            })
            .catch((error) => {
            console.error("Error fetching itineraries:", error);
            });
    }, [useIonViewDidEnter]);
    
    function shareItineraries() {
        console.log("Share all itineraries via email");
        setSentItineraries(true);
        setTimeout(() => {
            setSentItineraries(false);
        }, 3000);
    }

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
                    {/* <IonButtons slot="end">
                        <IonButton className='ion-padding' onClick={() => {
                                setShowAlert(true);
                            }
                        }>
                            <IonIcon slot="end" icon={bookmarkOutline}></IonIcon>
                        </IonButton>
                    </IonButtons> */}
                </IonToolbar>
            </IonHeader>
            {
                flightItineraries.length === 0 ?
                // loading spinnner
                <CustomPopup
                isOpen={flightItineraries.length === 0}
                onClose={() => {}}
                title="Hold tight"
                message="We are creating the best itineraries for you"
            >
                <Lottie
                // speed={2.5}
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: paperAnimated,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }}/>
            </CustomPopup>
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
                        flightItineraries.map((itineraryOptions, i) => {
                            const fp = itineraryOptions[0];
                            if (!fp) return null;
                            return (
                                <div key={fp.id} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexWrap: "nowrap",
                                }}>
                                    <ItineraryCard
                                        key={fp.id}
                                        itinerary={fp}
                                        allItineraryOptions={itineraryOptions}
                                        attendee={data.attendees[i]}
                                        selectMode={false}
                                        triggerFlightPlanSelection={() => {
                                            setEditAttendeeIndex(i);
                                        }
                                    }
                                    setSelectedFlightPlan={setSelectedFlightPlan}
                                    ></ItineraryCard>
                                    {/* <IonBadge id="open-select-flight-plan-modal" style={{ margin: "auto", padding: '8px' }} color="warning">
                                        Change
                                    </IonBadge> */}
                                    {/* <IonButton expand="block" className="ion-padding">
                                        Share itinerary
                                        <IonIcon slot="end" icon={shareOutline}></IonIcon>
                                    </IonButton> */}
                                </div>
                            );
                        })
                    }
                    </div>
                    <CustomPopup
                        isOpen={sentItineraries}
                        onClose={() => {}}
                        title="Yay!"
                        message="We have sent out the itineraries to all attendees"
                    >
                        <Lottie
                        // speed={2.5}
                        options={{
                            loop: false,
                            autoplay: true,
                            animationData: paperPlane,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }}/>
                    </CustomPopup>
                    {
                        sentItineraries &&
                        <ReactConfetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    }
                </IonContent>
            }
            <IonFooter className='ion-padding'>
                <IonButton expand="block" onClick={() => shareItineraries()}>
                    Share all itineraries via email
                </IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default Itinerary;