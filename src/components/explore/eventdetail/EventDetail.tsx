import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardContent,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonAlert,
} from "@ionic/react";
import { Attendee, ConferenceEvent } from "../../../types";
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  useParams,
} from "react-router";
import {
  calendarOutline,
  heart,
  heartOutline,
  locationOutline,
  openOutline,
  timeOutline,
} from "ionicons/icons";
import "./EventDetail.css";
import dayjs from "dayjs";
import { appConfig } from "../../../config";
import { useEffect, useState } from "react";
import { Browser } from "@capacitor/browser";
import { useConferenceEventContext } from "../../../context/TravelDataContext";

interface EventDetailProps extends RouteComponentProps<{ id: string }> {}

const EventDetail: React.FC<EventDetailProps> = () => {
  const history = useHistory();
  const loc = useLocation();
  const { eventId } = useParams<{ eventId: string }>();
  // Location state may provide the event; if not, we load it via getConferenceEvent
  const data = loc.state as
    | { event: ConferenceEvent; isSaved: boolean }
    | undefined;
  const {
    saveConferenceEvent,
    removeConferenceEvent,
    allAttendeeItinerary,
    getAttendee,
    getConferenceEvent,
  } = useConferenceEventContext();

  const [event, setEvent] = useState<ConferenceEvent | undefined>();
  const [isSaved, setIsSaved] = useState(data ? data.isSaved : true);
  const [imageSize, setImageSize] = useState(
    window.innerWidth < 768
      ? Math.round(window.innerWidth * 0.25).toString()
      : Math.round(window.innerHeight * 0.15).toString()
  );
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  // Load the event either from location state or by eventId.
  function getEventById() {
    if (data && data.event) {
      setEvent(data.event);
    } else if (eventId) {
      const ev = getConferenceEvent(eventId);
      if (!ev) {
        throw new Error("Event not found");
      }
      setEvent(ev);
    } else {
      console.log("Event ID is undefined");
    }
  }

  // Get all saved itineraries for the current event as an array of attendee IDs.
  function getAttendeeIds() {
    console.log("allAttendeeItinerary", allAttendeeItinerary);
    return event
      ? allAttendeeItinerary.filter(
          (itinerary) => itinerary.eventId === event.id
        )
      : [];
  }

  // Map the saved itineraries to attendees using getAttendee.
  function getAttendees() {
    return getAttendeeIds()
      .map((itinerary) => getAttendee(itinerary.attendeeId))
      .filter((attendee): attendee is Attendee => attendee !== null);
  }

  // Check if any saved itinerary exists for this event.
  function checkIfJourneyExists() {
    return event
      ? allAttendeeItinerary.some((itinerary) => itinerary.eventId === event.id)
      : false;
  }

  // Toggle save status for the event.
  function handleEventSave() {
    if (!event) return;
    if (isSaved) {
      removeConferenceEvent(event.id);
    } else {
      saveConferenceEvent(event);
    }
    setIsSaved(!isSaved);
  }

  async function openMaps(address: string) {
    const url = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    await Browser.open({ url });
  }

  function openNativeMaps(address: string) {
    const url = `geo:0,0?q=${encodeURIComponent(address)}`;
    window.open(url, "_system");
  }

  useEffect(() => {
    getEventById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  useEffect(() => {
    if (event) {
      const attList = getAttendees();
      setAttendees(attList);
      console.log("Saved itineraries found for attendees:", attList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, allAttendeeItinerary]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{event ? event.name : "Event Detail"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {event ? (
        <IonContent className="ion-padding detail-content">
          <IonCard className="event-detail-card">
            <IonCardContent className="flex-space-card ion-padding">
              <h1 className="gradient-headline">{event.name}</h1>
              <IonIcon
                icon={isSaved ? heart : heartOutline}
                size="large"
                style={{
                  marginRight: "8px",
                  color: isSaved ? "red" : "var(--ion-color-primary-contrast)",
                }}
                onClick={() => handleEventSave()}
              />
            </IonCardContent>
          </IonCard>
          <IonCard className="event-detail-card">
            <IonCardContent
              className="ion-padding"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  rowGap: "10px",
                  alignItems: "center",
                }}
              >
                <IonIcon
                  icon={calendarOutline}
                  size="large"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                />
                <div>
                  <span style={{ fontWeight: "bold" }}>Date</span>
                  <br />
                  <span>
                    {event.eventStartDate
                      ? dayjs(event.eventStartDate.toLocaleString()).format(
                          "MMMM D, YYYY"
                        )
                      : "no date available"}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  rowGap: "10px",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <IonIcon
                  icon={timeOutline}
                  size="large"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                />
                <div>
                  <span style={{ fontWeight: "bold" }}>Time</span>
                  <br />
                  <span>
                    {event.eventStartDate
                      ? dayjs(event.eventStartDate.toLocaleString()).format(
                          "h:mm A"
                        )
                      : "no time available"}
                  </span>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
          <IonCard className="event-detail-card">
            <IonCardContent
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  rowGap: "10px",
                  alignItems: "center",
                }}
              >
                <IonIcon
                  icon={locationOutline}
                  size="large"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                />
                <div>
                  <h4 style={{ fontWeight: "bold" }}>Location</h4>
                  <h4>{event.venueAddress?.fullAddr}</h4>
                </div>
              </div>
              {appConfig.mapsApi !== "" && (
                <img
                  style={{ borderRadius: "10px", marginLeft: "16px" }}
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
                    event.venueAddress?.fullAddr || ""
                  )}&zoom=13&size=${imageSize}x${imageSize}&maptype=roadmap&markers=color:red|${encodeURIComponent(
                    event.venueAddress?.fullAddr || ""
                  )}&key=${appConfig.mapsApi}`}
                  alt="Map view of event location"
                  onClick={() => openMaps(event.venueAddress?.fullAddr || "")}
                />
              )}
            </IonCardContent>
          </IonCard>
          <IonCard className="event-detail-card">
            <IonCardContent>
              <div className="ion-padding">
                <h3 style={{ fontWeight: "bold" }}>About the event</h3>
                <br />
                <p>{event.eventDescription}</p>
              </div>
            </IonCardContent>
          </IonCard>
          <IonCard className="event-detail-card">
            <IonCardContent className="flex-space-card">
              <div className="ion-padding">
                <h3>Link to event</h3>
              </div>
              <IonIcon
                icon={openOutline}
                size="large"
                style={{ marginRight: "8px" }}
                onClick={() => Browser.open({ url: event.eventUrl })}
              />
            </IonCardContent>
          </IonCard>
          {/* Display attendees that have saved itineraries */}
          {checkIfJourneyExists() ? (
            <>
              <IonHeader className="ion-padding ion-padding-top">
                <h3>Your journeys</h3>
                <h4>Attendees with saved itineraries</h4>
              </IonHeader>
              <IonList>
                {attendees.length > 0 &&
                  attendees
                    .sort((a, b) => a.id.localeCompare(b.id))
                    .map((attendee) => (
                      <IonItem
                        key={attendee.id}
                        button
                        onClick={() => {
                          history.push({
                            pathname: `/upcoming/event/${event.id}/attendee/${attendee.id}`,
                          });
                        }}
                      >
                        <IonLabel>
                          {attendee.name}{" "}
                          {attendee.id === "0" && (
                            <IonChip color="primary">You</IonChip>
                          )}
                        </IonLabel>
                        <IonNote slot="end">
                          {attendee.departLocation?.city},{" "}
                          {attendee.departLocation?.country}
                        </IonNote>
                      </IonItem>
                    ))}
              </IonList>
            </>
          ) : (
            <IonButton
              expand="block"
              onClick={() => {
                history.push({
                  pathname: `/explore/journey`,
                  state: { event },
                });
              }}
            >
              Create journey
            </IonButton>
          )}
        </IonContent>
      ) : (
        <IonContent className="ion-padding ion-text-center">
          <IonText>No event specified</IonText>
        </IonContent>
      )}
    </IonPage>
  );
};

export default EventDetail;
