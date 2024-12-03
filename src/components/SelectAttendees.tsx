import { IonCheckbox, IonItem, IonLabel, IonText } from '@ionic/react';
import {Attendee} from '../types';

interface SelectAttendeesProps {
  attendees: Attendee[];
}

const SelectAttendees: React.FC<SelectAttendeesProps> = (props) => {
  return (
    <div>
      <h1>People</h1>
      <small>Add who's coming</small>
      <>
        {props.attendees.map((i) => {
          return (
            <IonItem>
              <IonLabel>
                <strong>{i.name}</strong>
                <IonText>{i.homeCity.cityName}, {i.homeCity.countryName}</IonText>
              </IonLabel>

              <IonCheckbox slot="end"></IonCheckbox>
            </IonItem>
          )
        })}
      </>
    </div>
  );
};

export default SelectAttendees;
