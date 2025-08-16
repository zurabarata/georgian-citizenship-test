import React, { useState, useEffect } from 'react';
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
  IonRadio,
  IonRadioGroup,
  IonText,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonProgressBar,
  IonBadge,
  IonChip,
  IonList,
} from '@ionic/react';
import { 
  chevronForwardOutline, 
  chevronBackOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  schoolOutline,
  informationCircleOutline
} from 'ionicons/icons';
import { useParams, useHistory } from 'react-router';
import { testCategories, type Question } from '../data/questions';
import { progressManager, type StudyProgress } from '../utils/progressManager';

export const Study = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const history = useHistory();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  useEffect(() => {
    if (categoryId) {
      const category = testCategories.find(cat => cat.id === categoryId);
      if (category) {
        setQuestions(category.questions);
        
        // Load saved study progress
        const savedProgress = progressManager.getStudyProgress(categoryId) as StudyProgress;
        if (savedProgress) {
          setCorrectAnswers(savedProgress.correctAnswers);
          setTotalAnswered(savedProgress.totalAnswered);
          setCurrentQuestionIndex(savedProgress.lastQuestionIndex);
        }
      }
    }
  }, [categoryId]);

  const category = testCategories.find(cat => cat.id === categoryId);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    const newCorrectAnswers = answerIndex === currentQuestion.correctAnswer ? correctAnswers + 1 : correctAnswers;
    const newTotalAnswered = totalAnswered + 1;
    
    setCorrectAnswers(newCorrectAnswers);
    setTotalAnswered(newTotalAnswered);
    
    // Save study progress
    progressManager.saveStudyProgress({
      categoryId,
      correctAnswers: newCorrectAnswers,
      totalAnswered: newTotalAnswered,
      lastQuestionIndex: currentQuestionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length;
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  if (!currentQuestion || !category) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonText>Loading study mode...</IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Study Mode - {category.name}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonProgressBar value={progress} />
          <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IonText color="medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </IonText>
            <div style={{ display: 'flex', gap: '8px' }}>
              <IonBadge color="success">
                {correctAnswers} correct
              </IonBadge>
              <IonBadge color="medium">
                {accuracy}% accuracy
              </IonBadge>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ padding: '16px' }}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {currentQuestion.question}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRadioGroup 
                value={selectedAnswer} 
                onIonChange={e => handleAnswerSelect(e.detail.value)}
              >
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  let itemColor = '';
                  
                  if (showAnswer) {
                    if (isCorrect) {
                      itemColor = 'success';
                    } else if (isSelected && !isCorrect) {
                      itemColor = 'danger';
                    }
                  }

                  return (
                    <IonItem 
                      key={`option-${currentQuestion.id}-${index}`} 
                      lines="full"
                      color={itemColor}
                    >
                      <IonRadio value={index} slot="start" />
                      <IonLabel>{option}</IonLabel>
                      {showAnswer && isCorrect && (
                        <IonIcon 
                          icon={checkmarkCircleOutline} 
                          slot="end"
                          color="success"
                        />
                      )}
                      {showAnswer && isSelected && !isCorrect && (
                        <IonIcon 
                          icon={closeCircleOutline} 
                          slot="end"
                          color="danger"
                        />
                      )}
                    </IonItem>
                  );
                })}
              </IonRadioGroup>

              {!showAnswer && (
                <div style={{ marginTop: '16px' }}>
                  <IonButton 
                    expand="block"
                    fill="outline"
                    onClick={handleShowAnswer}
                  >
                    <IonIcon icon={informationCircleOutline} slot="start" />
                    Show Answer
                  </IonButton>
                </div>
              )}

              {showAnswer && currentQuestion.explanation && (
                <div style={{ 
                  backgroundColor: 'var(--ion-color-light)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginTop: '16px'
                }}>
                  <IonText color="medium">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </IonText>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '24px',
            padding: '0 16px'
          }}>
            <IonButton 
              fill="outline" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <IonIcon icon={chevronBackOutline} slot="start" />
              Previous
            </IonButton>

            <IonButton 
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonButton>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '16px',
            gap: '8px'
          }}>
            {questions.map((question, index) => (
              <div
                key={`question-${question.id}-${index}`}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: index === currentQuestionIndex 
                    ? 'var(--ion-color-primary)' 
                    : 'var(--ion-color-medium)',
                  border: index === currentQuestionIndex ? '2px solid var(--ion-color-primary-shade)' : 'none',
                  cursor: 'pointer'
                }}
                                 onClick={() => {
                   setCurrentQuestionIndex(index);
                   setSelectedAnswer(null);
                   setShowAnswer(false);
                 }}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                     setCurrentQuestionIndex(index);
                     setSelectedAnswer(null);
                     setShowAnswer(false);
                   }
                 }}
                 role="button"
                 tabIndex={0}
              />
            ))}
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <IonText color="medium">
              <p>
                <strong>Study Mode:</strong> Practice with all questions<br />
                <strong>Progress:</strong> {correctAnswers} correct out of {totalAnswered} answered<br />
                <strong>Accuracy:</strong> {accuracy}%
              </p>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
