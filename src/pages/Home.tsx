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
} from '@ionic/react';
import { 
  languageOutline, 
  libraryOutline, 
  documentTextOutline,
  playOutline,
  schoolOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router';
import { testCategories } from '../data/questions';
import { progressManager } from '../utils/progressManager';
import { useState, useEffect } from 'react';

export const Home = () => {
  const history = useHistory();
  const [incompleteTests, setIncompleteTests] = useState<string[]>([]);
  const [userStats, setUserStats] = useState(progressManager.getUserStats());

  useEffect(() => {
    // Check for incomplete tests
    const incomplete = testCategories
      .filter(category => progressManager.hasIncompleteTest(category.id))
      .map(category => category.id);
    setIncompleteTests(incomplete);
  }, []);

  const handleStartTest = (categoryId: string) => {
    history.push(`/test/${categoryId}`);
  };

  const handleStudyMode = (categoryId: string) => {
    history.push(`/study/${categoryId}`);
  };

  const handleResumeTest = (categoryId: string) => {
    history.push(`/test/${categoryId}`);
  };

  const handleClearProgress = (categoryId: string) => {
    progressManager.clearTestProgress(categoryId);
    setIncompleteTests(prev => prev.filter(id => id !== categoryId));
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🏠 Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: '16px' }}>
          <IonText color="medium">
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
              Welcome to the Georgian Citizenship Test Preparation App
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '32px' }}>
              Prepare for your citizenship test with three categories. You need to score at least 7 out of 10 to pass each test.
            </p>
          </IonText>

          <IonGrid>
            <IonRow>
              {testCategories.map((category) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={category.id}>
                  <IonCard style={{ height: '100%', margin: '8px 0' }}>
                    <IonCardHeader>
                      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <IonIcon 
                          icon={getCategoryIcon(category.id)} 
                          style={{ fontSize: '48px', color: 'var(--ion-color-primary)' }}
                        />
                      </div>
                      <IonCardTitle style={{ textAlign: 'center' }}>
                        {category.titleEnglish}
                      </IonCardTitle>
                      <IonCardSubtitle style={{ textAlign: 'center', marginTop: '8px' }}>
                        {category.title}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText color="medium">
                        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                          {category.description}
                        </p>
                      </IonText>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <IonButton 
                          expand="block" 
                          onClick={() => handleStartTest(category.id)}
                          style={{ marginBottom: '8px' }}
                        >
                          <IonIcon icon={playOutline} slot="start" />
                          Start Test
                        </IonButton>
                        <IonButton 
                          expand="block" 
                          fill="outline"
                          onClick={() => handleStudyMode(category.id)}
                        >
                          <IonIcon icon={schoolOutline} slot="start" />
                          Study Mode
                        </IonButton>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          {/* Incomplete Tests */}
          {incompleteTests.length > 0 && (
            <IonCard style={{ marginTop: '24px' }}>
              <IonCardHeader>
                <IonCardTitle>Resume Incomplete Tests</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {incompleteTests.map(categoryId => {
                  const category = testCategories.find(cat => cat.id === categoryId);
                  return (
                    <div key={categoryId} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '12px',
                      padding: '8px',
                      backgroundColor: 'var(--ion-color-light)',
                      borderRadius: '8px'
                    }}>
                      <IonText>{category?.titleEnglish}</IonText>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <IonButton 
                          size="small"
                          onClick={() => handleResumeTest(categoryId)}
                        >
                          Resume
                        </IonButton>
                        <IonButton 
                          size="small"
                          fill="outline"
                          color="danger"
                          onClick={() => handleClearProgress(categoryId)}
                        >
                          Clear
                        </IonButton>
                      </div>
                    </div>
                  );
                })}
              </IonCardContent>
            </IonCard>
          )}

          {/* User Statistics */}
          {userStats.totalTestsTaken > 0 && (
            <IonCard style={{ marginTop: '24px' }}>
              <IonCardHeader>
                <IonCardTitle>Your Progress</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <IonText color="medium">Tests Taken</IonText>
                    <h3 style={{ margin: '8px 0' }}>{userStats.totalTestsTaken}</h3>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <IonText color="medium">Passed</IonText>
                    <h3 style={{ margin: '8px 0', color: 'var(--ion-color-success)' }}>
                      {userStats.totalPassed}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <IonText color="medium">Average Score</IonText>
                    <h3 style={{ margin: '8px 0' }}>{Math.round(userStats.averageScore)}%</h3>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <IonText color="medium">Best Score</IonText>
                    <h3 style={{ margin: '8px 0', color: 'var(--ion-color-primary)' }}>
                      {Math.round(userStats.bestScore)}%
                    </h3>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <IonText color="medium">
              <p>
                <strong>Test Format:</strong> 10 multiple choice questions per category<br />
                <strong>Passing Score:</strong> 7 out of 10 correct answers
              </p>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
