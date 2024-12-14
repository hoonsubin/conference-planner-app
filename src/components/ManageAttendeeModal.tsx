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
//import "react-country-state-city/dist/react-country-state-city.css";
import { DateTime } from "luxon";

interface ManageAttendeeModalProps {
  dismiss: (data?: Attendee | null, role?: "confirm" | "cancel") => void;
  attendeeToUpdate?: Attendee;
}

const ManageAttendeeModal: React.FC<ManageAttendeeModalProps> = ({
  dismiss,
  attendeeToUpdate,
}) => {
  const [nameInput, setName] = useState(attendeeToUpdate?.name || "");
  const [emailInput, setEmail] = useState(attendeeToUpdate?.email || "");
  const [departingCityInput, setDepartingCity] = useState(
    attendeeToUpdate?.homeCity.cityName || ""
  );
  const [departingCountryInput, setDepartingCountry] = useState(
    attendeeToUpdate?.homeCity.countryName || ""
  );
  const [budgetInput, setBudget] = useState(
    attendeeToUpdate?.maxBudget?.amount || 0
  );
  const [departingDate, setDepartingDate] = useState<DateTime>(
    attendeeToUpdate?.departTime
      ? DateTime.fromISO(attendeeToUpdate.departTime)
      : DateTime.now()
  );
  const [arrivingDate, setArrivingDate] = useState<DateTime>(
    attendeeToUpdate?.arriveTime
      ? DateTime.fromISO(attendeeToUpdate.arriveTime)
      : DateTime.now()
  );

  const canAddAttendee = useMemo(() => {
    const correctDepart =
      !!departingDate && !!arrivingDate
        ? departingDate.valueOf() > DateTime.now().valueOf() &&
          departingDate.valueOf() < arrivingDate.valueOf()
        : false;

    return (
      !!nameInput &&
      !!emailInput &&
      !!departingCityInput &&
      !!departingCountryInput &&
      !!budgetInput &&
      correctDepart
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
        id: attendeeToUpdate ? attendeeToUpdate.id : crypto.randomUUID(),
        name: nameInput as string,
        email: emailInput as string,
        departTime: departingDate ? departingDate.toISO()! : undefined, // we know that there is a value because of the above check
        arriveTime: arrivingDate ? arrivingDate.toISO()! : undefined,
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
          <IonTitle>
            {attendeeToUpdate
              ? "Editing " + attendeeToUpdate.name
              : "Add New Attendee"}
          </IonTitle>
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
            value={nameInput}
            onIonInput={(e) => setName(e.target.value as string)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label="Enter attendee email"
            type="email"
            value={emailInput}
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
            value={departingCountryInput}
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
            value={departingCityInput}
            onIonInput={(e) => setDepartingCity(e.target.value as string)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Departing Day (Optional)</IonLabel>
          <IonDatetime
            presentation="date"
            min={DateTime.now().toISO()}
            value={departingDate.toISO()}
            onIonChange={(e) =>
              setDepartingDate(DateTime.fromISO(e.target.value as string))
            }
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Arriving Day (Optional)</IonLabel>
          <IonDatetime
            presentation="date"
            min={departingDate?.toISO() || DateTime.now().toISO()}
            value={arrivingDate.toISO()}
            onIonChange={(e) =>
              setArrivingDate(DateTime.fromISO(e.target.value as string))
            }
          />
        </IonItem>
        <IonItem>
          {/* todo: add custom currency */}
          <IonInput
            labelPlacement="stacked"
            label="Enter travel budget (EUR)"
            placeholder="2000"
            type="number"
            value={budgetInput}
            onIonInput={(e) => setBudget(parseFloat(e.target.value as string))}
          />
        </IonItem>
        <IonButton
          expand="block"
          onClick={onClickAdd}
          disabled={!canAddAttendee}
        >
          {attendeeToUpdate ? "Update" : "Add"}
        </IonButton>
        {/* <IonModal keepContentsMounted={true}>
          <IonDatetime id="datetime"></IonDatetime>
        </IonModal> */}
      </IonContent>
    </IonPage>
  );
};

export default ManageAttendeeModal;
