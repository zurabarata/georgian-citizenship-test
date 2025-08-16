import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ExploreContainer } from './ExploreContainer';
import { JSX, ReactNode } from 'react';

interface PageProps {
  title: string;
  content: ReactNode | JSX.Element;
}

export const GenericPage = ({ title, content }: PageProps) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ textAlign: 'center' }}>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer name={content} />
      </IonContent>
    </IonPage>
  );
};
