import {
    IonContent,
    IonHeader,
    IonList,
    IonItem,
    IonButton,
    IonLabel,
    IonNote,
    IonFooter,
  } from "@ionic/react";
import { Attendee, TravelEvent } from "../types";
import { useEffect, useRef, useState } from "react";
import { useTravelEventContext } from "../context/TravelDataContext";
import AddAttendeeModal from "./AddAttendeeModal";
import { useHistory } from "react-router-dom";


interface AccountProps {
}

const Account: React.FC<AccountProps> = ({ }) => {

    const history = useHistory();
    const addAttendeeModal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    const [addAttendeeModalPresent, setAddAttendeePresent] = useState<HTMLElement | null>(null);
    const { attendees, addAttendee, getAttendee } = useTravelEventContext();
    const [newAttendee, setNewAttendee] = useState<Attendee>({
        id: "",
        name: "",
        email: "",
        homeCity: {
            cityName: "",
            countryName: ""
        }
    });
    useEffect(() => {
        setAddAttendeePresent(page.current);
    }, []);
    function dismissAddAttendeeModal() {
        addAttendee(newAttendee);
        addAttendeeModal.current?.dismiss();
    }

return (
    <IonContent>
        <IonHeader class="ion-padding">
        <h3>Personal Information</h3>
        </IonHeader>
        <IonList>
            <IonItem 
                button={true} 
                onClick={
                    (e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/edit`, 
                            state: { type: "Name", value: attendees[0]?.name}
                        });
                    }
                }>
            <IonLabel>Name</IonLabel>
            <IonNote slot="end">{attendees[0]?.name}</IonNote>
            </IonItem>
            <IonItem 
                button={true} 
                onClick={
                    (e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/account/edit`, 
                            state: { type: "Email", value: attendees[0]?.email}
                        });
                    }
                }>
            <IonLabel>Email</IonLabel>
            <IonNote slot="end">{attendees[0]?.email}</IonNote>
            </IonItem>
            <IonItem button={true}>
                <IonLabel>Your role</IonLabel>
                <IonNote slot="end">Admin</IonNote>
            </IonItem>
            <IonItem 
                button={true} 
                onClick={
                    (e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/account/edit`, 
                            state: { type: "Home city", value: attendees[0]?.homeCity.cityName}
                        });
                    }
                }>
            <IonLabel>Home city</IonLabel>
            <IonNote slot="end">{attendees[0]?.homeCity.cityName}, {attendees[0]?.homeCity.countryName}</IonNote>
            </IonItem>
        </IonList>
        <IonHeader class="ion-padding ion-padding-top">
            <h3>Company Information</h3>
            <h4>Employees</h4>
        </IonHeader>
        <IonList>
            {attendees.map((attendee) => (
                <IonItem key={attendee.id} button={true}>
                    <IonLabel>{attendee.name}</IonLabel>
                    <IonNote slot="end">{attendee.homeCity.cityName}, {attendee.homeCity.countryName}</IonNote>
                </IonItem>
            ))}
        </IonList>
        <AddAttendeeModal
            newAttendee={newAttendee} 
            setNewAttendee={setNewAttendee} 
            modal={addAttendeeModal} 
            presentingElement={addAttendeeModalPresent}
            dismiss={() => dismissAddAttendeeModal()}
        ></AddAttendeeModal>
        <IonFooter class="ion-padding ion-padding-vertical">
            <IonButton expand="block" id="open-modal">
                <IonLabel>Add employee</IonLabel>
            </IonButton>
        </IonFooter>
    </IonContent>
);
};

export default Account;