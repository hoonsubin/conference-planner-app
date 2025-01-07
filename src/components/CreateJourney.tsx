import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonButton,
    IonText,
    IonSearchbar,
    IonInput,
    IonImg,
    IonBackButton,
    IonButtons,
    IonCheckbox,
    IonNote,
    IonLabel,
    IonModal,
    IonFooter,
  } from "@ionic/react";
import { supportedEventLocations, supportedEventTypes } from "../data";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TravelEvent, Attendee } from "../types";

interface CreateJourneyProps {
    
}

const CreateJourney: React.FC<CreateJourneyProps> = ({ }) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: TravelEvent };
    const event = data.event;
    const attendees: Attendee[] = 
    [
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            homeCity:  { cityName: "New York", countryName: "USA" },
            departTime: "2023-10-01T08:00:00Z",
            arriveTime: "2023-10-01T12:00:00Z",
            maxBudget: { amount: 500, currency: "USD" }
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            homeCity:  { cityName: "Los Angeles", countryName: "USA" },
            departTime: "2023-10-02T09:00:00Z",
            arriveTime: "2023-10-02T13:00:00Z",
            maxBudget: { amount: 600, currency: "USD" }
        },
        {
            id: "3",
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            homeCity:  { cityName: "Chicago", countryName: "USA" },
            departTime: "2023-10-03T10:00:00Z",
            arriveTime: "2023-10-03T14:00:00Z",
            maxBudget: { amount: 700, currency: "USD" }
        }
    ]
    const [locations] = useState(supportedEventLocations);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredLocations = locations.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setPresentingElement(page.current);
    }, []);
    function dismiss() {
        modal.current?.dismiss();
    }
    const newAttendee: Attendee = {
        id: attendees.length + 1 + "",
        name: "",
        email: "",
        homeCity: { cityName: "", countryName: "" },
        departTime: "",
        arriveTime: "",
        maxBudget: { amount: 0, currency: "" }
    } as Attendee;

return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>{event.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding" fullscreen>
            <h1>People</h1>
            <p>Who are you going with?</p>
            <IonList>
                {attendees.map((attendee, index) => (
                    <IonItem key={attendee.id} className="item item-text-wrap">
                        <IonCheckbox slot="end" aria-label="Toggle attendence"></IonCheckbox>
                        <IonLabel>
                            <strong>{attendee.name}</strong>
                            <IonText></IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                {attendee.homeCity.cityName}, {attendee.homeCity.countryName}
                            </IonNote>
                        </IonLabel>
                  </IonItem>
                ))}
            </IonList>
            <br></br>
            <IonButton id="open-modal" expand="block">
                Add attendee
            </IonButton>
            {/* Modal */}
                    <IonModal ref={modal} trigger="open-modal" canDismiss={true} presentingElement={presentingElement!} initialBreakpoint={0.75} breakpoints={[0.5, 0.75, 0.9]} backdropDismiss={true}>
                      <IonContent className="ion-padding">
                        <h2>Add attendee</h2>
                        <br></br>
                        <h3>Personal information</h3>
                        <IonInput 
                            label="Name"
                            labelPlacement="floating"
                            clearInput={true}
                            placeholder="Attendee name"
                            value={newAttendee.name}
                            fill="outline"
                            className="ion-padding-top">
                        </IonInput>
                        <br></br>
                        <IonInput 
                            label="Email"
                            labelPlacement="floating"
                            clearInput={true}
                            placeholder="Attendee email"
                            value={newAttendee.email}
                            fill="outline"
                            className="ion-padding-top">
                        </IonInput>
                        <br></br>
                        <IonInput 
                            label="Location"
                            labelPlacement="floating"
                            clearInput={true}
                            placeholder="Attendee location"
                            value={newAttendee.homeCity.cityName}
                            fill="outline"
                            className="ion-padding-top">
                        </IonInput>
                        <br></br>
                        <IonButton
                            onClick={dismiss} 
                            expand="block" 
                            className="ion-padding-top">
                            Add attendee
                        </IonButton>
                      </IonContent>
                    </IonModal>
        </IonContent>
        <IonFooter>
            <IonButton className="ion-float-right ion-padding" onClick={
                () => {
                    history.push({
                        pathname: `/explore/journey/${event.id}/budget`, 
                        state: { event: event, attendees: attendees,}
                    });
                }
            } fill="outline">
                Next
            </IonButton>
        </IonFooter>
    </IonPage>
);
};

export default CreateJourney;