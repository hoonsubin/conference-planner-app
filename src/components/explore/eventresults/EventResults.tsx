import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonLoading,
  useIonViewDidEnter,
  IonBackButton,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { ConferenceEvent } from "../../../types";
import { useLlmApiContext } from "../../../context/LlmApiContext";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../../lottie/loading-colorful.json";
import CustomPopup from "../../general/custompopup/CustomPopup";
import EventCard from "../../eventcard/EventCard";

interface FetchEventsParams {
  event: string;
  location: string;
}

const EventResults: React.FC = () => {
  const history = useHistory();
  const loc = useLocation();
  const { fetchConferenceEventApi } = useLlmApiContext();
  const data = loc.state as { event: string; location: string };
  const [events, setEvents] = useState<ConferenceEvent[]>([]);

  useEffect(() => {
    fetchConferenceEventApi(data.event, {
      country: data.location,
      city: data.location,
      fullAddr: data.location,
    }).then((res) => {
      setEvents(res);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Results</IonTitle>
        </IonToolbar>
        {/* <h2 className="ion-padding-start">{eventStr} in {locationStr}:</h2> */}
      </IonHeader>
      {data ? (
        events.length === 0 ? (
          // loading spinnner
          <CustomPopup
            isOpen={events.length === 0}
            onClose={() => {}}
            title="Hold tight"
            message="We are fetching the latest events for you"
          >
            <Lottie
              speed={2.5}
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            />
          </CustomPopup>
        ) : (
          <IonContent
            style={{
              background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
            }}
          >
            <IonList>
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() =>
                    history.push({
                      pathname: `/explore/event-detail`,
                      state: { event: event, isSaved: false },
                    })
                  }
                />
              ))}
            </IonList>
          </IonContent>
        )
      ) : (
        <IonContent class="ion-padding ion-text-center">
          <IonText class="ion-text-center">No event type specified</IonText>
        </IonContent>
      )}
    </IonPage>
  );
};

export default EventResults;
