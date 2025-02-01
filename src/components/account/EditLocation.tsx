import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonText,
    IonInput,
    IonBackButton,
    IonButtons,
  } from "@ionic/react";
import { supportedEventLocations, supportedEventTypes } from "../../config";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { Attendee } from "../../types";
import { useTravelEventContext } from "../../context/TravelDataContext";

interface EditLocationProps {
    
}

const EditLocation: React.FC<EditLocationProps> = ({ }) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { attendee: Attendee};
    const [attendee, setAttendee] = useState<Attendee>(data?.attendee ?? "");
    const { attendees, addAttendee, getAttendee } = useTravelEventContext();
    function saveAttendee() {
        console.log(attendee);
        addAttendee(attendee);
    }
    
return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Change location</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
            data ?
            <IonContent className="ion-padding">
            <h2>Edit your location</h2>
            <br></br>
            <IonInput 
                label="City"
                labelPlacement="floating"
                clearInput={true}
                placeholder="Enter your city"
                value={attendee?.homeCity?.cityName}
                onIonInput={(e: any) => setAttendee({ ...attendee, homeCity: { cityName: e.target.value, countryName: attendee.homeCity.countryName } })}
                fill="outline"
                className="ion-padding-top">
            </IonInput>
            <IonInput 
                label="Country"
                labelPlacement="floating"
                clearInput={true}
                placeholder="Enter your country"
                value={attendee?.homeCity?.countryName}
                onIonInput={(e: any) => setAttendee({ ...attendee, homeCity: { cityName: attendee.homeCity.cityName, countryName: e.target.value } })}
                fill="outline"
                className="ion-padding-top">
            </IonInput>
            <br></br>
            <IonButton
                onClick={
                    () => {
                        saveAttendee();
                        history.goBack();
                    }
                }
                expand="block"
                className="ion-padding-top">
                Save
            </IonButton>
          </IonContent>
            :
            <IonContent class="ion-padding ion-text-center">
                <IonText class="ion-text-center">No type and data specified</IonText>
            </IonContent>
        }
    </IonPage>
);
};

export default EditLocation;