import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { person, compass, calendar } from "ionicons/icons";
import AccountTab from "./tabs/AccountTab";
import ExploreTab from "./tabs/ExploreTab";
import UpcomingTab from "./tabs/UpcomingTab";
import { TravelDataProvider } from "./context/TravelDataContext";
import { LlmApiContextProvider } from "./context/LlmApiContext";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/styles.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <TravelDataProvider>
      <LlmApiContextProvider>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/upcoming">
                <UpcomingTab />
              </Route>
              <Route exact path="/explore">
                <ExploreTab />
              </Route>
              <Route path="/account">
                <AccountTab />
              </Route>
              <Route exact path="/">
                <Redirect to="/explore" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="upcoming" href="/upcoming">
                <IonIcon aria-hidden="true" icon={calendar} />
                <IonLabel>Upcoming</IonLabel>
              </IonTabButton>
              <IonTabButton tab="explore" href="/explore">
                <IonIcon aria-hidden="true" icon={compass} />
                <IonLabel>Explore</IonLabel>
              </IonTabButton>
              <IonTabButton tab="account" href="/account">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Account</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </LlmApiContextProvider>
    </TravelDataProvider>
  </IonApp>
);

export default App;
