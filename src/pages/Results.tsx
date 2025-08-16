import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonList,
  IonBadge,
  IonChip,
} from '@ionic/react';
import { 
  checkmarkCircleOutline,
  closeCircleOutline,
  homeOutline,
  refreshOutline,
  eyeOutline,
  eyeOffOutline
} from 'ionicons/icons';
import { useLocation, useHistory } from 'react-router';
import { testCategories, type Question } from '../data/questions';

interface ResultsData {
  categoryId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  answers: number[];
  questions: Question[];
}

export const Results = () => {
  const location = useLocation<ResultsData>();
  const history = useHistory();
  const [showAnswers, setShowAnswers] = useState(false);

  // If no results data, redirect to home
  if (!location.state) {
    history.replace('/');
    return null;
  }

  const { categoryId, score, totalQuestions, passed, answers, questions } = location.state;
  const category = testCategories.find(cat => cat.id === categoryId);
  const percentage = Math.round((score / totalQuestions) * 100);

  const handleRetakeTest = () => {
    history.push(`/test/${categoryId}`);
  };

  const handleGoHome = () => {
    console.log('Back to Home button clicked'); // Debug log
    history.replace('/');
  };

  const getScoreColor = () => {
    if (passed) return 'success';
    return 'danger';
  };

  const getScoreIcon = () => {
    return passed ? checkmarkCircleOutline : closeCircleOutline;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Test Results</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ padding: '16px' }}>
          {/* Score Summary */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: 'center' }}>
                {category?.name}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <IonIcon 
                  icon={getScoreIcon()} 
                  style={{ 
                    fontSize: '64px', 
                    color: `var(--ion-color-${getScoreColor()})`,
                    marginBottom: '16px'
                  }}
                />
                <h2 style={{ 
                  color: `var(--ion-color-${getScoreColor()})`,
                  margin: '0 0 8px 0'
                }}>
                  {passed ? 'PASSED' : 'FAILED'}
                </h2>
                <IonText color="medium">
                  <p>You scored {score} out of {totalQuestions} ({percentage}%)</p>
                  <p>Minimum required: 7 out of 10 to pass</p>
                </IonText>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <IonText>Score:</IonText>
                <IonBadge color={getScoreColor()}>
                  {score}/{totalQuestions}
                </IonBadge>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <IonText>Percentage:</IonText>
                <IonBadge color={getScoreColor()}>
                  {percentage}%
                </IonBadge>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <IonText>Status:</IonText>
                <IonChip color={getScoreColor()}>
                  <IonIcon icon={getScoreIcon()} />
                  <IonLabel>{passed ? 'Passed' : 'Failed'}</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            marginTop: '24px'
          }}>
            <IonButton 
              expand="block"
              onClick={() => setShowAnswers(!showAnswers)}
            >
              <IonIcon icon={showAnswers ? eyeOffOutline : eyeOutline} slot="start" />
              {showAnswers ? 'Hide' : 'Show'} Answer Review
            </IonButton>

            <IonButton 
              expand="block"
              fill="outline"
              onClick={handleRetakeTest}
            >
              <IonIcon icon={refreshOutline} slot="start" />
              Retake Test
            </IonButton>

            <IonButton 
              expand="block"
              fill="outline"
              onClick={() => {
                console.log('Button clicked directly');
                handleGoHome();
              }}
            >
              <IonIcon icon={homeOutline} slot="start" />
              Back to Home
            </IonButton>
          </div>

          {/* Answer Review */}
          {showAnswers && (
            <IonCard style={{ marginTop: '24px' }}>
              <IonCardHeader>
                <IonCardTitle>Answer Review</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {questions.map((question, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === question.correctAnswer;
                    const userAnswerText = userAnswer !== -1 ? question.options[userAnswer] : 'Not answered';
                    const correctAnswerText = question.options[question.correctAnswer];

                    return (
                      <IonItem key={`question-${question.id}-${index}`} lines="full">
                        <div style={{ width: '100%' }}>
                          <IonText>
                            <h4 style={{ margin: '0 0 8px 0' }}>
                              Question {index + 1}
                            </h4>
                            <p style={{ margin: '0 0 12px 0' }}>
                              {question.question}
                            </p>
                          </IonText>

                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            marginBottom: '4px'
                          }}>
                            <IonIcon 
                              icon={isCorrect ? checkmarkCircleOutline : closeCircleOutline}
                              style={{ 
                                color: isCorrect ? 'var(--ion-color-success)' : 'var(--ion-color-danger)',
                                fontSize: '16px'
                              }}
                            />
                            <IonText color="medium">
                              Your answer: {userAnswerText}
                            </IonText>
                          </div>

                          {!isCorrect && (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px',
                              marginBottom: '8px'
                            }}>
                              <IonIcon 
                                icon={checkmarkCircleOutline}
                                style={{ 
                                  color: 'var(--ion-color-success)',
                                  fontSize: '16px'
                                }}
                              />
                              <IonText color="success">
                                Correct answer: {correctAnswerText}
                              </IonText>
                            </div>
                          )}

                          {question.explanation && (
                            <div style={{ 
                              backgroundColor: 'var(--ion-color-light)',
                              padding: '8px',
                              borderRadius: '4px',
                              marginTop: '8px'
                            }}>
                              <IonText color="medium" style={{ fontSize: '14px' }}>
                                <strong>Explanation:</strong> {question.explanation}
                              </IonText>
                            </div>
                          )}
                        </div>
                      </IonItem>
                    );
                  })}
                </IonList>
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
