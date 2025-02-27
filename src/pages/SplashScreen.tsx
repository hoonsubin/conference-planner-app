import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Splash from '../components/splash/Splash';

const SplashScreen: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Splash />
            </IonContent>
        </IonPage>
    );
};

export default SplashScreen;