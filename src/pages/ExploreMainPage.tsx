import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import EventSearch from "../components/explore/eventsearch/EventSearch";

const ExploreMainPage: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
              <IonTitle>Search Events</IonTitle>
          </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Search events</IonTitle>
          </IonToolbar>
        </IonHeader>
        <EventSearch>
        </EventSearch>
      </IonContent>
    </IonPage>
  );
};

export default ExploreMainPage;
