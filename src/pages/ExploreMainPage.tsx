import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import EventSearch from "../components/explore/eventsearch/EventSearch";
import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";

const ExploreMainPage: React.FC = () => {

  useEffect(() => {
    StatusBar.setBackgroundColor({ color: '#ffffff' });
  }, []);

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
