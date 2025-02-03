import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonBackButton, IonButtons, IonList, IonToggle, IonNote, IonRange, IonText, IonFooter, IonChip } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Attendee, Budget, ConferenceEvent} from '../../../types';
import dummyData from '../../../config/dummyData';
import "./SetBudget.css";

const SetBudget: React.FC = () => {
    const history = useHistory();
    const loc = useLocation();
    const data = loc.state as { event: ConferenceEvent, attendees: Attendee[], matchFlights: boolean };
    const [universalBudget, setUniversalBudget] = useState<boolean>(true);
    const [attendees, setAttendees] = useState<Attendee[]>(data.attendees);
    const [budgets , setBudgets] = useState<Budget[]>([]);
    function creatItineraries() {
        history.push({
            pathname: '/explore/itinerary',
            state: { event: data.event, attendees: attendees, budgets: budgets, matchFlights: data.matchFlights }
        });
    }

    return (
        <IonPage style={{backgroundColor: "transparent"}}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Set Budgets</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>How much 💸</h2>
                <IonNote color="medium" className="ion-text-wrap">
                    Set the budget for each attendee
                </IonNote>
                {
                    universalBudget ?
                    <IonContent style={{marginTop: "16px"}}>
                        <IonRange labelPlacement="stacked" class="ion-padding" min={100} max={5000} // snaps={true}
                            value={(budgets.reduce((sum, budget) => sum + (budget?.maxBudget ? budget?.maxBudget! : 0), 0))/attendees.length}
                            step={100} pin={true} pinFormatter={(value: number) => `${value}€`} onIonChange={
                                (e: any) => 
                                {
                                    const b:Budget[] = attendees.map((i) => ({
                                        // TODO: @kai allow user to set minBudget?
                                        minBudget: 0,
                                        maxBudget: e.detail.value,
                                        currencySymbol: "EUR"
                                    }) );
                                    setBudgets(b);
                                }
                            }>
                            <div slot="label" style={{
                                marginBottom: "0"!
                            }}>
                                <h4>Budget</h4>
                                <br />
                                Set the budget for each attendee
                            </div>
                            <IonText slot="start">100</IonText>
                            <IonText slot="end">{attendees.length * 5000}</IonText>
                            {
                                /* <IonIcon slot="end" icon={logoEuro}></IonIcon> */
                            }
                        </IonRange>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <IonChip class="budget-chip">
                                <h6 style={{textAlign: "center"}}>Total budget: {
                                    budgets.reduce((sum, budget) => sum + (budget?.maxBudget ? budget?.maxBudget! : 0), 0)
                                }€</h6>
                            </IonChip>
                        </div>
                        <IonButton expand="block" style={{marginTop: "16px"}} onClick={() => creatItineraries()}>
                            Create itinerary
                        </IonButton>
                    </IonContent>
                    :
                    <IonContent> 
                        <IonList style={{paddingBottom: "120px"}}>
                            {
                                attendees.map((attendee, index) => {
                                    return (
                                        <IonItem key={index}>
                                            <IonRange labelPlacement="stacked" min={100} max={5000} // snaps={true}
                                                value={budgets[index]?.maxBudget}
                                                step={100} pin={true} pinFormatter={(value: number) => `${value}€`} onIonChange={
                                                    (e: any) => 
                                                    {
                                                        const b:Budget[] = [...budgets];
                                                        b[index] = {
                                                            minBudget: 0,
                                                            maxBudget: e.detail.value,
                                                            currencySymbol: "EUR"
                                                        };
                                                        setBudgets(b);
                                                    }
                                                }>
                                                <div slot="label" style={{
                                                    marginBottom: "0"!
                                                }}>
                                                    <h4>{attendee.name}</h4>
                                                    <br />
                                                    Set budget
                                                </div>
                                                <IonText slot="start">100</IonText>
                                                <IonText slot="end">5.000</IonText>
                                                {
                                                    /* <IonIcon slot="end" icon={logoEuro}></IonIcon> */
                                                }
                                            </IonRange>
                                        </IonItem>
                                    );
                                })
                            }
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <IonChip class="budget-chip">
                                    <h6 style={{textAlign: "center"}}>Total budget: {
                                        budgets.reduce((sum, budget) => sum + (budget?.maxBudget ? budget?.maxBudget! : 0), 0)
                                    }€</h6>
                                </IonChip>
                            </div>
                            <IonButton expand="block" style={{marginTop: "16px"}} onClick={() => creatItineraries()}>
                                Create itinerary
                            </IonButton>
                        </IonList>
                    </IonContent>
                }
        </IonContent>
        <IonFooter class='ion-padding budget-footer'>
            <IonItem>
                <IonLabel>
                    <strong>Set same budget for all attendees</strong>
                    <br />
                    {/* <IonNote color="medium" className="ion-text-wrap" style={{ fontSize: "small" }}>
                    </IonNote> */}
                </IonLabel>
                <IonToggle 
                    slot="end" 
                    aria-label="Set same budget for all attendees"
                    checked={universalBudget}
                    onIonChange={e => setUniversalBudget(e.detail.checked)}
                ></IonToggle>
            </IonItem>
        </IonFooter>
        </IonPage>
    );
};

export default SetBudget;