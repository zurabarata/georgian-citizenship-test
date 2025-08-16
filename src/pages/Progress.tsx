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
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { 
  trophyOutline, 
  checkmarkCircleOutline, 
  timeOutline,
  statsChartOutline,
  refreshOutline
} from 'ionicons/icons';
import { testCategories } from '../data/questions';
import { progressManager } from '../utils/progressManager';

export const Progress = () => {
  const [userStats, setUserStats] = useState(progressManager.getUserStats());
  const [categoryStats, setCategoryStats] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const stats = progressManager.getUserStats();
    setUserStats(stats);

    const categoryData = testCategories.map(category => {
      const testProgress = progressManager.getTestProgress(category.id);
      const studyProgress = progressManager.getStudyProgress(category.id);
      const testResult = progressManager.getLastTestResult(category.id);
      
      return {
        id: category.id,
        title: category.titleEnglish,
        titleGeorgian: category.title,
        testProgress,
        testResult,
        studyProgress,
        questionsCount: category.questions.length
      };
    });
    
    setCategoryStats(categoryData);
  };

  const handleClearAllProgress = () => {
    testCategories.forEach(category => {
      progressManager.clearTestProgress(category.id);
      progressManager.saveStudyProgress({
        categoryId: category.id,
        correctAnswers: 0,
        totalAnswered: 0,
        lastQuestionIndex: 0
      });
    });
    loadStats();
  };

  const getOverallProgress = () => {
    const totalTests = testCategories.length;
    const completedTests = userStats.totalTestsTaken;
    return totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;
  };

  const getAverageScore = () => {
    return Math.round(userStats.averageScore);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>📊 Progress & Statistics</IonTitle>
          <IonButton 
            slot="end" 
            fill="clear" 
            onClick={loadStats}
          >
            <IonIcon icon={refreshOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ padding: '16px' }}>
          {/* Overall Statistics */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: 'center' }}>
                🏆 Overall Progress
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <div style={{ textAlign: 'center' }}>
                      <IonText color="primary">
                        <h2>{getOverallProgress()}%</h2>
                        <p>Overall Progress</p>
                      </IonText>
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <div style={{ textAlign: 'center' }}>
                      <IonText color="success">
                        <h2>{getAverageScore()}%</h2>
                        <p>Average Score</p>
                      </IonText>
                    </div>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12">
                    <div style={{ textAlign: 'center' }}>
                      <IonText color="medium">
                        <p>
                          <strong>Tests Completed:</strong> {userStats.totalTestsTaken} / {testCategories.length}
                        </p>
                      </IonText>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonProgressBar 
                value={getOverallProgress() / 100} 
                color="primary"
                style={{ marginTop: '16px' }}
              />
            </IonCardContent>
          </IonCard>

          {/* Category Progress */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>📚 Category Progress</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {categoryStats.map((category) => (
                  <IonItem key={category.id} lines="full">
                    <IonLabel>
                      <h3>{category.title}</h3>
                      <p>{category.titleGeorgian}</p>
                      <div style={{ marginTop: '8px' }}>
                        {category.testResult ? (
                          <IonBadge color={category.testResult.passed ? "success" : "danger"}>
                            Test: {category.testResult.score}/10
                          </IonBadge>
                        ) : (
                          <IonBadge color="medium">
                            Test: Not taken
                          </IonBadge>
                        )}
                        {category.studyProgress && (
                          <IonBadge color="primary" style={{ marginLeft: '8px' }}>
                            Study: {category.studyProgress.correctAnswers}/{category.studyProgress.totalAnswered}
                          </IonBadge>
                        )}
                      </div>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Recent Activity */}
          {userStats.totalTestsTaken > 0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>⏰ Recent Activity</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {categoryStats
                    .filter(category => category.testResult)
                    .slice(0, 5)
                    .map((category) => (
                      <IonItem key={category.id} lines="full">
                        <IonIcon 
                          icon={category.testResult.passed ? checkmarkCircleOutline : timeOutline} 
                          slot="start" 
                          color={category.testResult.passed ? "success" : "warning"} 
                        />
                        <IonLabel>
                          <h3>{category.title}</h3>
                          <p>Score: {category.testResult.score}/10 - {category.testResult.passed ? 'Passed' : 'Failed'}</p>
                          <p style={{ fontSize: '0.8em', color: 'var(--ion-color-medium)' }}>
                            {new Date(category.testResult.completedAt).toLocaleDateString()}
                          </p>
                        </IonLabel>
                      </IonItem>
                    ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          )}

          {/* Actions */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>⚙️ Actions</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton 
                expand="block" 
                fill="outline" 
                color="warning"
                onClick={handleClearAllProgress}
              >
                <IonIcon icon={refreshOutline} slot="start" />
                Clear All Progress
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};
