import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const UpcomingMainPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upcoming</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Upcoming</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Upcoming page" />
      </IonContent>
    </IonPage>
  );
};

export default UpcomingMainPage;
