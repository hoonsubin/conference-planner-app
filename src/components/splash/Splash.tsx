import React from 'react';
import Logo from '../../../resources/Logo.png';
import { IonButton, IonContent } from '@ionic/react';

const Splash: React.FC = () => {
    return (
        <IonContent className='ion-padding' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" />
            <h1>Trippin Globes</h1>
            <IonButton>
                Lets explore
            </IonButton>
        </IonContent>
    );
};

export default Splash;