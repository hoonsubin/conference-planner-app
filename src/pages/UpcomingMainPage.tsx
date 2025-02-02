import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventList from '../components/upcoming/UpcomingEvents';
import { useConferenceEventContext } from '../context/TravelDataContext';

const UpcomingMainPage: React.FC = () => {
  const { savedConferenceEvents } = useConferenceEventContext();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your events</IonTitle>
          </IonToolbar>
        </IonHeader>
          <EventList events={savedConferenceEvents}>
          </EventList>
      </IonContent>
    </IonPage>
  );
};

export default UpcomingMainPage;
