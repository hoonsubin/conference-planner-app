import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useCallback } from "react";
import { Attendee } from "../types";

type CloseRole = "confirm" | "cancel";

const AddAttendeeModal: React.FC<{
  dismiss: (
    data?: string | null | undefined | number,
    role?: CloseRole
  ) => void;
}> = ({ dismiss }) => {
  const inputRef = useRef<HTMLIonInputElement>(null);

  const onClickAdd = useCallback(() => {
    const userInput = inputRef.current?.value;
    if (userInput) {
      dismiss(userInput, "confirm");
    }
  }, [inputRef]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Attendee</IonTitle>
          <IonButtons slot="end">
            {/* <IonButton onClick={() => dismiss(inputRef.current?.value, 'confirm')} strong={true}>
              Confirm
            </IonButton> */}
            <IonButton color="medium" onClick={() => dismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            ref={inputRef}
            labelPlacement="stacked"
            label="Enter your name"
            placeholder="Your name"
          />
          <IonButton onClick={() => onClickAdd()}>Add</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AddAttendeeModal;
