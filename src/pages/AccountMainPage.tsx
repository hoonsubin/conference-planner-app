import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Account from '../components/Account';

const AccountMainPage: React.FC = () => {
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
        <Account 
        adminAttendee={
            {
                id: "1",
                name: "John Doe",
                email: "john.doe@company.com",
                homeCity: { cityName: "New York", countryName: "USA" },
            }}
        attendees=
            {[
                {
                    id: "2",
                    name: "Jane Doe",
                    email: "",
                    homeCity: { cityName: "Los Angeles", countryName: "USA" },
                },
                {
                    id: "3",
                    name: "Jim Doe",
                    email: "",
                    homeCity: { cityName: "Chicago", countryName: "USA" },
                },
            ]}
        ></Account>
      </IonContent>
    </IonPage>
  );
};

export default AccountMainPage;
