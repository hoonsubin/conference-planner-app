import { IonModal, IonContent, IonInput, IonText, IonButton } from "@ionic/react";
import React from "react";
import { Attendee } from "../types";
import { useConferenceEventContext } from "../context/TravelDataContext";

interface AddAttendeeModalProps {
    newAttendee: Attendee;
    setNewAttendee: React.Dispatch<React.SetStateAction<Attendee>>;
    modal: React.RefObject<HTMLIonModalElement>;
    presentingElement: HTMLElement | null;
    dismiss: () => void;
}

const AddAttendeeModal: React.FC<AddAttendeeModalProps> = ({
    newAttendee,
    setNewAttendee,
    modal,
    presentingElement,
    dismiss
}) => {
    const { allAttendees } = useConferenceEventContext();

    return (
        <IonModal ref={modal} trigger="open-modal" canDismiss={true} presentingElement={presentingElement!} initialBreakpoint={0.9} breakpoints={[0.5, 0.75, 0.9]} backdropDismiss={true}>
            <IonContent className="ion-padding">
                <br />
                <h3>Personal information</h3>
                <IonInput
                    label="Name"
                    labelPlacement="floating"
                    clearInput={true}
                    placeholder="Attendee name"
                    value={newAttendee.name}
                    onIonInput={(e: any) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                    fill="outline"
                    className="ion-padding-top"
                />
                <br />
                <IonInput
                    label="Email"
                    labelPlacement="floating"
                    clearInput={true}
                    placeholder="Attendee email"
                    value={newAttendee.email}
                    onIonInput={(e: any) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                    fill="outline"
                    className="ion-padding-top"
                />
                <br />
                <IonInput
                    label="City"
                    labelPlacement="floating"
                    clearInput={true}
                    placeholder="Attendee city"
                    value={newAttendee.departLocation.city}
                    onIonInput={(e: any) =>
                        setNewAttendee({
                            ...newAttendee,
                            departLocation: { ...newAttendee.departLocation, city: e.target.value }
                        })
                    }
                    fill="outline"
                    className="ion-padding-top"
                />
                <br />
                <IonInput
                    label="Country"
                    labelPlacement="floating"
                    clearInput={true}
                    placeholder="Attendee country"
                    value={newAttendee.departLocation.country}
                    onIonInput={(e: any) =>
                        setNewAttendee({
                            ...newAttendee,
                            departLocation: { ...newAttendee.departLocation, country: e.target.value }
                        })
                    }
                    fill="outline"
                    className="ion-padding-top"
                />
                <br />
                <IonButton
                    onClick={() => {
                        console.log(allAttendees.length.toString());
                        console.log("before", newAttendee);
                        if (newAttendee.id == "" || newAttendee.id == undefined || newAttendee.id == '') {
                            console.log("setting id")
                            // TODO: @kai fix setting id 
                            setNewAttendee({
                                ...newAttendee,
                                id: allAttendees.length.toString()
                            });
                        }
                        console.log("new attendee", newAttendee);
                        dismiss();
                    }}
                    expand="block"
                    className="ion-padding-top"
                >
                    {newAttendee.id ? "Save" : "Add attendee"}
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default AddAttendeeModal;