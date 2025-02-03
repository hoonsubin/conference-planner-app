import React from "react";
import { IonCard, IonCardContent, IonText, IonIcon } from "@ionic/react";
import { calendarOutline, locationOutline, linkOutline } from "ionicons/icons";
import { ConferenceEvent } from "../../types";
import "./EventCard.css";
import dayjs from "dayjs";

interface EventCardProps {
  event: ConferenceEvent;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {

  return (
    <div className="glass-container">
      <IonCard className="frosted-glass" onClick={onClick}>
        <IonCardContent className="card-content">
            <img 
                src="https://media.graphassets.com/output=quality:95,strip:true/resize=w:960,h:540,fit:crop/sharpen=amount:1/auto_image/0SU9fxeTZO9BErEiK4tg"
                // https://images.unsplash.com/photo-1579546929518-9e396f3cc809
                className="event-image"
                alt="Event Image" />
            <div className="event-details">
                <IonText>
                <h1 className="gradient-headline-card">{event.name}</h1>
                </IonText>
                <div className="event-info">
                    <IonIcon icon={calendarOutline} className="icon" />
                    <IonText>
                    {dayjs(event.eventStartDate.toString()).format('DD.MM.YYYY')} - {dayjs(event.eventEndDate?.toString()).format('DD.MM.YYYY')}
                    </IonText>
                </div>

                <p>{event.eventDescription.substring(0, 300) + " ..."}</p>

                <div className="event-info">
                    <IonIcon icon={locationOutline} className="icon" />
                    <IonText>{event.venueAddress.fullAddr}</IonText>
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