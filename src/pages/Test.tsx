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
  IonProgressBar,
  IonText,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonAlert,
} from '@ionic/react';
import { 
  chevronForwardOutline, 
  chevronBackOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from 'ionicons/icons';
import { useParams, useHistory } from 'react-router';
import { 
  getRandomQuestions, 
  calculateScore, 
  isPassingScore, 
  testCategories,
  type Question 
} from '../data/questions';
import { progressManager, type TestProgress } from '../utils/progressManager';

export const Test = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const history = useHistory();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);

  useEffect(() => {
    if (categoryId) {
      // Check if there's saved progress
      const savedProgress = progressManager.getTestProgress(categoryId) as TestProgress;
      
      if (savedProgress && !savedProgress.completed) {
        // Restore saved progress
        setQuestions(getRandomQuestions(categoryId, 10)); // We'll need to store questions too
        setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
        setAnswers(savedProgress.answers);
        setSelectedAnswer(savedProgress.answers[savedProgress.currentQuestionIndex] !== '' ? savedProgress.answers[savedProgress.currentQuestionIndex] : null);
      } else {
        // Start new test
        const randomQuestions = getRandomQuestions(categoryId, 10);
        setQuestions(randomQuestions);
        setAnswers(new Array(randomQuestions.length).fill(''));
        
        // Save initial progress
        progressManager.saveTestProgress({
          categoryId,
          currentQuestionIndex: 0,
          answers: new Array(randomQuestions.length).fill(''),
          startTime: Date.now(),
          completed: false
        });
      }
    }
  }, [categoryId]);

  const category = testCategories.find(cat => cat.id === categoryId);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerId;
    setAnswers(newAnswers);
    
    // Save progress
    progressManager.saveTestProgress({
      categoryId,
      currentQuestionIndex,
      answers: newAnswers,
      startTime: Date.now(),
      completed: false
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(answers[nextIndex] !== '' ? answers[nextIndex] : null);
      
      // Save progress
      progressManager.saveTestProgress({
        categoryId,
        currentQuestionIndex: nextIndex,
        answers,
        startTime: Date.now(),
        completed: false
      });
    } else {
      // Test completed
      const score = calculateScore(answers, questions);
      const passed = isPassingScore(score);
      
      // Save result
      progressManager.saveTestResult({
        categoryId,
        score,
        totalQuestions: questions.length,
        passed,
        answers,
        completedAt: Date.now()
      });
      
      // Clear progress
      progressManager.clearTestProgress(categoryId);
      
      // Navigate to results page
      history.push('/results', {
        categoryId,
        score,
        totalQuestions: questions.length,
        passed,
        answers,
        questions
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setSelectedAnswer(answers[prevIndex] !== '' ? answers[prevIndex] : null);
      
      // Save progress
      progressManager.saveTestProgress({
        categoryId,
        currentQuestionIndex: prevIndex,
        answers,
        startTime: Date.now(),
        completed: false
      });
    }
  };

  const handleExit = () => {
    setShowExitAlert(true);
  };

  const confirmExit = () => {
    history.push('/');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length;
  const answeredCount = answers.filter(answer => answer !== '').length;

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
            <IonText>Loading test...</IonText>
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
          <IonTitle>{category.titleEnglish}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleExit}>Exit</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonProgressBar value={progress} />
          <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IonText color="medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </IonText>
            <IonText color="medium">
              {answeredCount}/{questions.length} answered
            </IonText>
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
                {currentQuestion.options.map((option, index) => (
                  <IonItem key={`option-${currentQuestion.id}-${index}`} lines="full">
                    <IonRadio value={option.id} slot="start" />
                    <IonLabel>{option.text}</IonLabel>
                  </IonItem>
                ))}
              </IonRadioGroup>
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
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next'}
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
                    : answers[index] !== '' 
                      ? 'var(--ion-color-success)' 
                      : 'var(--ion-color-medium)',
                  border: index === currentQuestionIndex ? '2px solid var(--ion-color-primary-shade)' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </IonContent>

      <IonAlert
        isOpen={showExitAlert}
        onDidDismiss={() => setShowExitAlert(false)}
        header="Exit Test?"
        message="Are you sure you want to exit? Your progress will be lost."
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Exit',
            role: 'destructive',
            handler: confirmExit,
          },
        ]}
      />
    </IonPage>
  );
};
