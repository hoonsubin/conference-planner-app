import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonInput,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { Attendee } from "../../types";
import { useConferenceEventContext } from "../../context/TravelDataContext";

interface EditNameProps {}

const EditName: React.FC<EditNameProps> = ({}) => {
  const history = useHistory();
  const loc = useLocation();
  const data = loc.state as { attendee: Attendee };
  const [attendee, setAttendee] = useState<Attendee>(data?.attendee ?? "");
  const { allAttendees, addNewAttendee, getAttendee } =
    useConferenceEventContext();
  function saveAttendee() {
    // If attendee has no id or cannot be found in the context, add as new
    if (!attendee.id || !getAttendee(attendee.id)) {
      const newAttendeeWithId = {
        ...attendee,
        id: crypto.randomUUID(),
      };
      addNewAttendee(newAttendeeWithId);
      console.log("Added new attendee", newAttendeeWithId);
    } else {
      // Otherwise update the existing attendee (addNewAttendee handles updates)
      addNewAttendee(attendee);
      console.log("Updated attendee", attendee);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Change name</IonTitle>
        </IonToolbar>
      </IonHeader>
      {data ? (
        <IonContent className="ion-padding">
          <h2>Edit your name</h2>
          <br></br>
          <IonInput
            label="Name"
            labelPlacement="floating"
            clearInput={true}
            placeholder="Enter your name"
            value={attendee?.name}
            onIonInput={(e: any) =>
              setAttendee({ ...attendee, name: e.target.value })
            }
            fill="outline"
            className="ion-padding-top"
          ></IonInput>
          <br></br>
          <IonButton
            onClick={() => {
              saveAttendee();
              history.goBack();
            }}
            expand="block"
            className="ion-padding-top"
          >
            Save
          </IonButton>
        </IonContent>
      ) : (
        <IonContent class="ion-padding ion-text-center">
          <IonText class="ion-text-center">No type and data specified</IonText>
        </IonContent>
      )}
    </IonPage>
  );
};

export default EditName;
