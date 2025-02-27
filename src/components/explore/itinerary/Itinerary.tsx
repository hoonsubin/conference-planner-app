import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import {
  Attendee,
  FlightItinerary,
  ConferenceEvent,
  Budget,
} from "../../../types";
import { useLlmApiContext } from "../../../context/LlmApiContext";
import { useConferenceEventContext } from "../../../context/TravelDataContext";
import ItineraryCard from "./ItineraryCard";
import CustomPopup from "../../general/custompopup/CustomPopup";
import Lottie from "react-lottie";
import paperAnimated from "../../../lottie/paper-animated.json";
import paperPlane from "../../../lottie/paper-plane.json";
import ReactConfetti from "react-confetti";

interface ItineraryProps {}

const Itinerary: React.FC<ItineraryProps> = () => {
  const history = useHistory();
  const loc = useLocation();
  const data = loc.state as {
    event: ConferenceEvent;
    attendees: Attendee[];
    budgets: Budget;
    matchFlights: boolean;
  };
  const { perplexityApi, fetchFlightItineraryApi } = useLlmApiContext();
  const { saveConferenceEvent, createNewAttendeeItinerary } =
    useConferenceEventContext();

  // State to store itineraries as a map: key -> attendee.id, value -> FlightItinerary[]
  const [itineraryMap, setItineraryMap] = useState<{
    [attendeeId: string]: FlightItinerary[];
  }>({});
  const [matchFlights, setMatchFlights] = useState(data?.matchFlights);
  const [showAlert, setShowAlert] = useState(false);
  const [sentItineraries, setSentItineraries] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch itineraries for all attendees and build the itinerary map
    const fetchItinerariesAsync = async () => {
      console.log("Fetching itineraries for each attendee");
      try {
        // Fetch an array of FlightItinerary arrays, one per attendee (assume same order)
        const itineraryArrays: FlightItinerary[][] = await Promise.all(
          data?.attendees?.map(async (attendee) => {
            return await fetchFlightItineraryApi(
              data?.event,
              attendee,
              data?.event?.eventStartDate
            );
          })
        );
        // Build map using attendee.id as key
        const newMap: { [attendeeId: string]: FlightItinerary[] } = {};
        data?.attendees?.forEach((attendee, index) => {
          if (itineraryArrays[index] && itineraryArrays[index].length > 0) {
            newMap[attendee?.id] = itineraryArrays[index];
          } else {
            console.warn(
              `No itinerary data for attendee with id ${attendee?.id}`
            );
          }
        });
        setItineraryMap(newMap);
        console.log("Itinerary map:", newMap);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItinerariesAsync();
  }, [useEffect]);

  function shareItineraries() {
    console.log("Share all itineraries via email");
    saveItineraries();
    setSentItineraries(true);
    setTimeout(() => {
      setSentItineraries(false);
    }, 3000);
  }

  function saveItineraries() {
    console.log("Save event");
    saveConferenceEvent(data?.event);
    console.log("Save all itineraries");

    // Iterate over the itinerary map and save each attendee's itinerary
    Object.entries(itineraryMap).forEach(([attendeeId, flightItineraries]) => {
      const attendee = data?.attendees?.find((a) => a.id === attendeeId);
      if (attendee && flightItineraries && flightItineraries.length > 0) {
        createNewAttendeeItinerary(
          data?.event,
          attendee,
          flightItineraries,
          data?.budgets
        );
        console.log(`Saved itinerary for attendee ${attendee.id}`);
      } else {
        console.warn(
          `No itinerary options found for attendee with id ${attendeeId}`
        );
      }
    });
  }

  return (
    <IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Do you want to save this journey?"}
        message={
          "You can just save it or share all itineraries with your attendees."
        }
        buttons={[
          {
            text: "Save & Share",
            role: "save-share",
            handler: () => {
              console.log("Save & Share clicked");
              shareItineraries();
            },
          },
          {
            text: "Save",
            role: "save",
            handler: () => {
              console.log("Save clicked");
              saveItineraries();
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ]}
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Itineraries</IonTitle>
        </IonToolbar>
      </IonHeader>

      {isLoading ? (
        <CustomPopup
          isOpen={isLoading}
          onClose={() => {}}
          title="Hold tight"
          message="We are creating the best itineraries for you"
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: paperAnimated,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
          />
        </CustomPopup>
      ) : (
        <IonContent>
          <div
            className="ion-padding"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {
              // Iterate over the map entries
              Object.entries(itineraryMap).map(
                ([attendeeId, itineraryOptions]) => {
                  const attendee = data?.attendees?.find(
                    (a) => a.id === attendeeId
                  );
                  if (!itineraryOptions || !attendee) return null;
                  // Assume we use the first itinerary option for display
                  const fp = itineraryOptions[0];
                  if (!fp) return null;
                  return (
                    <div
                      key={attendeeId}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        marginRight: "16px",
                      }}
                    >
                      <ItineraryCard
                        key={fp.id}
                        itinerary={fp}
                        allItineraryOptions={itineraryOptions}
                        attendee={attendee}
                        selectMode={false}
                        triggerFlightPlanSelection={() => {
                          // TODO: Add a way to select the flight plan
                        }}
                        setSelectedFlightPlan={() => {}}
                      />
                    </div>
                  );
                }
              )
            }
          </div>
          <CustomPopup
            isOpen={sentItineraries}
            onClose={() => {}}
            title="Yay!"
            message="We have sent out the itineraries to all attendees"
          >
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: paperPlane,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            />
          </CustomPopup>
          {sentItineraries && (
            <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
        </IonContent>
      )}
      <IonFooter className="ion-padding">
        <IonButton expand="block" onClick={shareItineraries}>
          Share all itineraries via email
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Itinerary;
