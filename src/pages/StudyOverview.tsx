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
import { progressManager, type StudyProgress } from '../utils/progressManager';

type CategoryId = 'georgian' | 'history' | 'law';

export const StudyOverview = () => {
  const history = useHistory();
  const [studyProgress, setStudyProgress] = useState<Record<CategoryId, StudyProgress | null>>({
    georgian: null,
    history: null,
    law: null
  });

  useEffect(() => {
    loadStudyProgress();
  }, []);

  const loadStudyProgress = () => {
    const progress: Record<CategoryId, StudyProgress | null> = {
      georgian: null,
      history: null,
      law: null
    };
    for (const category of testCategories) {
      progress[category.id as CategoryId] = progressManager.getStudyProgress(category.id) as StudyProgress | null;
    }
    setStudyProgress(progress);
  };

  const handleStartStudy = (categoryId: CategoryId) => {
    history.push(`/study/${categoryId}`);
  };

  const getCategoryIcon = (categoryId: CategoryId) => {
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

  const getStudyProgress = (categoryId: CategoryId) => {
    const progress = studyProgress[categoryId];
    if (!progress || !progress.answers) return 0;
    
    // Calculate unique questions answered (non-empty answers)
    const uniqueAnswered = progress.answers.filter((answer: string) => answer !== undefined && answer !== null && answer !== '').length;
    const category = testCategories.find(c => c.id === categoryId);
    if (!category) return 0;
    
    return Math.round((uniqueAnswered / category.questions.length) * 100);
  };

  const getStudyStatus = (categoryId: CategoryId) => {
    const progress = studyProgress[categoryId];
    if (!progress || !progress.answers) return 'Not Started';
    
    const category = testCategories.find(c => c.id === categoryId);
    if (!category) return 'Not Started';
    
    // Calculate unique questions answered
    const uniqueAnswered = progress.answers.filter((answer: string) => answer !== undefined && answer !== null && answer !== '').length;
    
    if (uniqueAnswered >= category.questions.length) {
      return 'Completed';
    }
    if (uniqueAnswered > 0) {
      return 'In Progress';
    }
    return 'Not Started';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>📚 Study Mode</IonTitle>
        </IonToolbar>
      </IonHeader> 

      <IonContent fullscreen>
        <div style={{ padding: '4px' }}>
          <IonGrid style={{ padding: '0' }}>
            <IonRow>
              {testCategories.map((category) => {
                const progress = getStudyProgress(category.id as CategoryId);
                const status = getStudyStatus(category.id as CategoryId);
                
                return (
                  <IonCol size="12" sizeMd="4" key={category.id}>
                    <IonCard style={{ height: '100%', margin: '2px 0' }}>
                      <IonCardHeader style={{ padding: '8px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                          <IonIcon 
                            icon={getCategoryIcon(category.id as CategoryId)} 
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
                        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                          <IonText color="medium">
                            <p style={{ margin: '0', fontSize: '0.8em' }}><strong>{category.questions.length} questions</strong></p>
                          </IonText>
                        </div>

                        {/* Progress Display */}
                        {studyProgress[category.id as CategoryId]?.answers && (() => {
                          const progress = studyProgress[category.id as CategoryId];
                          if (!progress) return null;
                          
                          const uniqueAnswered = progress.answers.filter((answer: string) => answer !== undefined && answer !== null && answer !== '').length;
                          const correctAnswers = progress.answers.filter((answer: string, index: number) => answer === category.questions[index]?.answer).length;
                          return uniqueAnswered > 0 ? (
                              <div style={{ marginBottom: '6px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                  <IonText color="medium" style={{ fontSize: '0.7em' }}>Progress</IonText>
                                  <IonText color="primary" style={{ fontSize: '0.7em' }}>{Math.round((uniqueAnswered / category.questions.length) * 100)}%</IonText>
                                </div>
                                <IonProgressBar value={uniqueAnswered / category.questions.length} color="primary" />
                                <div style={{ marginTop: '2px', textAlign: 'center' }}>
                                  <IonBadge color="primary" style={{ fontSize: '0.6em' }}>
                                    {uniqueAnswered}/{category.questions.length}
                                  </IonBadge>
                                </div>
                                <div style={{ marginTop: '1px', textAlign: 'center' }}>
                                  <IonBadge color="success" style={{ fontSize: '0.6em' }}>
                                    {correctAnswers} correct 
                                  </IonBadge>
                                </div>
                              </div>
                            ) : null;
                          })()
                        }

                        {/* Status Badge */}
                        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                          <IonBadge 
                            color={status === 'Completed' ? 'success' : status === 'In Progress' ? 'primary' : 'medium'}
                            style={{ fontSize: '0.7em' }}
                          >
                            {status}
                          </IonBadge>
                        </div>

                        <IonButton 
                          expand="block"
                          size="small"
                          onClick={() => handleStartStudy(category.id as CategoryId)}
                          color={status === 'Completed' ? 'success' : 'primary'}
                        >
                          <IonIcon icon={status === 'Completed' ? checkmarkCircleOutline : playOutline} slot="start" />
                          {status === 'Completed' ? 'Review' : 'Start'}
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
