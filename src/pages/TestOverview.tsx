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
        <div style={{ padding: '16px' }}>
          <IonText color="medium">
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
              Choose a Category to Test
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '32px' }}>
              Take a 10-question test for each category. You need to score at least 7 out of 10 to pass.
            </p>
          </IonText>

          <IonGrid>
            <IonRow>
              {testCategories.map((category) => {
                const status = getTestStatus(category.id);
                const score = getTestScore(category.id);
                const hasIncompleteTest = progressManager.hasIncompleteTest(category.id);
                
                return (
                  <IonCol size="12" sizeMd="6" sizeLg="4" key={category.id}>
                    <IonCard style={{ height: '100%', margin: '8px 0' }}>
                      <IonCardHeader>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                          <IonIcon 
                            icon={getCategoryIcon(category.id)} 
                            style={{ fontSize: '48px', color: 'var(--ion-color-primary)' }}
                          />
                        </div>
                        <IonCardTitle style={{ textAlign: 'center', fontSize: '1.2em' }}>
                          {category.titleEnglish}
                        </IonCardTitle>
                        <IonCardSubtitle style={{ textAlign: 'center' }}>
                          {category.title}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                          <IonText color="medium">
                            <p>10 questions • 7+ to pass</p>
                            {score !== null && (
                              <p><strong>Last Score: {score}/10</strong></p>
                            )}
                          </IonText>
                        </div>

                        {/* Status Badge */}
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                          <IonBadge 
                            color={
                              status === 'Passed' ? 'success' : 
                              status === 'Failed' ? 'danger' : 
                              status === 'In Progress' ? 'warning' : 'medium'
                            }
                          >
                            {status}
                          </IonBadge>
                        </div>

                        <IonButton 
                          expand="block"
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
                          {status === 'Passed' ? 'Retake Test' : 
                           status === 'In Progress' ? 'Resume Test' : 'Start Test'}
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
