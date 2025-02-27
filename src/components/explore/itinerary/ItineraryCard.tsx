import React, { useRef, useState } from "react";
import {
  IonCard,
  IonCardTitle,
  IonBadge,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonIcon,
  IonSelect,
  IonCheckbox,
} from "@ionic/react";
import {
  airplane,
  location,
  link,
  calendarOutline,
  timeOutline,
} from "ionicons/icons";
import { Attendee, FlightItinerary } from "../../../types";
import dayjs from "dayjs";
import SelectFlightPlanModal from "./SelectFlightPlanModal";

interface ItineraryCardProps {
  itinerary: FlightItinerary;
  allItineraryOptions?: FlightItinerary[];
  attendee?: Attendee;
  selectMode: boolean;
  isSelected?: boolean;
  setSelectedFlightPlan: React.Dispatch<React.SetStateAction<FlightItinerary>>;
  triggerFlightPlanSelection?: () => void;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  itinerary,
  allItineraryOptions,
  attendee,
  selectMode,
  isSelected,
  setSelectedFlightPlan,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <IonCard
      className="ion-padding"
      style={{
        width: "300px",
        height: "64vh",
      }}
    >
      {/* Header with Attendee Name and a Change Badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IonCardTitle>
          {attendee ? attendee?.name : itinerary.airline}
        </IonCardTitle>
        {selectMode ? (
          <IonCheckbox checked={isSelected}></IonCheckbox>
        ) : (
          <IonBadge
            id="open-select-flight-plan-modal"
            role="button"
            style={{ padding: "8px", cursor: "pointer" }}
            color="warning"
            onClick={() => setModalOpen(true)}
          >
            Change
          </IonBadge>
        )}
      </div>

      {/* Flight Itinerary ID as Subtitle */}
      {/* <IonCardSubtitle>{itinerary.id}</IonCardSubtitle> */}

      <IonCardContent
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "32px",
          columnGap: "16px",
        }}
      >
        {/* Departure Date and Time */}
        <IonText
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              rowGap: "10px",
              alignItems: "center",
            }}
          >
            <IonIcon
              icon={calendarOutline}
              style={{
                marginRight: "10px",
                marginLeft: "0px",
                fontSize: "24px",
              }}
            ></IonIcon>
            <div>
              <span>
                {itinerary.departTime
                  ? dayjs(itinerary.departTime.toLocaleString()).format(
                      "DD.MM.YYYY"
                    )
                  : "no date available"}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              rowGap: "10px",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <IonIcon
              icon={timeOutline}
              style={{
                marginRight: "10px",
                marginLeft: "0px",
                fontSize: "24px",
              }}
            ></IonIcon>
            <div>
              <span>
                {itinerary.departTime
                  ? dayjs(itinerary.departTime.toLocaleString()).format("h:mm")
                  : "no date available"}
              </span>
            </div>
          </div>
        </IonText>
        <br />

        {/* Departure Address */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IonIcon
            icon={location}
            style={{ fontSize: "24px" }}
            className="ion-padding-end"
          />
          <IonText>
            <h4>
              {itinerary.departAddress?.country} {itinerary.departAddress?.city}{" "}
              {itinerary.departAddress?.fullAddr}
            </h4>
          </IonText>
        </div>
        <br />

        {/* Flight Details (Airline and Flight Number) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              borderLeft: "1px solid white",
              marginLeft: "5px",
              minHeight: "80px",
            }}
          ></div>
          <IonIcon
            icon={airplane}
            className="ion-padding-end"
            style={{ color: "#3b82f6" }}
          />
          <div>
            <IonText>
              <h2>{itinerary.airline}</h2>
            </IonText>
          </div>
          <IonText>{itinerary.flightNo}</IonText>
        </div>
        <br />

        {/* Arrival Address */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IonIcon
            icon={location}
            className="ion-padding-end"
            style={{ fontSize: "24px" }}
          />
          <IonText>
            <h4>
              {itinerary.arrivalAddress?.country}{" "}
              {itinerary.arrivalAddress?.city}{" "}
              {itinerary.arrivalAddress?.fullAddr}
            </h4>
          </IonText>
        </div>
        <br />

        {/* Arrival Date and Time */}
        <IonText
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              rowGap: "10px",
              alignItems: "center",
            }}
          >
            <IonIcon
              icon={calendarOutline}
              style={{
                marginRight: "10px",
                marginLeft: "0px",
                fontSize: "24px",
              }}
            ></IonIcon>
            <div>
              <span>
                {itinerary.arrivalTime
                  ? dayjs(itinerary.arrivalTime.toLocaleString()).format(
                      "DD.MM.YYYY"
                    )
                  : "no date available"}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              rowGap: "10px",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <IonIcon
              icon={timeOutline}
              style={{
                marginRight: "10px",
                marginLeft: "0px",
                fontSize: "24px",
              }}
            ></IonIcon>
            <div>
              <span>
                {itinerary.arrivalTime
                  ? dayjs(itinerary.arrivalTime.toLocaleString()).format("h:mm")
                  : "no date available"}
              </span>
            </div>
          </div>
        </IonText>
        <br />
        <br />

        {/* Booking Link */}
        <div>
          <IonIcon
            icon={link}
            className="ion-padding-end"
            style={{ fontSize: "24px" }}
          />
          <IonText>Booking Link:</IonText>
        </div>
        <br />
        <IonText>
          <a
            href={itinerary.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {itinerary.bookingLink}
          </a>
        </IonText>
      </IonCardContent>
      {allItineraryOptions && (
        <SelectFlightPlanModal
          isOpen={isModalOpen}
          dismiss={() => setModalOpen(false)}
          allFlightPlans={allItineraryOptions}
          selectedFlightPlan={itinerary}
          setSelectedFlightPlan={setSelectedFlightPlan}
        ></SelectFlightPlanModal>
      )}
    </IonCard>
  );
};

export default ItineraryCard;
