import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonButton,
    IonText,
    IonSearchbar,
    IonInput,
    IonImg,
    IonBackButton,
    IonButtons,
    IonCheckbox,
    IonNote,
    IonLabel,
    IonModal,
    IonFooter,
    IonToggle,
    IonRange,
    IonIcon,
} from "@ionic/react";
import { appConfig, supportedEventLocations, supportedEventTypes } from "../config";
import { RouteComponentProps, useHistory, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TravelEvent, Attendee } from "../types";
import { loadListLocally } from "../utils";
import { set } from "react-hook-form";
import dummyData from "../config/dummyData";
import { logoEuro, logoUsd } from "ionicons/icons";
import React from "react";
import AddAttendeeModal from "./AddAttendeeModal";
import { useTravelEventContext } from "../context/TravelDataContext";


interface CreateJourneyProps extends RouteComponentProps<{}> {

}


const CreateJourney: React.FC<CreateJourneyProps> = ({ history }) => {
    // const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: TravelEvent };
    const event = data.event;
    const { attendees, addAttendee, getAttendee } = useTravelEventContext();
    const [selectedAttendees, setSelectedAttendees] = useState<Attendee[]>([]);
    const [locations] = useState(supportedEventLocations);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredLocations = locations.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const [newAttendee, setNewAttendee] = useState<Attendee>({
        id: "",
        name: "",
        email: "",
        homeCity: {
            cityName: "",
            countryName: ""
        }
    });
    const [matchFlights, setMatchFlights] = useState(false);

    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setPresentingElement(page.current);
        //setAttendees(loadListLocally(appConfig.attendeeListSaveKey));
    }, []);
    function dismiss() {
        setNewAttendee({ ...newAttendee, id: attendees.length.toString() });
        console.log("newAttendee", newAttendee);
        addAttendee(newAttendee);
        // clear newAttendee
        setNewAttendee({
            id: "",
            name: "",
            email: "",
            homeCity: {
                cityName: "",
                countryName: ""
            }
        });
        modal.current?.dismiss();
    }


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
            <IonContent class="ion-padding" fullscreen>
                <h1>People</h1>
                <p>Who are you going with?</p>
                {
                    attendees.length === 0 ?
                        <div className="ion-padding ion-text-center ion-align-items-center ion-justify-content-center" style={{ height: "70%", display: "flex" }}>
                            <IonText>
                                No attendees yet
                                <br />
                                <br />
                                Add your first attendee
                            </IonText>
                        </div>
                        :
                        <IonList>
                            {attendees.map((attendee, index) => (
                                <IonItem key={attendee.id} className="item item-text-wrap">
                                    <IonCheckbox
                                        slot="end"
                                        aria-label="Toggle attendence"
                                        checked={selectedAttendees.includes(attendee)}
                                        onIonChange={e => {
                                            const checked = e.detail.checked;
                                            if (checked) {
                                                setSelectedAttendees([...selectedAttendees, attendee]);
                                            } else {
                                                setSelectedAttendees(selectedAttendees.filter(a => a.id !== attendee.id));
                                            }
                                        }}
                                    >
                                    </IonCheckbox>
                                    <IonLabel>
                                        <strong>{attendee.name}</strong>
                                        <IonText></IonText>
                                        <br />
                                        <IonNote color="medium" className="ion-text-wrap">
                                            {attendee.homeCity.cityName}, {attendee.homeCity.countryName}
                                        </IonNote>
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                }
                <AddAttendeeModal newAttendee={newAttendee} setNewAttendee={setNewAttendee} modal={modal} presentingElement={presentingElement} dismiss={dismiss}></AddAttendeeModal>
            </IonContent>
            <IonFooter class="ion-padding" color="primary" style={{ backgroundColor: "#000000" }}>
                <br></br>
                <IonButton className="ion-padding" id="open-modal" expand="block" fill="outline">
                    Add attendee
                </IonButton>
                <br></br>
                <IonItem className="item item-text-wrap">
                    <IonToggle 
                        slot="end" 
                        aria-label="Toggle match flights"
                        checked={matchFlights}
                        onIonChange={e => setMatchFlights(e.detail.checked)}
                    ></IonToggle>
                    <IonLabel>
                        <strong>Match flights</strong>
                        <br />
                        <IonNote color="medium" className="ion-text-wrap" style={{ fontSize: "small" }}>
                            We will try to match flights of attendees
                        </IonNote>
                    </IonLabel>
                </IonItem>
                <br></br>
                {/* <IonButton className="ion-float-right ion-padding" onClick={
                () => {
                    history.push({
                        pathname: `/explore/journey/budget`, 
                        state: { event: event, attendees: attendees,}
                    });
                }
            } fill="outline">
                Next
            </IonButton> */}
                <IonButton className="ion-padding" onClick={
                    () => {
                        history.push({
                            pathname: '/explore/itinerary',
                            state: { event: event, attendees: selectedAttendees, matchFlights: matchFlights }
                        });
                    }
                } expand="block">
                    Create itinerary
                </IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default CreateJourney;