import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventList from '../components/upcoming/UpcomingEvents';
import { useTravelEventContext } from '../context/TravelDataContext';

const UpcomingMainPage: React.FC = () => {
  const { travelEvents } = useTravelEventContext();
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
          <EventList events={travelEvents}>
          </EventList>
      </IonContent>
    </IonPage>
  );
};

export default UpcomingMainPage;
