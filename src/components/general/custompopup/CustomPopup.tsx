import React, { ReactNode } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonText,
} from "@ionic/react";
import "./CustomPopup.css";

interface CustomPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children: ReactNode;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
  isOpen,
  onClose,
  title = "Popup Title",
  message = "",
  children,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} backdropDismiss={false} className="custom-popup">
      <div className="popup-overlay">
        <div className="popup-container frosted-glass-popup">
          <h2>{title}</h2>
          {/* <IonButtons slot="end">
            <IonButton onClick={onClose}>✕</IonButton>
          </IonButtons> */}
          <div className="popup-content">
            {children}
          </div>
          <div className="popup-footer">
            <IonText>{message}</IonText>
          </div>
        </div>
      </div>
    </IonModal>
  );
};

export default CustomPopup;