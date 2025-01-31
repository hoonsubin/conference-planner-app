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
  } from "@ionic/react";
import { supportedEventLocations, supportedEventTypes } from "../data";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

interface LocationSearchProps {
    
}

const LocationSearch: React.FC<LocationSearchProps> = ({  }) => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: string };
    const [locations] = useState(supportedEventLocations);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredLocations = locations.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );
return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Location</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
            data ?
            <IonContent class="ion-padding" fullscreen>
                <h1>Specify the location</h1>
                <IonSearchbar animated={true} placeholder="Where are you looking?" style={{ '--height': '120px' }} 
                value={searchQuery}
                onIonInput={
                    (e) => {
                        setSearchQuery(e.detail.value!)
                    }
                }
                onIonChange={
                    (e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/explore/events`, 
                            state: { event: data.event, location: searchQuery}
                        });
                    }
                }></IonSearchbar>
                {/* <IonInput label="Where do you want to search?" labelPlacement="floating" fill="outline" placeholder="e.g. Europe"></IonInput> */}
                <br></br>
                <IonList>
                    {filteredLocations.map((category) => (
                        <IonItem key={category} lines="none">
                            <IonButton onClick={
                                () => {
                                    history.push({
                                        pathname: `/explore/events`, 
                                        state: { event: data.event, location: category}
                                    });
                                }
                            }>{category}</IonButton>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
            :
            <IonContent class="ion-padding ion-text-center">
                <IonText class="ion-text-center">No event type specified</IonText>
            </IonContent>
        }
    </IonPage>
);
};

export default LocationSearch;