// import {
//     IonContent,
//     IonHeader,
//     IonPage,
//     IonTitle,
//     IonToolbar,
//     IonButton,
//     IonText,
//     IonInput,
//     IonBackButton,
//     IonButtons,
//     IonRange,
//   } from "@ionic/react";
// import { supportedEventLocations, supportedEventTypes } from "../../config";
// import { useHistory, useLocation } from "react-router-dom";
// import { useState } from "react";
// import { Attendee } from "../../types";
// import { useConferenceEventContext } from "../../context/TravelDataContext";

// interface EditBudgetProps {

// }

// const EditBudget: React.FC<EditBudgetProps> = ({ }) => {
//     const history = useHistory();
//     const loc = useLocation();
//     const data = loc.state as { attendee: Attendee};
//     const [attendee, setAttendee] = useState<Attendee>(data?.attendee ?? "");
//     const { allAttendees, addNewAttendee, getAttendee } = useConferenceEventContext();
//     function saveAttendee() {
//         addNewAttendee(attendee);
//     }

// return (
//     <IonPage>
//         <IonHeader>
//           <IonToolbar>
//             <IonButtons slot="start">
//                 <IonBackButton></IonBackButton>
//             </IonButtons>
//             <IonTitle>Change budget</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         {
//             data ?
//             <IonContent className="ion-padding">
//             <h2>Edit your budget</h2>
//             <br></br>
//             <IonRange labelPlacement="stacked" class="ion-padding" min={100} max={5000} // snaps={true}
//                 step={100} pin={true} pinFormatter={(value: number) => `${value}€`} onIonChange={
//                     (e: any) => setAttendee({
//                         ...attendee,
//                         maxBudget: e.detail.value
//                     })
//                 }>
//                 <div slot="label" style={{
//                     marginBottom: "0"!
//                 }}>
//                     <h4>Budget</h4>
//                     <br />
//                     Set your budget
//                 </div>
//                 <IonText slot="start">100</IonText>
//                 <IonText slot="end">5.000</IonText>
//                 {
//                     /* <IonIcon slot="end" icon={logoEuro}></IonIcon> */
//                 }
//             </IonRange>
//             <br></br>
//             <IonButton
//                 onClick={
//                     () => {
//                         saveAttendee();
//                         history.goBack();
//                     }
//                 }
//                 expand="block"
//                 className="ion-padding-top">
//                 Save
//             </IonButton>
//           </IonContent>
//             :
//             <IonContent class="ion-padding ion-text-center">
//                 <IonText class="ion-text-center">No type and data specified</IonText>
//             </IonContent>
//         }
//     </IonPage>
// );
// };

// export default EditBudget;
