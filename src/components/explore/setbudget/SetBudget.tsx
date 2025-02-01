import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';

const SetBudget: React.FC = () => {
    const [budget, setBudget] = useState<number | undefined>(undefined);

    const handleSetBudget = () => {
        if (budget !== undefined) {
            console.log(`Budget set to: ${budget}`);
            // Add your logic to handle the budget here
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Set Budget</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Enter your budget</IonLabel>
                    <IonInput
                        type="number"
                        value={budget}
                        onIonChange={e => setBudget(parseFloat(e.detail.value!))}
                    />
                </IonItem>
                <IonButton expand="full" onClick={handleSetBudget}>
                    Set Budget
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default SetBudget;