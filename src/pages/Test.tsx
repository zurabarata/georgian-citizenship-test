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
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (categoryId) {
      // Check if there's saved progress
      const savedProgress = progressManager.getTestProgress(categoryId) as TestProgress;
      
      if (savedProgress && !savedProgress.completed) {
        // Restore saved progress
        if (savedProgress.questions) {
          // Use the saved questions to maintain consistency
          setQuestions(savedProgress.questions);
        } else {
          // Fallback to generating new questions (for backward compatibility)
          const randomQuestions = getRandomQuestions(categoryId, 10);
          setQuestions(randomQuestions);
        }
        setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
        setAnswers(savedProgress.answers);
        setSelectedAnswer(savedProgress.answers[savedProgress.currentQuestionIndex] !== '' ? savedProgress.answers[savedProgress.currentQuestionIndex] : null);
        
        // Restore timer - ensure we have a valid start time
        const originalStartTime = savedProgress.startTime || Date.now();
        const elapsedTime = Math.floor((Date.now() - originalStartTime) / 1000);
        const remainingTime = Math.max(0, 15 * 60 - elapsedTime);
        
        // If time has expired, auto-submit the test
        if (remainingTime <= 0) {
          // Time has expired, submit the test automatically
          const score = calculateScore(savedProgress.answers, savedProgress.questions || []);
          const passed = isPassingScore(score);
          
          // Save result
          progressManager.saveTestResult({
            categoryId,
            score,
            totalQuestions: savedProgress.questions?.length || 10,
            passed,
            answers: savedProgress.answers,
            completedAt: Date.now()
          });
          
          // Clear progress
          progressManager.clearTestProgress(categoryId);
          
          // Navigate to results page
          history.push('/results', {
            categoryId,
            score,
            totalQuestions: savedProgress.questions?.length || 10,
            passed,
            answers: savedProgress.answers,
            questions: savedProgress.questions || [],
            timeUp: true
          });
          return;
        }
        
        setTimeLeft(remainingTime);
        setStartTime(originalStartTime);
      } else {
        // Start new test
        const randomQuestions = getRandomQuestions(categoryId, 10);
        setQuestions(randomQuestions);
        setAnswers(new Array(randomQuestions.length).fill(''));
        const now = Date.now();
        setStartTime(now);
        
        // Save initial progress
        progressManager.saveTestProgress({
          categoryId,
          currentQuestionIndex: 0,
          answers: new Array(randomQuestions.length).fill(''),
          startTime: now,
          completed: false,
          questions: randomQuestions
        });
      }
    }
  }, [categoryId, history]);

  // Timer effect
  useEffect(() => {
    if (startTime && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            // Time's up! Auto-submit the test
            handleTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, timeLeft]);

  const handleTimeUp = () => {
    // Auto-submit the test when time runs out
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
      questions,
      timeUp: true
    });
  };

  const category = testCategories.find(cat => cat.id === categoryId);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerId;
    setAnswers(newAnswers);
    
    // Save progress - preserve the original start time
    progressManager.saveTestProgress({
      categoryId,
      currentQuestionIndex,
      answers: newAnswers,
      startTime: startTime || Date.now(),
      completed: false,
      questions: questions
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(answers[nextIndex] !== '' ? answers[nextIndex] : null);
      
      // Save progress - preserve the original start time
      progressManager.saveTestProgress({
        categoryId,
        currentQuestionIndex: nextIndex,
        answers,
        startTime: startTime || Date.now(),
        completed: false,
        questions: questions
      });
    } else {
      // Test completed
      const score = calculateScore(answers, questions);
      const passed = isPassingScore(score);
      
      progressManager.saveTestResult({
        categoryId,
        score,
        totalQuestions: questions.length,
        passed,
        answers,
        completedAt: Date.now()
      });
      
      progressManager.clearTestProgress(categoryId);
      
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
      
      // Save progress - preserve the original start time
      progressManager.saveTestProgress({
        categoryId,
        currentQuestionIndex: prevIndex,
        answers,
        startTime: startTime || Date.now(),
        completed: false,
        questions: questions
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
        <IonToolbar style={{ padding: '4px 0' }}>
          <IonProgressBar value={progress} />
          <div style={{ padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8em' }}>
            <IonText color="medium">
              {currentQuestionIndex + 1}/{questions.length}
            </IonText>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IonText color="medium">
                {answeredCount}/{questions.length}
              </IonText>
              <IonText 
                color={timeLeft <= 60 ? 'danger' : timeLeft <= 300 ? 'warning' : 'medium'}
                style={{ 
                  fontWeight: 'bold',
                  fontSize: '0.9em',
                  minWidth: '50px',
                  textAlign: 'center'
                }}
              >
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </IonText>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ padding: '8px' }}>
          <IonCard style={{ margin: '0' }}>
            <IonCardHeader style={{ padding: '12px' }}>
              <IonCardTitle style={{ fontSize: '1em', lineHeight: '1.3', margin: '0' }}>
                {currentQuestion.stem}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{ padding: '8px' }}>
              <IonRadioGroup 
                value={selectedAnswer} 
                onIonChange={e => handleAnswerSelect(e.detail.value)}
              >
                {currentQuestion.options.map((option, index) => (
                  <IonItem key={`option-${currentQuestion.id}-${index}`} lines="full" style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                    <IonRadio value={option.id} slot="start" />
                    <IonLabel style={{ fontSize: '0.9em' }}>
                      <span style={{ fontWeight: 'bold', marginRight: '6px' }}>
                        {option.id}.
                      </span>
                      {option.text}
                    </IonLabel>
                  </IonItem>
                ))}
              </IonRadioGroup>
            </IonCardContent>
          </IonCard>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '12px',
            padding: '0 8px'
          }}>
            <IonButton 
              fill="outline" 
              size="small"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <IonIcon icon={chevronBackOutline} slot="start" />
              Prev
            </IonButton>

            <IonButton 
              size="small"
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonButton>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '8px',
            gap: '6px'
          }}>
            {questions.map((question, index) => (
              <div
                key={`question-${question.id}-${index}`}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: index === currentQuestionIndex 
                    ? 'var(--ion-color-primary)' 
                    : answers[index] !== '' 
                      ? 'var(--ion-color-success)' 
                      : 'var(--ion-color-medium)',
                  border: index === currentQuestionIndex ? '1px solid var(--ion-color-primary-shade)' : 'none'
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
