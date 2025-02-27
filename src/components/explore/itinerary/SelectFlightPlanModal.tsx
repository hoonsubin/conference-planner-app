import { IonModal, IonContent, IonButton } from "@ionic/react";
import React, { useState } from "react";
import { FlightItinerary } from "../../../types";
import ItineraryCard from "./ItineraryCard";
import "./SelectFlightPlanModal.css";

interface SelectFlightPlanModalProps {
    allFlightPlans: FlightItinerary[];
    selectedFlightPlan: FlightItinerary;
    setSelectedFlightPlan: React.Dispatch<React.SetStateAction<FlightItinerary>>;
}

const SelectFlightPlanModal: React.FC<{ 
    isOpen: boolean; 
    dismiss: () => void; 
    allFlightPlans: FlightItinerary[]; 
    selectedFlightPlan: FlightItinerary; 
    setSelectedFlightPlan: React.Dispatch<React.SetStateAction<FlightItinerary>> 
}> = ({ isOpen, dismiss, allFlightPlans, selectedFlightPlan, setSelectedFlightPlan }) => {
    return (
        <IonModal className="wide-modal" isOpen={isOpen} onDidDismiss={dismiss} initialBreakpoint={0.9} breakpoints={[0.9]} backdropDismiss={true}>
            <IonContent className="ion-padding" style={{ width: "90%"}}>
                <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                }}
                >
                {
                    allFlightPlans?.map((itineraryOptions) => {
                        if (!itineraryOptions) return null;
                        return (
                            <div key={itineraryOptions.id} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrap: "nowrap",
                            }}>
                                <ItineraryCard 
                                    key={itineraryOptions.id}
                                    itinerary={itineraryOptions}
                                    selectMode={true}
                                    isSelected={itineraryOptions === selectedFlightPlan}
                                    setSelectedFlightPlan={setSelectedFlightPlan}
                                />
                            </div>
                        );
                    })
                }
                </div>
                {/* <IonButton expand="block" onClick={dismiss}>Close</IonButton> */}
            </IonContent>
        </IonModal>
    );
};

export default SelectFlightPlanModal;