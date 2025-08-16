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
  IonSearchbar,
  IonModal,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { 
  chevronForwardOutline, 
  chevronBackOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  schoolOutline,
  informationCircleOutline,
  listOutline,
  searchOutline
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
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    const uniqueAnswered = newUserAnswers.filter(answer => answer !== undefined && answer !== null && answer !== '').length;
    
    // Save study progress
    progressManager.saveStudyProgress({
      categoryId,
      correctAnswers,
      totalAnswered: uniqueAnswered,
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
    const uniqueAnswered = userAnswers.filter(answer => answer !== undefined && answer !== null && answer !== '').length;
    
    // Save final progress
    progressManager.saveStudyProgress({
      categoryId,
      correctAnswers,
      totalAnswered: uniqueAnswered,
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

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShowQuestionList(false);
  };

  const filteredQuestions = questions.filter((question, index) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      question.stem.toLowerCase().includes(searchLower) ||
      question.options.some(option => option.text.toLowerCase().includes(searchLower)) ||
      `Question ${index + 1}`.toLowerCase().includes(searchLower)
    );
  });

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length;
  
  // Calculate scores from user answers array
  const correctAnswers = userAnswers.filter((answer, index) => 
    answer === questions[index]?.answer
  ).length;
  const uniqueAnswered = userAnswers.filter(answer => answer !== undefined && answer !== null && answer !== '').length;
  const accuracy = uniqueAnswered > 0 ? Math.round((correctAnswers / uniqueAnswered) * 100) : 0;
  
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
        <IonToolbar style={{ padding: '4px 0' }}>
          <IonProgressBar value={progress} />
          <div style={{ padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8em' }}>
            <IonText color="medium">
              {currentQuestionIndex + 1}/{questions.length}
            </IonText>
            <div style={{ display: 'flex', gap: '6px' }}>
              <IonBadge color="success" style={{ fontSize: '0.7em' }}>
                {correctAnswers}✓
              </IonBadge>
              <IonBadge color="medium" style={{ fontSize: '0.7em' }}>
                {accuracy}%
              </IonBadge>
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
                      style={{ paddingLeft: '8px', paddingRight: '8px' }}
                    >
                      <IonRadio value={option.id} slot="start" />
                      <IonLabel style={{ fontSize: '0.9em' }}>
                        <span style={{ fontWeight: 'bold', marginRight: '6px' }}>
                          {option.id}.
                        </span>
                        {option.text}
                      </IonLabel>
                      {showAnswer && isCorrect && (
                        <IonIcon 
                          icon={checkmarkCircleOutline} 
                          slot="end"
                          color="success"
                          style={{ fontSize: '16px' }}
                        />
                      )}
                      {showAnswer && isSelected && !isCorrect && (
                        <IonIcon 
                          icon={closeCircleOutline} 
                          slot="end"
                          color="danger"
                          style={{ fontSize: '16px' }}
                        />
                      )}
                    </IonItem>
                  );
                })}
              </IonRadioGroup>

              {!showAnswer && (
                <div style={{ marginTop: '8px' }}>
                  <IonButton 
                    expand="block"
                    fill="outline"
                    size="small"
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
                                 onClick={() => handleQuestionSelect(index)}
                                 onKeyDown={(e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                     handleQuestionSelect(index);
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
                      <strong>Questions Answered:</strong> {uniqueAnswered}<br />
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
                <strong>Progress:</strong> {correctAnswers} correct out of {uniqueAnswered} answered<br />
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

        {/* Floating Action Button for Question List */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton 
            size="small"
            onClick={() => setShowQuestionList(true)}
            color="primary"
          >
            <IonIcon icon={listOutline} />
          </IonFabButton>
        </IonFab>

        {/* Question List Modal */}
        <IonModal 
          isOpen={showQuestionList} 
          onDidDismiss={() => setShowQuestionList(false)}
          breakpoints={[0, 0.5, 0.8]}
          initialBreakpoint={0.8}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Question List</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowQuestionList(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar>
              <IonSearchbar
                value={searchTerm}
                onIonInput={e => setSearchTerm(e.detail.value || '')}
                placeholder="Search questions..."
                showClearButton="focus"
              />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {filteredQuestions.map((question, index) => {
                const isAnswered = userAnswers[index] && userAnswers[index] !== '';
                const isCorrect = userAnswers[index] === question.answer;
                const isCurrent = index === currentQuestionIndex;
                
                return (
                  <IonItem 
                    key={`list-${question.id}-${index}`}
                    button
                    onClick={() => handleQuestionSelect(index)}
                    color={isCurrent ? 'primary' : undefined}
                  >
                    <IonLabel>
                      <h3 style={{ 
                        fontSize: '0.9em', 
                        fontWeight: isCurrent ? 'bold' : 'normal',
                        color: isCurrent ? 'var(--ion-color-primary)' : undefined
                      }}>
                        Question {index + 1}
                      </h3>
                      <p style={{ 
                        fontSize: '0.8em', 
                        color: 'var(--ion-color-medium)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {question.stem}
                      </p>
                    </IonLabel>
                    <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isAnswered && (
                        <IonBadge 
                          color={isCorrect ? 'success' : 'danger'}
                          style={{ fontSize: '0.6em' }}
                        >
                          {isCorrect ? '✓' : '✗'}
                        </IonBadge>
                      )}
                      {isCurrent && (
                        <IonBadge color="primary" style={{ fontSize: '0.6em' }}>
                          Current
                        </IonBadge>
                      )}
                    </div>
                  </IonItem>
                );
              })}
            </IonList>
            {filteredQuestions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonText color="medium">
                  No questions found matching "{searchTerm}"
                </IonText>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
