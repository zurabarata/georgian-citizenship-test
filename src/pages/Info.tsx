import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonItemDivider,
} from '@ionic/react';
import { 
  informationCircleOutline, 
  helpCircleOutline, 
  settingsOutline,
  mailOutline,
  globeOutline,
  documentTextOutline,
  schoolOutline,
  statsChartOutline,
  notificationsOutline,
  moonOutline,
  volumeHighOutline
} from 'ionicons/icons';

export const Info = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ℹ️ Information & Help</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ padding: '16px' }}>
          {/* App Information */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>🇬🇪 About the App</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p>
                  <strong>Georgian Citizenship Test Preparation App</strong><br />
                  Your comprehensive tool for preparing for the Georgian citizenship test.
                </p>
                <p>
                  This app helps you practice with questions from three main categories:
                </p>
                <ul>
                  <li>🇬🇪 Georgian Language</li>
                  <li>📖 Georgian History</li>
                  <li>⚖️ Georgian Law</li>
                </ul>
                <p>
                  <strong>Version:</strong> 1.0.0<br />
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>

          {/* How to Use */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>📚 How to Use</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem lines="full">
                  <IonIcon icon={schoolOutline} slot="start" color="primary" />
                  <IonLabel>
                    <h3>Study Mode</h3>
                    <p>Practice with all questions in a category. See correct answers and explanations.</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="full">
                  <IonIcon icon={documentTextOutline} slot="start" color="secondary" />
                  <IonLabel>
                    <h3>Test Mode</h3>
                    <p>Take a 10-question test. You need 7+ correct answers to pass.</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="full">
                  <IonIcon icon={statsChartOutline} slot="start" color="tertiary" />
                  <IonLabel>
                    <h3>Track Progress</h3>
                    <p>Monitor your performance and see detailed statistics.</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Test Requirements */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>🎯 Test Requirements</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p><strong>Passing Score:</strong> 7 out of 10 questions (70%)</p>
                <p><strong>Test Duration:</strong> No time limit</p>
                <p><strong>Question Types:</strong> Multiple choice (A, B, C, D)</p>
                <p><strong>Categories:</strong> Language, History, and Law</p>
                <p><strong>Total Questions:</strong> 200+ questions available</p>
              </IonText>
            </IonCardContent>
          </IonCard>

          {/* Tips */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>💡 Study Tips</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem lines="full">
                  <IonLabel>
                    <h3>Start with Study Mode</h3>
                    <p>Practice with all questions before taking tests</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="full">
                  <IonLabel>
                    <h3>Review Wrong Answers</h3>
                    <p>Pay attention to explanations for incorrect answers</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="full">
                  <IonLabel>
                    <h3>Take Multiple Tests</h3>
                    <p>Practice regularly to improve your score</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="full">
                  <IonLabel>
                    <h3>Check Your Progress</h3>
                    <p>Monitor your performance in the Progress tab</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Settings */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>⚙️ Settings</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonIcon icon={notificationsOutline} slot="start" />
                  <IonLabel>Study Reminders</IonLabel>
                  <IonToggle slot="end" />
                </IonItem>
                <IonItem>
                  <IonIcon icon={moonOutline} slot="start" />
                  <IonLabel>Dark Mode</IonLabel>
                  <IonToggle slot="end" />
                </IonItem>
                <IonItem>
                  <IonIcon icon={volumeHighOutline} slot="start" />
                  <IonLabel>Sound Effects</IonLabel>
                  <IonToggle slot="end" />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Contact & Support */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>📞 Contact & Support</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button>
                  <IonIcon icon={mailOutline} slot="start" />
                  <IonLabel>Send Feedback</IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon icon={helpCircleOutline} slot="start" />
                  <IonLabel>Report an Issue</IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon icon={globeOutline} slot="start" />
                  <IonLabel>Visit Website</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Legal */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>📄 Legal Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p>
                  This app is designed for educational purposes and test preparation. 
                  It is not affiliated with any official government institution.
                </p>
                <p>
                  <strong>Disclaimer:</strong> While we strive for accuracy, 
                  please verify information with official sources.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};
