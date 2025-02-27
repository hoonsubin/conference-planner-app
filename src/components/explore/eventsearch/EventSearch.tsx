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
import { supportedEventTypes } from "../../../config";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./EventSearch.css";

interface EventSearchProps {}

const EventSearch: React.FC<EventSearchProps> = ({}) => {
  const history = useHistory();
  const [categories] = useState(supportedEventTypes);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCategories = categories
    .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
    .splice(0, 10);

  return (
    <IonContent class="ion-padding">
      {/* <IonImg src="../../resources/search.png" style={{height: "30%"}}/> */}
      {/* <Lottie
            // speed={0.5}
            height={window.innerHeight*0.25}
            width={window.innerHeight*0.25}
            options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            }}/> */}
      <IonImg src="assets/Logo.png" style={{ height: "30%" }} />
      <br></br>
      <IonSearchbar
        animated={true}
        placeholder="What are you looking for?"
        value={searchQuery}
        onIonInput={(e: any) => {
          setSearchQuery(e.detail.value!);
        }}
        onIonChange={(e: any) => {
          e.preventDefault();
          history.push({
            pathname: `/explore/location`,
            state: { event: searchQuery },
          });
        }}
      ></IonSearchbar>
      {/* <IonInput label="What are you searching for?" labelPlacement="floating" fill="outline" placeholder="e.g. Paris Blockchain Week" ></IonInput> */}
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "0px",
          flexWrap: "wrap",
          rowGap: "2px",
        }}
      >
        {filteredCategories.map((category) => (
          <IonItem key={category} lines="none">
            <IonButton
              onClick={(e) => {
                e.preventDefault();
                history.push({
                  pathname: `/explore/location`,
                  state: { event: category },
                });
              }}
            >
              {category}
            </IonButton>
          </IonItem>
        ))}
      </div>
    </IonContent>
  );
};

export default EventSearch;
