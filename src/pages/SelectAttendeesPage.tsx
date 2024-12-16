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
  IonAccordionGroup,
  IonAccordion,
} from "@ionic/react";
import { person, add } from "ionicons/icons";
import { useTravelEventContext } from "../context/TravelDataContext";
import ManageAttendeeModal from "../components/ManageAttendeeModal";
import { useState, useCallback, useMemo } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { TravelEvent, Attendee } from "../types";
import { DateTime } from "luxon";
import UserItineraryPage from "./UserItineraryPage";

interface SelectAttendeesPageProp {
  selectedEvent: TravelEvent;
}

const SelectAttendeesPage: React.FC<SelectAttendeesPageProp> = (props) => {
  const [attendeeIdToEdit, setAttendeeToEdit] = useState("");
  const [activeAttendees, setActiveAttendees] = useState<Attendee[]>([]);

  const { attendees, addAttendee, getAttendee } = useTravelEventContext();

  const [present, dismiss] = useIonModal(ManageAttendeeModal, {
    dismiss: (data: Attendee, role: "confirm" | "cancel") =>
      dismiss(data, role),
    attendeeToUpdate: getAttendee(attendeeIdToEdit),
  });

  const isAttendeeActive = useCallback(
    (attendeeId: string) => {
      return activeAttendees.some((i) => i.id === attendeeId);
    },
    [activeAttendees]
  );

  const needTravelDateInput = (attendee: Attendee) => {
    const today = DateTime.now();
    const hasTravelDate = !!attendee.arriveTime && !!attendee.departTime;

    if (!hasTravelDate) {
      return true;
    } else if (attendee.arriveTime && attendee.departTime) {
      const needNewTravelDate =
        DateTime.fromISO(attendee.arriveTime).valueOf() < today.valueOf() ||
        DateTime.fromISO(attendee.departTime).valueOf() < today.valueOf();

      return needNewTravelDate;
    } else {
      return false;
    }
  };

  const openEditAttendeeModal = (attendeeEdit: Attendee) => {
    console.log(`Editing ${attendeeEdit.name}`);

    // todo: refactor this to handle attendee editing behavior

    setAttendeeToEdit(attendeeEdit.id);
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          const editingAttendee = ev.detail.data;
          if (!editingAttendee) {
            throw new Error(
              `Could not get proper submission of new user data.`
            );
          }
          // update the existing attendee
          addAttendee(editingAttendee);
        }
      },
    });
  };

  const openAttendeeModal = useCallback(() => {
    if (attendeeIdToEdit) {
      setAttendeeToEdit("");
    }

    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          const newUser = ev.detail.data;
          if (!newUser) {
            throw new Error(
              `Could not get proper submission of new user data.`
            );
          }
          addAttendee(newUser);
        }
      },
    });
  }, [attendeeIdToEdit]);

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
              {attendees.length > 0 ? (
                attendees.map((i) => {
                  return (
                    <IonItem
                      className="people-item"
                      key={crypto.randomUUID()}
                      button
                      onClick={() => openEditAttendeeModal(i)}
                    >
                      <IonIcon slot="start" icon={person}></IonIcon>
                      <IonLabel>
                        <strong>{i.name}</strong>
                        <br />
                        <IonText>
                          {i.homeCity.cityName}, {i.homeCity.countryName}
                        </IonText>
                        {/* todo: make sure that the user provides the latest schedule for each attendees before adding them */}
                        {needTravelDateInput(i) ? (
                          <>
                            <br />
                            <IonText color="danger">
                              Travel dates are incorrect
                            </IonText>
                          </>
                        ) : (
                          <>
                            <br />
                            <IonText>
                              Departing on {DateTime.fromISO(i.departTime!).day}
                            </IonText>{" "}
                            <IonText>
                              Arrival {DateTime.fromISO(i.arriveTime!).day}
                            </IonText>
                          </>
                        )}
                      </IonLabel>

                      <IonCheckbox
                        checked={isAttendeeActive(i.id)}
                        onIonChange={(e) => {
                          e.stopPropagation();
                          onSelectAttendee(i);
                        }}
                        slot="end"
                      ></IonCheckbox>
                    </IonItem>
                  );
                })
              ) : (
                <h1>Please add an attendee</h1>
              )}
            </IonList>
          </>
        </div>
        {activeAttendees.length > 0 && (
          <IonNavLink
            routerDirection="forward"
            component={() => (
              <UserItineraryPage
                selectedEvent={props.selectedEvent}
                attendees={activeAttendees}
              />
            )}
          >
            <IonButton disabled={activeAttendees.length < 1} expand="block">
              Next
            </IonButton>
          </IonNavLink>
        )}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => openAttendeeModal()}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </>
  );
};

export default SelectAttendeesPage;
