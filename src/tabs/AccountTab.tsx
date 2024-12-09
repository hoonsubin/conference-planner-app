import { IonContent, IonHeader, IonNav, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import AccountMainPage from '../pages/AccountMainPage';

const AccountTab: React.FC = () => {
  return (
    <IonNav root={() => <AccountMainPage />}></IonNav>
  );
};

export default AccountTab;
