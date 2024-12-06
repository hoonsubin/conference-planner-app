import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState, useCallback } from "react";
import { Attendee } from "../types";
import { CountrySelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

type CloseRole = "confirm" | "cancel";

const AddAttendeeModal: React.FC<{
  dismiss: (data?: any | null, role?: CloseRole) => void;
}> = ({ dismiss }) => {
  const nameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const cityRef = useRef<HTMLIonInputElement>(null);
  const countryRef = useRef<HTMLIonInputElement>(null);
  const budgetRef = useRef<HTMLIonInputElement>(null);

  const [areAllInputsFilled, setAreAllInputsFilled] = useState(false);

  const handleInputChange = useCallback(() => {
    const nameValue = nameRef.current?.value;
    const emailValue = emailRef.current?.value;
    const cityValue = cityRef.current?.value;
    const countryValue = countryRef.current?.value;
    const budgetValue = budgetRef.current?.value;

    if (nameValue && emailValue && cityValue && budgetValue && countryValue) {
      setAreAllInputsFilled(true);
    } else {
      setAreAllInputsFilled(false);
    }
  }, [nameRef, emailRef, cityRef, budgetRef, countryRef]);

  const onClickAdd = useCallback(() => {
    const nameValue = nameRef.current?.value;
    const emailValue = emailRef.current?.value;
    const cityValue = cityRef.current?.value;
    const countryValue = countryRef.current?.value;
    const budgetValue = budgetRef.current?.value;

    // todo: also update the local storage list

    if (nameValue && emailValue && cityValue && budgetValue && countryValue) {
      const attendee: Attendee = {
        id: crypto.randomUUID(),
        name: nameValue as string,
        email: emailValue as string,
        departTime: new Date(),
        arriveTime: new Date(),
        homeCity: {
          cityName: cityValue as string,
          countryName: countryValue as string,
        },
        maxBudget: {
          amount: parseFloat(budgetValue as string),
          currency: "EUR",
        },
        // Add other properties as necessary
      };
      dismiss(attendee, "confirm");
    }
  }, [nameRef, emailRef, cityRef, budgetRef, countryRef]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Attendee</IonTitle>
          <IonButtons slot="end">
            <IonButton color="medium" onClick={() => dismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            ref={nameRef}
            labelPlacement="stacked"
            label="Enter attendee name"
            placeholder="Attendee name"
            type="text"
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonInput
            ref={emailRef}
            labelPlacement="stacked"
            label="Enter attendee email"
            type="email"
            placeholder="attendee@trippinglobes.lol"
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          {/* todo: refactor this to accept the city and the country separately */}
          <IonLabel position="stacked">Departing Country</IonLabel>
          <CountrySelect
            onChange={(e) => {
              console.log(e);
            }}
            placeHolder="Select departing country"
          />

          {/* <IonInput
            ref={cityRef}
            labelPlacement="stacked"
            label="Enter departing city"
            placeholder="Munich"
            onIonChange={handleInputChange}
          />
          <IonInput
            ref={countryRef}
            labelPlacement="stacked"
            label="Enter departing country"
            placeholder="Germany"
            onIonChange={handleInputChange}
          /> */}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Departing City</IonLabel>
          <CitySelect
            countryid={0}
            stateid={0}
            onChange={(e) => {
              console.log(e);
            }}
            placeHolder="Select departing city"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Departing Day</IonLabel>
          <IonDatetime presentation="date" onIonChange={(e) => console.log(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Arriving Day (Local)</IonLabel>
          <IonDatetime presentation="date" onIonChange={(e) => console.log(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonInput
            ref={budgetRef}
            labelPlacement="stacked"
            label="Enter travel budget (EUR)"
            placeholder="2000"
            type="number"
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonButton
          expand="block"
          onClick={onClickAdd}
          disabled={!areAllInputsFilled}
        >
          Add
        </IonButton>
        {/* <IonModal keepContentsMounted={true}>
          <IonDatetime id="datetime"></IonDatetime>
        </IonModal> */}
      </IonContent>
    </IonPage>
  );
};

export default AddAttendeeModal;
