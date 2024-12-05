import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNavLink,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { testAttendees } from "../data";
import { person } from "ionicons/icons";
import { useTravelEventContext } from "../context/TravelDataContext";

const SelectAttendees: React.FC = () => {
  const { attendees } = useTravelEventContext();

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Add Attendees</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h1>Add Attendees</h1>
        <div>
          <h3>People</h3>
          <IonText>Add who's coming</IonText>
          <>
            {testAttendees.map((i) => {
              return (
                <IonItem key={crypto.randomUUID()}>
                  <IonIcon slot="start" icon={person}></IonIcon>
                  <IonLabel>
                    <strong>{i.name}</strong>
                    <br />
                    <IonText>
                      {i.homeCity.cityName}, {i.homeCity.countryName}
                    </IonText>
                  </IonLabel>

                  <IonCheckbox slot="end"></IonCheckbox>
                </IonItem>
              );
            })}
          </>
        </div>
        {/* <IonNavLink routerDirection="forward" component={() => <PageThree />}>
          <IonButton fill="outline">Next</IonButton>
        </IonNavLink> */}
      </IonContent>
    </>
  );
};

export default SelectAttendees;
