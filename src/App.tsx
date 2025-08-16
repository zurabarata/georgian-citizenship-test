import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { 
  homeOutline, 
  schoolOutline, 
  documentTextOutline, 
  statsChartOutline, 
  informationCircleOutline 
} from 'ionicons/icons';
import { Home } from './pages/Home';
import { Test } from './pages/Test';
import { Results } from './pages/Results';
import { Study } from './pages/Study';
import { StudyOverview } from './pages/StudyOverview';
import { TestOverview } from './pages/TestOverview';
import { Progress } from './pages/Progress';
import { Info } from './pages/Info';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

export const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/study" />
            </Route>
            <Route exact path="/dashboard">
              <Home />
            </Route>
            <Route exact path="/study">
              <StudyOverview />
            </Route>
            <Route exact path="/test">
              <TestOverview />
            </Route>
            <Route exact path="/progress">
              <Progress />
            </Route>
            <Route exact path="/info">
              <Info />
            </Route>
            <Route exact path="/test/:categoryId">
              <Test />
            </Route>
            <Route exact path="/results">
              <Results />
            </Route>
            <Route exact path="/study/:categoryId">
              <Study />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            {/* <IonTabButton tab="dashboard" href="/dashboard">
              <IonIcon icon={homeOutline} />
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton> */}

            <IonTabButton tab="study" href="/study">
              <IonIcon icon={schoolOutline} />
              <IonLabel>Study</IonLabel>
            </IonTabButton>

            <IonTabButton tab="test" href="/test">
              <IonIcon icon={documentTextOutline} />
              <IonLabel>Test</IonLabel>
            </IonTabButton>

            <IonTabButton tab="progress" href="/progress">
              <IonIcon icon={statsChartOutline} />
              <IonLabel>Progress</IonLabel>
            </IonTabButton>

            {/* <IonTabButton tab="info" href="/info">
              <IonIcon icon={informationCircleOutline} />
              <IonLabel>Info</IonLabel>
            </IonTabButton> */}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};
