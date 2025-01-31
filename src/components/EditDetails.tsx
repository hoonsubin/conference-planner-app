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
import { supportedEventLocations, supportedEventTypes } from "../data";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

interface EditDetailsProps {
    
}

const EditDetails: React.FC<EditDetailsProps> = ({ }) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { type: string, value: string };
    
return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>{data?.type}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
            data ?
            <IonContent className="ion-padding">
            <h2>{data.type}</h2>
            <br></br>
            <IonInput 
                label={data.type}
                labelPlacement="floating"
                clearInput={true}
                placeholder={data.type}
                value={data.value}
                fill="outline"
                className="ion-padding-top">
            </IonInput>
            <br></br>
            <IonButton
                onClick={
                    () => {
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

export default EditDetails;