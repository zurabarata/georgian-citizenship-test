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
  IonProgressBar,
} from '@ionic/react';
import { 
  languageOutline, 
  libraryOutline, 
  documentTextOutline,
  schoolOutline,
  playOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router';
import { testCategories } from '../data/questions';
import { progressManager } from '../utils/progressManager';

export const StudyOverview = () => {
  const history = useHistory();
  const [studyProgress, setStudyProgress] = useState<any>({});

  useEffect(() => {
    loadStudyProgress();
  }, []);

  const loadStudyProgress = () => {
    const progress: any = {};
    testCategories.forEach(category => {
      progress[category.id] = progressManager.getStudyProgress(category.id);
    });
    setStudyProgress(progress);
  };

  const handleStartStudy = (categoryId: string) => {
    history.push(`/study/${categoryId}`);
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

  const getStudyProgress = (categoryId: string) => {
    const progress = studyProgress[categoryId];
    if (!progress || progress.totalAnswered === 0) return 0;
    return Math.round((progress.correctAnswers / progress.totalAnswered) * 100);
  };

  const getStudyStatus = (categoryId: string) => {
    const progress = studyProgress[categoryId];
    if (!progress || progress.totalAnswered === 0) return 'Not Started';
    const category = testCategories.find(c => c.id === categoryId);
    if (category && progress.totalAnswered >= category.questions.length) {
      return 'Completed';
    }
    return 'In Progress';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>📚 Study Mode</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ padding: '16px' }}>
          <IonText color="medium">
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
              Choose a Category to Study
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '32px' }}>
              Practice with all questions in each category. See correct answers and explanations to improve your knowledge.
            </p>
          </IonText>

          <IonGrid>
            <IonRow>
              {testCategories.map((category) => {
                const progress = getStudyProgress(category.id);
                const status = getStudyStatus(category.id);
                
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
                            <p>{category.description}</p>
                            <p><strong>{category.questions.length} questions available</strong></p>
                          </IonText>
                        </div>

                        {/* Progress Display */}
                        {studyProgress[category.id] && studyProgress[category.id].totalAnswered > 0 && (
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <IonText color="medium">Progress</IonText>
                              <IonText color="primary">{progress}%</IonText>
                            </div>
                            <IonProgressBar value={progress / 100} color="primary" />
                            <div style={{ marginTop: '8px', textAlign: 'center' }}>
                              <IonBadge color="primary">
                                {studyProgress[category.id].correctAnswers} / {studyProgress[category.id].totalAnswered} correct
                              </IonBadge>
                            </div>
                          </div>
                        )}

                        {/* Status Badge */}
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                          <IonBadge 
                            color={status === 'Completed' ? 'success' : status === 'In Progress' ? 'primary' : 'medium'}
                          >
                            {status}
                          </IonBadge>
                        </div>

                        <IonButton 
                          expand="block"
                          onClick={() => handleStartStudy(category.id)}
                          color={status === 'Completed' ? 'success' : 'primary'}
                        >
                          <IonIcon icon={status === 'Completed' ? checkmarkCircleOutline : playOutline} slot="start" />
                          {status === 'Completed' ? 'Review Again' : 'Start Studying'}
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>

          {/* Study Tips
          <IonCard style={{ marginTop: '24px' }}>
            <IonCardHeader>
              <IonCardTitle>💡 Study Tips</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <ul>
                  <li>Start with the category you're least familiar with</li>
                  <li>Take your time to read explanations for wrong answers</li>
                  <li>Review completed categories regularly to reinforce learning</li>
                  <li>Use the Progress tab to track your improvement</li>
                </ul>
              </IonText>
            </IonCardContent>
          </IonCard>
           */}
        </div>
      </IonContent>
    </IonPage>
  );
};
