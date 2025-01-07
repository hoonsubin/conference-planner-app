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
  } from "@ionic/react";
import { supportedEventTypes } from "../data";
import { useHistory } from "react-router-dom";
import { useState } from "react";


interface EventSearchProps {
    
}

const EventSearch: React.FC<EventSearchProps> = ({  }) => {
    const history = useHistory();
    const [categories] = useState(supportedEventTypes);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredCategories = categories.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );
return (
    <IonContent class="ion-padding">
        <IonImg src="../../resources/search.png" style={{height: "30%"}}/>  
        <IonSearchbar animated={true} placeholder="What are you looking for?"
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
                    pathname: `/explore/location`, 
                    state: { event: searchQuery}
                });
            }
        }></IonSearchbar>
        {/* <IonInput label="What are you searching for?" labelPlacement="floating" fill="outline" placeholder="e.g. Paris Blockchain Week" ></IonInput> */}
        <br></br>
        <IonList>
            {filteredCategories.map((category) => (
                <IonItem key={category} lines="none">
                    <IonButton onClick={
                        (e) => {
                            e.preventDefault();
                            history.push({
                                pathname: `/explore/location`, 
                                state: { event: category}
                            });
                        }
                    }>{category}</IonButton>
                </IonItem>
            ))}
        </IonList>
    </IonContent>
);
};

export default EventSearch;