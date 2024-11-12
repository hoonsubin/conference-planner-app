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
  IonSelect,
  IonSelectOption,
  IonInput,
} from "@ionic/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import * as utils from "../utils";
import { TravelEvent } from "../types";
import {
  appConfig,
  supportedEventTypes,
  supportedEventLocations,
} from "../data";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [eventList, setEventList] = useState<TravelEvent[]>([]);
  const [selectedEventTypes, setEventTypes] = useState("");
  const [selectedHostLoc, setHostLoc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [useCustomTag, setCustomTag] = useState("");
  const [useCustomHostLoc, setCustomHostLoc] = useState("");

  const isUsingCustomTag = useMemo(() => {
    // the last element in the list is always assumed to be a custom entry
    return (
      selectedEventTypes === supportedEventTypes[supportedEventTypes.length - 1]
    );
  }, [selectedEventTypes]);

  const isUsingCustomLoc = useMemo(() => {
    // the last element in the list is always assumed to be a custom entry
    return (
      selectedHostLoc ===
      supportedEventLocations[supportedEventLocations.length - 1]
    );
  }, [selectedHostLoc]);

  const canSearch = useMemo(() => {
    let _hasTagInput = isUsingCustomTag ? !!useCustomTag : !!selectedEventTypes;
    let _hasLocInput = isUsingCustomLoc
      ? !!useCustomHostLoc
      : !!selectedHostLoc;

    // reset the custom location data
    if (!isUsingCustomLoc && useCustomHostLoc) {
      setCustomHostLoc("");
    }
    if (!isUsingCustomTag && useCustomTag) {
      setCustomTag("");
    }

    return _hasTagInput && _hasLocInput;
  }, [
    selectedEventTypes,
    selectedHostLoc,
    isUsingCustomLoc,
    isUsingCustomTag,
    useCustomTag,
    useCustomHostLoc,
  ]);

  useEffect(() => {
    // value logger for debugging
    console.log({
      selectedEventTypes,
      selectedHostLoc,
      isUsingCustomLoc,
      isUsingCustomTag,
      useCustomHostLoc,
      useCustomTag,
      canSearch,
    });
  }, [
    selectedEventTypes,
    selectedHostLoc,
    isUsingCustomLoc,
    isUsingCustomTag,
    useCustomHostLoc,
    useCustomTag,
    canSearch,
  ]);

  const onClickFetchEvents = useCallback(() => {
    setIsLoading(true);
    const api = utils.perplexityApiInst(appConfig.perplexityApi);
    const fetchConfs = async () => {
      const tagsToUse = isUsingCustomTag ? useCustomTag : selectedEventTypes;
      const locToUse = isUsingCustomLoc ? useCustomHostLoc : selectedHostLoc;

      const confList = await utils.fetchConferenceList(
        api,
        tagsToUse,
        locToUse
      );

      return confList;
    };

    fetchConfs()
      .then((i) => {
        setEventList(i);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    selectedEventTypes,
    selectedHostLoc,
    isUsingCustomLoc,
    isUsingCustomTag,
    useCustomHostLoc,
    useCustomTag,
  ]);

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
          <IonLoading
            message="Fetching data..."
            spinner="circles"
            isOpen={isLoading}
          />
          <IonCard>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonSelect
                    label="Conference Category"
                    labelPlacement="floating"
                    onIonChange={(e) => {
                      setEventTypes(e.detail.value);
                      console.log([e.detail.value]);
                    }}
                  >
                    {supportedEventTypes.map((i) => {
                      return (
                        <IonSelectOption key={crypto.randomUUID()} value={i}>
                          {i}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                {isUsingCustomTag && (
                  <IonItem>
                    <IonInput
                      label="Custom Conference"
                      labelPlacement="stacked"
                      placeholder="Enter conference type"
                      onIonChange={(e) => setCustomTag(e.detail.value || "")}
                    ></IonInput>
                  </IonItem>
                )}

                <IonItem>
                  <IonSelect
                    label="Event Location"
                    labelPlacement="floating"
                    onIonChange={(e) => {
                      setHostLoc(e.detail.value);
                    }}
                  >
                    {supportedEventLocations.map((i) => {
                      return (
                        <IonSelectOption key={crypto.randomUUID()} value={i}>
                          {i}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                {isUsingCustomLoc && (
                  <IonItem>
                    <IonInput
                      label="Custom Location"
                      labelPlacement="stacked"
                      placeholder="Enter conference location"
                      onIonChange={(e) =>
                        setCustomHostLoc(e.detail.value || "")
                      }
                    ></IonInput>
                  </IonItem>
                )}

                <IonItem>
                  <IonButton
                    slot="end"
                    onClick={onClickFetchEvents}
                    disabled={!canSearch}
                    size="large"
                  >
                    Fetch events
                  </IonButton>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {eventList.length > 0 ? (
            <IonList>
              {eventList.map((i) => {
                return (
                  <IonItem key={crypto.randomUUID()}>
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
                        For more information, visit{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={i.eventLink}
                        >
                          {i.eventLink}
                        </a>
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
