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
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (categoryId) {
      const category = testCategories.find(cat => cat.id === categoryId);
      if (category) {
        setQuestions(category.questions);
        
        // Load saved study progress
        const savedProgress = progressManager.getStudyProgress(categoryId) as StudyProgress;
        if (savedProgress) {
          setUserAnswers(savedProgress.answers || []);
          setCurrentQuestionIndex(savedProgress.lastQuestionIndex);
          
          // Set selected answer if the current question was already answered
          if (savedProgress.answers?.[savedProgress.lastQuestionIndex]) {
            setSelectedAnswer(savedProgress.answers[savedProgress.lastQuestionIndex]);
            setShowAnswer(true);
          }
        }
      }
    }
  }, [categoryId]);

  const category = testCategories.find(cat => cat.id === categoryId);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowAnswer(true);
    
    // Update user answers array
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerId;
    setUserAnswers(newUserAnswers);
    
    // Calculate correct answers and total answered from the answers array
    const correctAnswers = newUserAnswers.filter((answer, index) => 
      answer === questions[index]?.answer
    ).length;
    const totalAnswered = newUserAnswers.filter(answer => answer !== undefined && answer !== null).length;
    
    // Save study progress
    progressManager.saveStudyProgress({
      categoryId,
      correctAnswers,
      totalAnswered,
      lastQuestionIndex: currentQuestionIndex,
      answers: newUserAnswers
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handleCompleteStudy = () => {
    // Calculate final scores from user answers
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === questions[index]?.answer
    ).length;
    const totalAnswered = userAnswers.filter(answer => answer !== undefined && answer !== null).length;
    
    // Save final progress
    progressManager.saveStudyProgress({
      categoryId,
      correctAnswers,
      totalAnswered,
      lastQuestionIndex: questions.length - 1,
      answers: userAnswers
    });
    
    // Navigate to home
    window.location.href = '/';
  };

  const handleStartTest = () => {
    // Clear any existing test progress for this category
    progressManager.clearTestProgress(categoryId);
    // Navigate to test
    window.location.href = `/test/${categoryId}`;
  };

  const handleRestartStudy = () => {
    // Reset study progress
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setUserAnswers([]);
    
    // Clear saved progress
    progressManager.saveStudyProgress({
      categoryId,
      correctAnswers: 0,
      totalAnswered: 0,
      lastQuestionIndex: 0,
      answers: []
    });
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
  
  // Calculate scores from user answers array
  const correctAnswers = userAnswers.filter((answer, index) => 
    answer === questions[index]?.answer
  ).length;
  const totalAnswered = userAnswers.filter(answer => answer !== undefined && answer !== null).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
  
  const isCompleted = currentQuestionIndex === questions.length - 1 && showAnswer;

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
          <IonTitle>Study Mode - {category.titleEnglish}</IonTitle>
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
              {currentQuestion.stem}
            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRadioGroup 
                value={selectedAnswer} 
                onIonChange={e => handleAnswerSelect(e.detail.value)}
              >
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrect = option.id === currentQuestion.answer;
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
                      <IonRadio value={option.id} slot="start" />
                      <IonLabel>
                        <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
                          {option.id}.
                        </span>
                        {option.text}
                      </IonLabel>
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
              {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
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

          {/* Completion Screen */}
          {isCompleted && (
            <IonCard style={{ marginTop: '24px' }}>
              <IonCardHeader>
                <IonCardTitle style={{ textAlign: 'center' }}>
                  🎉 Study Session Complete!
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <IonText>
                    <h3>Your Study Results:</h3>
                    <p>
                      <strong>Total Questions:</strong> {questions.length}<br />
                      <strong>Questions Answered:</strong> {totalAnswered}<br />
                      <strong>Correct Answers:</strong> {correctAnswers}<br />
                      <strong>Accuracy:</strong> {accuracy}%
                    </p>
                  </IonText>
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px'
                }}>
                  <IonButton 
                    expand="block"
                    onClick={handleStartTest}
                    color="success"
                  >
                    🧪 Take the Actual Test
                  </IonButton>

                  <IonButton 
                    expand="block"
                    fill="outline"
                    onClick={handleRestartStudy}
                  >
                    🔄 Restart Study Session
                  </IonButton>

                  <IonButton 
                    expand="block"
                    fill="outline"
                    onClick={handleCompleteStudy}
                  >
                    🏠 Back to Home
                  </IonButton>
                </div>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <IonText color="medium">
                    <p>
                      <strong>Ready for the test?</strong><br />
                      You need to answer at least 7 out of 10 questions correctly to pass.
                    </p>
                  </IonText>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <IonText color="medium">
              <p>
                <strong>Study Mode:</strong> Practice with all {questions.length} questions<br />
                <strong>Progress:</strong> {correctAnswers} correct out of {totalAnswered} answered<br />
                <strong>Accuracy:</strong> {accuracy}%
              </p>
              {questions.length < 200 && (
                <p style={{ fontSize: '0.9em', marginTop: '8px' }}>
                  <em>Note: Currently showing {questions.length} sample questions. Add more questions to reach the full 200.</em>
                </p>
              )}
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
