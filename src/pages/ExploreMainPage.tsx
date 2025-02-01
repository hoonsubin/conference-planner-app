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
  IonNavLink,
} from "@ionic/react";
import { useState, useMemo, useCallback } from "react";
import * as utils from "../services";
import { TravelEvent } from "../types";
import {
  appConfig,
  supportedEventTypes,
  supportedEventLocations,
} from "../config";
import SelectAttendeesPage from "./SelectAttendeesPage";
import { useLlmApiContext } from "../context/LlmApiContext";
import EventSearch from "../components/explore/eventsearch/EventSearch";

const ExploreMainPage: React.FC = () => {
  const [eventList, setEventList] = useState<TravelEvent[]>([]);
  const [selectedEventTypes, setEventTypes] = useState("");
  const [selectedHostLoc, setHostLoc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [useCustomTag, setCustomTag] = useState("");
  const [useCustomHostLoc, setCustomHostLoc] = useState("");

  const { api } = useLlmApiContext();

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

  const onClickFetchEvents = useCallback(() => {
    setIsLoading(true);
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
              <IonTitle>Search Events</IonTitle>
          </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Search events</IonTitle>
          </IonToolbar>
        </IonHeader>
        <EventSearch>
        </EventSearch>
      </IonContent>
    </IonPage>
  );
};

export default ExploreMainPage;
