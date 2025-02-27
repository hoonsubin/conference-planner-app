import { IonModal, IonContent, IonInput, IonButton } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Attendee } from "../types";
import { useConferenceEventContext } from "../context/TravelDataContext";

interface AddAttendeeModalProps {
    newAttendee: Attendee;
    setNewAttendee: React.Dispatch<React.SetStateAction<Attendee>>;
    modal: React.RefObject<HTMLIonModalElement>;
    presentingElement: HTMLElement | null;
    dismiss: (updatedAttendee: Attendee) => void;
}

const AddAttendeeModal: React.FC<AddAttendeeModalProps> = ({
    newAttendee,
    setNewAttendee,
    modal,
    presentingElement,
    dismiss
}) => {
    const { allAttendees } = useConferenceEventContext();
    const [localAttendee, setLocalAttendee] = useState(newAttendee);

    useEffect(() => {
        setLocalAttendee(newAttendee);
    }, [newAttendee]);

    const handleSave = () => {
        console.log(allAttendees.length.toString());
        console.log("before", localAttendee);
        let updatedAttendee = localAttendee;
        if (!localAttendee.id) {
            console.log("setting id");
            updatedAttendee = {
                ...localAttendee,
                id: crypto.randomUUID()
            };
            setLocalAttendee(updatedAttendee);
            setNewAttendee(updatedAttendee);
            console.log("new attendee", updatedAttendee);
        } else {
            setNewAttendee(localAttendee);
            console.log("new attendee", localAttendee);
        }
        // Pass the updated attendee to the parent's dismiss callback
        setTimeout(() => {
            dismiss(updatedAttendee);
        }, 0);
    };

    return (
        <IonModal
            ref={modal}
            trigger="open-modal"
            canDismiss={true}
            presentingElement={presentingElement!}
            initialBreakpoint={0.9}
            breakpoints={[0.5, 0.75, 0.9]}
            backdropDismiss={true}
        >
            <IonContent className="ion-padding">
                <br />
                <h3>Personal information</h3>
                <IonInput
                    label="Name"
                    labelPlacement="floating"
                    clearInput={true}
                    placeholder="Attendee name"
                    value={localAttendee.name}
                    onIonInput={(e: any) =>
                        setLocalAttendee({ ...localAttendee, name: e.detail.value })
                    }
                    fill="outline"
                    className="ion-padding-top"
                />
                <br />
                <IonInput
                    label="Email"
                    labelPlacement="floating"
                    clearInput={true}
                    placeholder="Attendee email"
                    value={localAttendee.email}
                    onIonInput={(e: any) =>
                        setLocalAttendee({ ...localAttendee, email: e.detail.value })
                    }
                    fill="outline"
                    className="ion-padding-top"
                />
                <br />
                <IonInput
                    label="City"
                    labelPlacement="floating"
                    clearInput={true}
                    placeholder="Attendee city"
                    value={localAttendee.departLocation.city}
                    onIonInput={(e: any) =>
                        setLocalAttendee({
                            ...localAttendee,
                            departLocation: { ...localAttendee.departLocation, city: e.detail.value }
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
                    value={localAttendee.departLocation.country}
                    onIonInput={(e: any) =>
                        setLocalAttendee({
                            ...localAttendee,
                            departLocation: { ...localAttendee.departLocation, country: e.detail.value }
                        })
                    }
                    fill="outline"
                    className="ion-padding-top"
                />
                <br />
                <IonButton
                    onClick={handleSave}
                    expand="block"
                    className="ion-padding-top"
                >
                    {localAttendee.id ? "Save" : "Add attendee"}
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default AddAttendeeModal;