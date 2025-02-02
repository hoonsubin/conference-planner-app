import { IonModal, IonContent, IonInput, IonRange, IonText, IonButton } from "@ionic/react";
import React from "react";
import { Attendee } from "../types";

interface AddAttendeeModalProps {
    newAttendee: Attendee;
    setNewAttendee: React.Dispatch<React.SetStateAction<Attendee>>;
    modal: React.RefObject<HTMLIonModalElement>;
    presentingElement: HTMLElement | null;
    dismiss: () => void;
}

class AddAttendeeModal extends React.Component<AddAttendeeModalProps> {
    constructor(props: AddAttendeeModalProps) {
        super(props);
    }

    render() {
        return (
            <IonModal ref={this.props.modal} trigger="open-modal" canDismiss={true} presentingElement={this.props.presentingElement!} initialBreakpoint={0.9} breakpoints={[0.5, 0.75, 0.9]} backdropDismiss={true}>
                <IonContent className="ion-padding">
                    {
                        /* <h2>Add attendee</h2> */
                    }
                    <br></br>
                    <h3>Personal information</h3>
                    <IonInput label="Name" labelPlacement="floating" clearInput={true} placeholder="Attendee name" value={this.props.newAttendee.name} onIonInput={(e: any) => this.props.setNewAttendee({
                        ...this.props.newAttendee,
                        name: e.target.value
                    })} fill="outline" className="ion-padding-top">
                    </IonInput>
                    <br></br>
                    <IonInput label="Email" labelPlacement="floating" clearInput={true} placeholder="Attendee email" value={this.props.newAttendee.email} onIonInput={(e: any) => this.props.setNewAttendee({
                        ...this.props.newAttendee,
                        email: e.target.value
                    })} fill="outline" className="ion-padding-top">
                    </IonInput>
                    <br></br>
                    <IonInput label="City" labelPlacement="floating" clearInput={true} placeholder="Attendee city" value={this.props.newAttendee.departLocation.city} onIonInput={(e: any) => this.props.setNewAttendee({
                        ...this.props.newAttendee,
                        departLocation: {
                            ...this.props.newAttendee.departLocation,
                            city: e.target.value
                        }
                    })} fill="outline" className="ion-padding-top">
                    </IonInput>
                    <br></br>
                    <IonInput label="Country" labelPlacement="floating" clearInput={true} placeholder="Attendee country" value={this.props.newAttendee.departLocation.country} onIonInput={(e: any) => this.props.setNewAttendee({
                        ...this.props.newAttendee,
                        departLocation: {
                            ...this.props.newAttendee.departLocation,
                            country: e.target.value
                        }
                    })} fill="outline" className="ion-padding-top">
                    </IonInput>
                    {/* <br></br>
                    <IonRange labelPlacement="stacked" class="ion-padding" min={100} max={5000} // snaps={true}
                        step={100} pin={true} pinFormatter={(value: number) => `${value}€`} onIonChange={(e: any) => this.props.setNewAttendee({
                            ...this.props.newAttendee,
                            maxBudget: e.detail.value
                        })}>
                        <div slot="label" style={{
                            marginBottom: "0"!
                        }}>
                            <h4>Budget</h4>
                            <br />
                            Set the atttendee's budget
                        </div>
                        <IonText slot="start">100</IonText>
                        <IonText slot="end">5.000</IonText>
                        {
                            <IonIcon slot="end" icon={logoEuro}></IonIcon>
                        }
                    </IonRange>
                    <IonText className="ion-padding-start">Budget: {this.props.newAttendee.maxBudget?.toString()}€</IonText> */}
                    <br></br>
                    <IonButton onClick={
                        () => {
                            console.log("new attendee", this.props.newAttendee);
                            this.props.dismiss();
                        }
                    } expand="block" className="ion-padding-top">
                        {this.props.newAttendee.id ? "Save" : "Add attendee"}
                    </IonButton>
                </IonContent>
            </IonModal>
        );
    }
}

export default AddAttendeeModal;