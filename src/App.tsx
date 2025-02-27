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
  useIonViewWillEnter,
} from "@ionic/react";
import { IonReactHashRouter } from "@ionic/react-router";
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
import EventDetail from "./components/explore/eventdetail/EventDetail";
import LocationSearch from "./components/LocationSearch";
import EventResults from "./components/explore/eventresults/EventResults";
import CreateJourney from "./components/explore/createjourney/CreateJourney";
import Itinerary from "./components/explore/itinerary/Itinerary";
import EditName from "./components/account/EditName";
import EditEmail from "./components/account/EditEmail";
import EditLocation from "./components/account/EditLocation";
import SetBudget from "./components/explore/setbudget/SetBudget";
import SplashScreen from "./pages/SplashScreen";
import PersonalItinerary from "./components/explore/itinerary/PersonalItinerary";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <TravelDataProvider>
      <LlmApiContextProvider>
        <IonReactHashRouter>
          <Route exact path="/splash">
            <SplashScreen />
          </Route>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/upcoming">
                <UpcomingTab />
              </Route>
              <Route
                exact
                path="/upcoming/event/:eventId"
                component={EventDetail}
              />
              <Route
                exact
                path="/upcoming/event/:eventId/attendee/:attendeeId"
                component={PersonalItinerary}
              />
              <Route exact path="/explore">
                <ExploreTab />
              </Route>
              {/* <Route path="/explore" component={EventSearch} /> */}
              <Route
                exact
                path="/explore/location"
                component={LocationSearch}
              />
              <Route exact path="/explore/events" component={EventResults} />
              <Route
                exact
                path="/explore/event-detail"
                component={EventDetail}
              />
              <Route exact path="/explore/journey" component={CreateJourney} />
              <Route exact path="/explore/itinerary" component={Itinerary} />
              <Route exact path="/explore/budget" component={SetBudget} />
              {/* <Route path="/explore/journey/:id/budget" component={} /> */}
              <Route path="/account">
                <AccountTab />
              </Route>
              <Route exact path="/edit-name" component={EditName} />
              <Route exact path="/edit-email" component={EditEmail} />
              <Route exact path="/edit-location" component={EditLocation} />
              {/* <Route exact path="/edit-budget" component={EditBudget}/> */}
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
        </IonReactHashRouter>
      </LlmApiContextProvider>
    </TravelDataProvider>
  </IonApp>
);

export default App;
