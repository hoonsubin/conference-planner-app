import {
    IonContent,
    IonHeader,
    IonList,
    IonItem,
    IonButton,
    IonLabel,
    IonNote,
    IonFooter,
    useIonActionSheet,
    IonButtons,
    IonModal,
    IonTitle,
    IonToolbar,
    IonInput,
    IonTextarea,
  } from "@ionic/react";
import { Attendee, TravelEvent } from "../types";
import { useEffect, useRef, useState } from "react";


interface AccountProps {
    adminAttendee: Attendee;
    attendees: Attendee[];
}

const Account: React.FC<AccountProps> = ({ adminAttendee, attendees }) => {

    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setPresentingElement(page.current);
    }, []);
    function dismiss() {
        modal.current?.dismiss();
    }

return (
    <IonContent>
        <IonHeader class="ion-padding">
        <h3>Personal Information</h3>
        </IonHeader>
        <IonList>
            <IonItem button={true} id="open-modal">
                <IonLabel>Name</IonLabel>
                <IonNote slot="end">{adminAttendee.name}</IonNote>
            </IonItem>
            <IonItem button={true}>
                <IonLabel>Email</IonLabel>
                <IonNote slot="end">{adminAttendee.email}</IonNote>
            </IonItem>
            <IonItem button={true}>
                <IonLabel>Your role</IonLabel>
                <IonNote slot="end">Admin</IonNote>
            </IonItem>
            <IonItem button={true}>
                <IonLabel>Home city</IonLabel>
                <IonNote slot="end">{adminAttendee.homeCity.cityName}, {adminAttendee.homeCity.countryName}</IonNote>
            </IonItem>
        </IonList>
        <IonHeader class="ion-padding ion-padding-top">
            <h3>Company Information</h3>
            <h4>Employees</h4>
        </IonHeader>
        <IonList>
            {attendees.map((attendee) => (
                <IonItem button={true}>
                    <IonLabel>{attendee.name}</IonLabel>
                    <IonNote slot="end">{attendee.homeCity.cityName}, {attendee.homeCity.countryName}</IonNote>
                </IonItem>
            ))}
        </IonList>
        <IonFooter class="ion-padding ion-padding-vertical">
            <IonButton expand="block" routerLink="/account/add-employee">
                <IonLabel>Add employee</IonLabel>
            </IonButton>
        </IonFooter>

        {/* Modal */}
        <IonModal ref={modal} trigger="open-modal" canDismiss={true} presentingElement={presentingElement!} initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75]} backdropDismiss={true}>
          <IonContent className="ion-padding">
            <h2>Name</h2>
            <br></br>
            <IonInput 
                label="Your name"
                labelPlacement="floating"
                clearInput={true}
                placeholder="Your name"
                value={adminAttendee.name}
                fill="outline"
                className="ion-padding-top">
            </IonInput>
            <br></br>
            <IonButton
                onClick={dismiss} 
                expand="block" 
                className="ion-padding-top">
                Save
            </IonButton>
          </IonContent>
        </IonModal>
    </IonContent>
);
};

export default Account;