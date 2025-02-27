import { IonContent, IonHeader, IonNav, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import UpcomingMainPage from '../pages/UpcomingMainPage';

const UpcomingTab: React.FC = () => {
  return (
    <IonNav root={() => <UpcomingMainPage />}></IonNav>
  );
};

export default UpcomingTab;
