import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventList from '../components/UpcomingEvents';
import { useTravelEventContext } from '../context/TravelDataContext';
import { TravelEvent } from "../types";
import EventDetail from '../components/EventDetail';
import { DateTime } from 'luxon';
import EventSearch from '../components/EventSearch';

const UpcomingMainPage: React.FC = () => {
  const { travelEvents } = useTravelEventContext();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your upcoming events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your upcoming events</IonTitle>
          </IonToolbar>
        </IonHeader>
          <EventList events={travelEvents}>
          </EventList>
        {/* <EventList events={[{
            id: "1",
            name: "Event 1",
            venueAddr: "123 Main St",
            eventLink: "http://example.com",
            description: "This is a test event",
            eventStart: "TBD",
            eventEnd: "TBD",
          },
          {
            id: "2",
            name: "Event 2",
            venueAddr: "456 Main St",
            eventLink: "http://example.com",
            description: "This is another test event",
            eventStart: "TBD",
            eventEnd: "TBD",
          }]}>
          </EventList> */}
          {/* <EventSearch></EventSearch> */}
      </IonContent>
    </IonPage>
  );
};

export default UpcomingMainPage;
