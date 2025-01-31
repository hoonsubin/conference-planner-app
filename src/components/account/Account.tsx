import {
    IonContent,
    IonHeader,
    IonList,
    IonItem,
    IonButton,
    IonLabel,
    IonNote,
    IonFooter,
    IonChip,
  } from "@ionic/react";
import { Attendee, TravelEvent } from "../../types";
import { useEffect, useRef, useState } from "react";
import { useTravelEventContext } from "../../context/TravelDataContext";
import AddAttendeeModal from "../AddAttendeeModal";
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
        if (attendees.length === 0) {
            addAttendee({
                id: "0",
                name: "",
                email: "",
                homeCity: {
                    cityName: "",
                    countryName: ""
                }
            });
        }
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
                            pathname: `/edit-name`, 
                            state: { attendee: attendees[0]}
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
                            pathname: `/edit-email`, 
                            state: { attendee: attendees[0]}
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
                            pathname: `/edit-location`, 
                            state: { attendee: attendees[0]}
                        });
                    }
                }>
            <IonLabel>Home city</IonLabel>
            <IonNote slot="end">{attendees[0]?.homeCity?.cityName}, {attendees[0]?.homeCity?.countryName}</IonNote>
            </IonItem>
            <IonItem 
                button={true} 
                onClick={
                    (e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/edit-budget`, 
                            state: { attendee: attendees[0]}
                        });
                    }
                }>
            <IonLabel>Budget</IonLabel>
            <IonNote slot="end">{attendees[0]?.maxBudget?.toString() + "€"}</IonNote>
            </IonItem>
        </IonList>
        <IonHeader class="ion-padding ion-padding-top">
            <h3>Company Information</h3>
            <h4>Employees</h4>
        </IonHeader>
        <IonList>
            {attendees.map((attendee) => (
                <IonItem key={attendee.id} button={true}>
                    <IonLabel>
                        {attendee.name}
                        {" "}
                        {
                            attendee.id === "0" ?
                            <IonChip color="primary">You</IonChip> : ""
                        }
                    </IonLabel>
                    <IonNote slot="end">{attendee.homeCity?.cityName}, {attendee.homeCity?.countryName}</IonNote>
                </IonItem>
            ))}
        </IonList>
        <AddAttendeeModal
            newAttendee={newAttendee} 
            setNewAttendee={setNewAttendee} 
            modal={addAttendeeModal}
            presentingElement={addAttendeeModalPresent}
            dismiss={dismissAddAttendeeModal}
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