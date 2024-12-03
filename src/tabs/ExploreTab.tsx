import { IonContent, IonHeader, IonNav, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import ExploreMainPage from '../pages/ExploreMainPage';

const ExploreTab: React.FC = () => {
  return (
    <IonNav root={() => <ExploreMainPage />}></IonNav>
  );
};

export default ExploreTab;
