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
import { useState, useCallback } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { TravelEvent, Attendee } from "../types";

interface SelectAttendeesPageProp {
  selectedEvent: TravelEvent;
}

const SelectAttendeesPage: React.FC<SelectAttendeesPageProp> = (props) => {
  //const [isModalOpen, setModalOpen] = useState(false);
  const [activeAttendees, setActiveAttendees] = useState<Attendee[]>([]);

  const [present, dismiss] = useIonModal(AddAttendeeModal, {
    dismiss: (data: string, role: string) => dismiss(data, role),
  });

  const { attendees, addAttendee } = useTravelEventContext();

  const isAttendeeActive = useCallback(
    (attendeeId: string) => {
      return activeAttendees.some((i) => i.id === attendeeId);
    },
    [activeAttendees]
  );

  const openAddAttendeeModal = () => {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          const newUser = ev.detail.data;
          console.log(newUser);
          if (!newUser) {
            throw new Error(
              `Could not get proper submission of new user data.`
            );
          }
          addAttendee(newUser);
        }
      },
    });
  };

  const onSelectAttendee = useCallback(
    (selectedAttendee: Attendee) => {
      if (isAttendeeActive(selectedAttendee.id)) {
        // remove the attendee from the list if its already active
        setActiveAttendees(
          activeAttendees.filter((i) => i.id !== selectedAttendee.id)
        );
      } else {
        setActiveAttendees([...activeAttendees, selectedAttendee]);
      }
    },
    [activeAttendees]
  );

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
              <IonListHeader>People</IonListHeader>
              {attendees.length > 0
                ? attendees.map((i) => {
                    return (
                      <IonItem key={crypto.randomUUID()} button>
                        <IonIcon slot="start" icon={person}></IonIcon>
                        <IonLabel>
                          <strong>{i.name}</strong>
                          <br />
                          <IonText>
                            {i.homeCity.cityName}, {i.homeCity.countryName}
                          </IonText>

                          {!i.arriveTime ||
                            (!i.departTime ? (
                              <>
                                <br />
                                <IonText color="danger">
                                  Please add a date
                                </IonText>
                              </>
                            ) : (
                              <></>
                            ))}
                        </IonLabel>

                        <IonCheckbox
                          checked={isAttendeeActive(i.id)}
                          onIonChange={() => onSelectAttendee(i)}
                          slot="end"
                        ></IonCheckbox>
                      </IonItem>
                    );
                  })
                : testAttendees.map((i) => {
                    return (
                      <IonItem key={crypto.randomUUID()}>
                        <IonIcon slot="start" icon={person}></IonIcon>
                        <IonLabel>
                          <strong>{i.name}</strong>
                          <br />
                          <IonText>
                            {i.homeCity.cityName}, {i.homeCity.countryName}
                          </IonText>

                          {!i.arriveTime ||
                            (!i.departTime && (
                              <>
                                <br />
                                <IonText color="danger">
                                  Please add a date
                                </IonText>
                              </>
                            ))}
                        </IonLabel>

                        <IonCheckbox
                          checked={isAttendeeActive(i.id)}
                          onIonChange={() => onSelectAttendee(i)}
                          slot="end"
                        ></IonCheckbox>
                      </IonItem>
                    );
                  })}
            </IonList>
          </>
        </div>
        <IonButton disabled={activeAttendees.length < 1} expand="block">
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
