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
import { useRef, useState, useCallback, useMemo } from "react";
import { Attendee } from "../types";
import { CountrySelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

type CloseRole = "confirm" | "cancel";

const AddAttendeeModal: React.FC<{
  dismiss: (data?: any | null, role?: CloseRole) => void;
}> = ({ dismiss }) => {
  const [nameInput, setName] = useState("");
  const [emailInput, setEmail] = useState("");
  const [departingCityInput, setDepartingCity] = useState("");
  const [departingCountryInput, setDepartingCountry] = useState("");
  const [budgetInput, setBudget] = useState(0);
  const [departingDate, setDepartingDate] = useState<Date>();
  const [arrivingDate, setArrivingDate] = useState<Date>();

  const canAddAttendee = useMemo(() => {
    console.log({
      nameInput,
      emailInput,
      departingCityInput,
      departingCountryInput,
      budgetInput,
      departingDate,
      arrivingDate,
    });
    // todo: ensure that the departing date is not later than the arrival date

    return (
      !!nameInput &&
      !!emailInput &&
      !!departingCityInput &&
      !!departingCountryInput &&
      !!budgetInput &&
      !!departingDate &&
      !!arrivingDate
    );
  }, [
    nameInput,
    emailInput,
    departingCityInput,
    departingCountryInput,
    budgetInput,
    departingDate,
    arrivingDate,
  ]);

  const onClickAdd = useCallback(() => {
    // todo: also update the local storage list

    if (canAddAttendee) {
      const attendee: Attendee = {
        id: crypto.randomUUID(),
        name: nameInput as string,
        email: emailInput as string,
        departTime: departingDate!, // we know that there is a value because of the above check
        arriveTime: arrivingDate!,
        homeCity: {
          cityName: departingCityInput as string,
          countryName: departingCountryInput as string,
        },
        maxBudget: {
          amount: budgetInput,
          currency: "EUR", // placeholder
        },
        // Add other properties as necessary
      };
      dismiss(attendee, "confirm");
    }
  }, [
    canAddAttendee,
    nameInput,
    emailInput,
    departingCityInput,
    departingCountryInput,
    budgetInput,
    departingDate,
    arrivingDate,
  ]);

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
            labelPlacement="stacked"
            label="Enter attendee name"
            placeholder="Attendee name"
            type="text"
            onIonInput={(e) => setName(e.target.value as string)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label="Enter attendee email"
            type="email"
            placeholder="attendee@trippinglobes.lol"
            onIonInput={(e) => setEmail(e.target.value as string)}
          />
        </IonItem>
        <IonItem>
          {/* todo: refactor this to accept the city and the country separately */}
          {/* <IonLabel position="stacked">Departing Country</IonLabel>
          <CountrySelect
            onChange={(e) => {
              console.log(e);
              setDepartingCountry(e.toString());
            }}
            placeHolder="Select departing country"
          /> */}

          <IonInput
            labelPlacement="stacked"
            label="Departing Country"
            type="text"
            placeholder="Germany"
            onIonInput={(e) => setDepartingCountry(e.target.value as string)}
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
          {/* <IonLabel position="stacked">Departing City</IonLabel>
          <CitySelect
            countryid={0}
            stateid={0}
            onChange={(e) => {
              console.log(e);
              setDepartingCity(e.toString());
            }}
            placeHolder="Select departing city"
          /> */}

          <IonInput
            labelPlacement="stacked"
            label="Departing City"
            type="text"
            placeholder="Munich"
            onIonInput={(e) => setDepartingCity(e.target.value as string)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Departing Day</IonLabel>
          <IonDatetime
            presentation="date"
            onIonChange={(e) =>
              setDepartingDate(new Date(e.target.value as string))
            }
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Arriving Day (Local)</IonLabel>
          <IonDatetime
            presentation="date"
            onIonChange={(e) =>
              setArrivingDate(new Date(e.target.value as string))
            }
          />
        </IonItem>
        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label="Enter travel budget (EUR)"
            placeholder="2000"
            type="number"
            onIonInput={(e) => setBudget(parseFloat(e.target.value as string))}
          />
        </IonItem>
        <IonButton
          expand="block"
          onClick={onClickAdd}
          disabled={!canAddAttendee}
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
