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
  IonFab,
  IonFabButton,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { testAttendees } from "../data";
import { person, add } from "ionicons/icons";
import { useTravelEventContext } from "../context/TravelDataContext";
import AddAttendeeModal from "../components/AddAttendeeModal";
import { useState } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { TravelEvent } from "../types";

interface SelectAttendeesPageProp {
  selectedEvent: TravelEvent;
}

const SelectAttendeesPage: React.FC<SelectAttendeesPageProp> = (props) => {
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
          <IonText>Who's attending the {props.selectedEvent.name}?</IonText>
          <>
            <IonList>
              <IonListHeader>
              People
              </IonListHeader>
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
            </IonList>
          </>
        </div>
        <IonButton expand="block">
              Next
        </IonButton>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => openAddAttendeeModal()}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        {/* <IonNavLink routerDirection="forward" component={() => <PageThree />}>
          <IonButton fill="outline">Next</IonButton>
        </IonNavLink> */}
      </IonContent>
    </>
  );
};

export default SelectAttendeesPage;
