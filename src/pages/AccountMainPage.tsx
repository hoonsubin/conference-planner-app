import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Account from '../components/account/Account';
import { useRef } from 'react';

const AccountMainPage: React.FC = () => {
  const pg = useRef(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Account pg={pg}/>
      </IonContent>
    </IonPage>
  );
};

export default AccountMainPage;
