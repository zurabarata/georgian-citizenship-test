import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonBadge,
  IonAlert,
} from '@ionic/react';
import { 
  languageOutline, 
  libraryOutline, 
  documentTextOutline,
  schoolOutline,
  playOutline,
  checkmarkCircleOutline,
  warningOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router';
import { testCategories } from '../data/questions';
import { progressManager } from '../utils/progressManager';

export const TestOverview = () => {
  const history = useHistory();
  const [testProgress, setTestProgress] = useState<Record<string, any>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    loadTestProgress();
  }, []);

  const loadTestProgress = () => {
    const progress: Record<string, any> = {};
    for (const category of testCategories) {
      progress[category.id] = progressManager.getTestProgress(category.id);
    }
    setTestProgress(progress);
  };

  const handleStartTest = (categoryId: string) => {
    const hasIncompleteTest = progressManager.hasIncompleteTest(categoryId);
    
    if (hasIncompleteTest) {
      setSelectedCategory(categoryId);
      setShowAlert(true);
    } else {
      startNewTest(categoryId);
    }
  };

  const startNewTest = (categoryId: string) => {
    progressManager.clearTestProgress(categoryId);
    history.push(`/test/${categoryId}`);
  };

  const resumeTest = (categoryId: string) => {
    history.push(`/test/${categoryId}`);
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'georgian':
        return languageOutline;
      case 'history':
        return libraryOutline;
      case 'law':
        return documentTextOutline;
      default:
        return schoolOutline;
    }
  };

  const getTestStatus = (categoryId: string) => {
    const progress = testProgress[categoryId];
    if (!progress) return 'Not Taken';
    if (progress.isCompleted) {
      return progress.score >= 7 ? 'Passed' : 'Failed';
    }
    return 'In Progress';
  };

  const getTestScore = (categoryId: string) => {
    const progress = testProgress[categoryId];
    if (!progress || !progress.isCompleted) return null;
    return progress.score;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar> 
          <IonTitle>🧪 Test Mode</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ padding: '4px' }}>
          <IonGrid style={{ padding: '0' }}>
            <IonRow>
              {testCategories.map((category) => {
                const status = getTestStatus(category.id);
                const score = getTestScore(category.id);
                const hasIncompleteTest = progressManager.hasIncompleteTest(category.id);
                
                return (
                  <IonCol size="12" sizeMd="4" key={category.id}>
                    <IonCard style={{ height: '100%', margin: '2px 0' }}>
                      <IonCardHeader style={{ padding: '8px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                          <IonIcon 
                            icon={getCategoryIcon(category.id)} 
                            style={{ fontSize: '28px', color: 'var(--ion-color-primary)' }}
                          />
                        </div>
                        <IonCardTitle style={{ textAlign: 'center', fontSize: '0.9em', margin: '0' }}>
                          {category.titleEnglish}
                        </IonCardTitle>
                        <IonCardSubtitle style={{ textAlign: 'center', margin: '2px 0 0 0', fontSize: '0.8em' }}>
                          {category.title}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent style={{ padding: '8px' }}>
                        {score !== null && (
                          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                            <IonText color="medium">
                              <p style={{ margin: '0', fontSize: '0.8em' }}><strong>Score: {score}/10</strong></p>
                            </IonText>
                          </div>
                        )}

                        {/* Status Badge */}
                        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                          <IonBadge 
                            color={
                              status === 'Passed' ? 'success' : 
                              status === 'Failed' ? 'danger' : 
                              status === 'In Progress' ? 'warning' : 'medium'
                            }
                            style={{ fontSize: '0.7em' }}
                          >
                            {status}
                          </IonBadge>
                        </div>

                        <IonButton 
                          expand="block"
                          size="small"
                          onClick={() => handleStartTest(category.id)}
                          color={
                            status === 'Passed' ? 'success' : 
                            status === 'In Progress' ? 'warning' : 'primary'
                          }
                        >
                          <IonIcon 
                            icon={
                              status === 'Passed' ? checkmarkCircleOutline : 
                              status === 'In Progress' ? warningOutline : playOutline
                            } 
                            slot="start" 
                          />
                          {status === 'Passed' ? 'Retake' : 
                           status === 'In Progress' ? 'Resume' : 'Start'}
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>

          {/* Test Tips 
          <IonCard style={{ marginTop: '24px' }}>
            <IonCardHeader>
              <IonCardTitle>💡 Test Tips</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <ul>
                  <li>Complete the Study mode first to prepare</li>
                  <li>Read each question carefully before answering</li>
                  <li>You can review and change answers before submitting</li>
                  <li>Take your time - there's no time limit</li>
                  <li>Aim for 7+ correct answers to pass</li>
                </ul>
              </IonText>
            </IonCardContent>
          </IonCard>
          */}
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Incomplete Test Found"
          message="You have an incomplete test for this category. Would you like to resume it or start a new one?"
          buttons={[
            {
              text: 'Resume Test',
              handler: () => {
                resumeTest(selectedCategory);
              }
            },
            {
              text: 'Start New Test',
              handler: () => {
                startNewTest(selectedCategory);
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};
