import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonFooter, IonButton } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { i } from 'vite/dist/node/types.d-aGj9QkWt';
import ItineraryCard from './ItineraryCard';
import { useHistory, useLocation, useParams } from 'react-router';
import { FlightItinerary, Attendee, Budget, AttendeeItinerary } from '../../../types';
import { useConferenceEventContext } from '../../../context/TravelDataContext';
import { get, set } from 'lodash';

interface PersonalItineraryProps {
    // Add any props if necessary
}

const PersonalItinerary: React.FC<PersonalItineraryProps> = () => {
    const history = useHistory();
    const loc = useLocation();
    const { eventId, attendeeId } = useParams<{ eventId: string, attendeeId: string }>();
    const { saveConferenceEvent, removeConferenceEvent, allAttendeeItinerary, getAttendee, getFlightItinerary} = useConferenceEventContext();
    const [attendee, setAttendee] = useState<Attendee | undefined>();
    const [attendeeItinerary, setAttendeeItinerary] = useState<AttendeeItinerary | undefined>();
    const [itineraryOptions, setItineraryOptions] = useState<FlightItinerary[]>();
    const [selectedFlightPlan, setSelectedFlightPlan] = useState<FlightItinerary>({} as FlightItinerary);

    useEffect(() => {
        setAttendee(getAttendee(attendeeId) || undefined);
        setAttendeeItinerary(getFlightItineraryForAttendee(attendeeId));
        const flightPlans = getFlightItineraryOptionsForAttendee(attendeeId);
        setSelectedFlightPlan(flightPlans?.[0] || {} as FlightItinerary);
        if (flightPlans) {
            setItineraryOptions(flightPlans.slice(1).filter((flight): flight is FlightItinerary => flight !== null));
        }
        console.log(flightPlans);
    }, []);

    function getFlightItineraryForAttendee(attendeeId: string) {
        return allAttendeeItinerary.find(
            (itinerary) => itinerary.eventId === eventId && itinerary.attendeeId === attendeeId
        );
    }

    function getFlightItineraryOptionsForAttendee(attendeeId: string) {
        return getFlightItineraryForAttendee(attendeeId)?.flightIds.map(
            (flightId) => getFlightItinerary(flightId)
        );
    }

    const shareItinerary = () => {
        // @Kai0711er TODO: Implement the email sharing feature
        console.log("Share itinerary via email");
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>{attendee?.name}</IonTitle>
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
                selectedFlightPlan && // @Kai0711er TODO: Add a way to select the flight plan
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <ItineraryCard
                        key={selectedFlightPlan.id}
                        itinerary={selectedFlightPlan}
                        allItineraryOptions={itineraryOptions}
                        attendee={attendee}
                        selectMode={false}
                        triggerFlightPlanSelection={() => {
                            // @Kai0711er TODO: Add a way to select the flight plan
                            //setEditAttendeeIndex(i);
                        }}
                        setSelectedFlightPlan={setSelectedFlightPlan}
                    ></ItineraryCard>
                </div>
            }
            <IonFooter className='ion-padding'>
                <IonButton expand="block" onClick={() => shareItinerary()}>
                    Share itinerary via email
                </IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default PersonalItinerary;