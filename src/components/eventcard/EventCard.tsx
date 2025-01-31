import React from "react";
import { IonCard, IonCardContent, IonText, IonIcon } from "@ionic/react";
import { calendarOutline, locationOutline, linkOutline } from "ionicons/icons";
import { TravelEvent } from "../../types";
import "./EventCard.css";

interface EventCardProps {
  event: TravelEvent;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {

  return (
    <div className="glass-container">
      <IonCard className="frosted-glass" onClick={onClick}>
        <IonCardContent className="card-content">
            <img 
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
                className="event-image"
                alt="Event Image" />
            <div className="event-details">
                <IonText>
                <h1>{event.name}</h1>
                </IonText>
                <div className="event-info">
                    <IonIcon icon={calendarOutline} className="icon" />
                    <IonText>
                    {event.eventStart.toLocaleString().split('T')[0]}
                    {/* - {event.eventEnd.toLocaleString().split('T')[0]} */}
                    </IonText>
                </div>

                <p>{event.description.substring(0, 300) + " ..."}</p>

                <div className="event-info">
                    <IonIcon icon={locationOutline} className="icon" />
                    <IonText>{event.venueAddr}</IonText>
                </div>

                {/* <a href={event.eventLink} target="_blank" rel="noopener noreferrer" className="link">
                    <IonIcon icon={linkOutline} className="icon" />
                    {event.eventLink}
                </a> */}
            </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default EventCard;