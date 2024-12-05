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
  IonInput,
  useIonModal,
} from "@ionic/react";
import { testAttendees } from "../data";
import { person } from "ionicons/icons";
import { useTravelEventContext } from "../context/TravelDataContext";
import AddAttendeeModal from "../components/AddAttendeeModal";
import { useState } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

const SelectAttendeesPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [present, dismiss] = useIonModal(AddAttendeeModal, {
    dismiss: (data: string, role: string) => dismiss(data, role),
  });

  const { attendees } = useTravelEventContext();

  const openAddAttendeeModal = () => {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          console.log(ev.detail);
        }
      },
    });
  };

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
        <IonButton onClick={() => openAddAttendeeModal()}>
          Add new attendee
        </IonButton>

        {/* <IonNavLink routerDirection="forward" component={() => <PageThree />}>
          <IonButton fill="outline">Next</IonButton>
        </IonNavLink> */}
      </IonContent>
    </>
  );
};

export default SelectAttendeesPage;
