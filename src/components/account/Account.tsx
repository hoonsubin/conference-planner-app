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
import { Attendee, ConferenceEvent } from "../../types";
import { useEffect, useRef, useState } from "react";
import { useConferenceEventContext } from "../../context/TravelDataContext";
import AddAttendeeModal from "../AddAttendeeModal";
import { useHistory } from "react-router-dom";

interface AccountProps {
    pg: React.MutableRefObject<HTMLElement | null>;
}

const Account: React.FC<AccountProps> = ({ pg }) => {

    const history = useHistory();
    const addAttendeeModal = useRef<HTMLIonModalElement>(null);
    const [addAttendeeModalPresent, setAddAttendeePresent] = useState<HTMLElement | null>(null);
    const { allAttendees, addNewAttendee, getAttendee } = useConferenceEventContext();
    const [newAttendee, setNewAttendee] = useState<Attendee>({
        id: "",
        name: "",
        email: "",
        departLocation: {
            city: "",
            country: "",
            fullAddr: ""
        },
    });

    useEffect(() => {
        setAddAttendeePresent(pg.current);
    }, []);

    function dismissAddAttendeeModal(updatedAttendee: Attendee) {
        console.log("newAttendee", updatedAttendee);
        addNewAttendee(updatedAttendee);
        setNewAttendee({
            id: "",
            name: "",
            email: "",
            departLocation: {
                city: "",
                country: "",
                fullAddr: ""
            },
        });
        addAttendeeModal.current?.dismiss();
    }

    return (
        <IonContent style={{ paddingBottom: "240px" }}>
            <IonHeader class="ion-padding">
                <h3>Personal Information</h3>
            </IonHeader>
            <IonList>
                <IonItem
                    button={true}
                    onClick={(e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/edit-name`,
                            state: { attendee: allAttendees[0] }
                        });
                    }}>
                    <IonLabel>Name</IonLabel>
                    <IonNote slot="end">{allAttendees[0]?.name}</IonNote>
                </IonItem>
                <IonItem
                    button={true}
                    onClick={(e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/edit-email`,
                            state: { attendee: allAttendees[0] }
                        });
                    }}>
                    <IonLabel>Email</IonLabel>
                    <IonNote slot="end">{allAttendees[0]?.email}</IonNote>
                </IonItem>
                <IonItem button={true}>
                    <IonLabel>Your role</IonLabel>
                    <IonNote slot="end">Admin</IonNote>
                </IonItem>
                <IonItem
                    button={true}
                    onClick={(e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/edit-location`,
                            state: { attendee: allAttendees[0] }
                        });
                    }}>
                    <IonLabel>Home city</IonLabel>
                    <IonNote slot="end">
                        {allAttendees[0]?.departLocation?.city}, {allAttendees[0]?.departLocation?.country}
                    </IonNote>
                </IonItem>
            </IonList>
            <IonHeader class="ion-padding ion-padding-top">
                <h3>Company Information</h3>
                <h4>Employees</h4>
            </IonHeader>
            <IonList>
                {allAttendees[0]?.name !== "" &&
                    allAttendees
                        .sort((a, b) => a?.id?.localeCompare(b.id))
                        .map((attendee, i) => (
                            <IonItem key={attendee.id} button={true}>
                                <IonLabel>
                                    {attendee.name}{" "}
                                    {/* {i === 0 ? <IonChip color="primary">You</IonChip> : ""} */}
                                </IonLabel>
                                <IonNote slot="end">
                                    {attendee.departLocation?.city}, {attendee.departLocation?.country}
                                </IonNote>
                            </IonItem>
                        ))}
            </IonList>
            <IonButton expand="block" id="open-modal" className="ion-padding">
                <IonLabel>Add employee</IonLabel>
            </IonButton>
            <AddAttendeeModal
                newAttendee={newAttendee}
                setNewAttendee={setNewAttendee}
                modal={addAttendeeModal}
                presentingElement={addAttendeeModalPresent}
                dismiss={dismissAddAttendeeModal}
            ></AddAttendeeModal>
            <IonFooter class="ion-padding ion-padding-vertical">
            </IonFooter>
        </IonContent>
    );
};

export default Account;