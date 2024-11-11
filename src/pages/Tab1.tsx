import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonLoading,
} from "@ionic/react";
import { AxiosInstance, AxiosResponse } from "axios";
import ExploreContainer from "../components/ExploreContainer";
import { useEffect, useState } from "react";
import {
  appConfig,
  getEventListPrompt,
  systemPrompt,
  FetchedEventListType,
} from "../data";
import * as utils from "../utils";
import { PerplexityApiRes, PerplexityApiReq, TravelEvent } from "../types";
import "./Tab1.css";

const newReq: PerplexityApiReq = {
  model: "llama-3.1-sonar-small-128k-online",
  messages: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: getEventListPrompt(
        ["food"],
        "USA",
        new Date()
      ),
    },
  ],
  temperature: 0.2
};

const Tab1: React.FC = () => {
  const [eventList, setEventList] = useState<TravelEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickFetchEvents = () => {
    setIsLoading(true);
    const api = utils.perplexityApiInst(appConfig.perplexityApi);

    const fetchTrips = async () => {
      try {
        const res: AxiosResponse<PerplexityApiRes> = await api.post(
          "/chat/completions",
          newReq
        );
        return res.data;
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrips()
      .then((res) => {
        const resData = res?.choices[0].message.content
          .replaceAll("```", "")
          .replaceAll("json", "")
          .replaceAll("\n", "");
        if (resData) {
          const eventObj = JSON.parse(resData) as FetchedEventListType[];
          console.log(resData);
          console.log(eventObj);
          setEventList(
            eventObj.map((i) => {
              return {
                id: "my-id",
                name: i.name,
                description: i.description,
                eventStart: new Date(i.startDate),
                eventEnd: new Date(i.endDate),
                venueAddr: i.venueLocation,
                eventLink: i.eventLink,
              };
            })
          );
        } else {
          console.log([]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <IonLoading message="Fetching data..." spinner="circles" isOpen={isLoading} />
          <IonButton onClick={onClickFetchEvents}>Fetch events</IonButton>
          {eventList.length > 0 ? (
            <IonList>
              {eventList.map((i) => {
                return (
                  <IonItem key={i.description}>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>{i.name}</IonCardTitle>
                        <IonCardSubtitle>
                          Starts from {i.eventStart.toString()} at {i.venueAddr}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>
                        {i.description}
                        <br />
                        For more information, visit <a>{i.eventLink}</a>
                      </IonCardContent>
                    </IonCard>
                  </IonItem>
                );
              })}
            </IonList>
          ) : (
            <IonText>No Events</IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
