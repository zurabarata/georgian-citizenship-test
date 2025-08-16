import { GenericPage } from '../components/GenericPage';
import { IonImg } from '@ionic/react';
import zurabImage from './assets/happy taskers club - zurab baratashvili - HappyTaskers LLC.png';

const mainContent = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centers children horizontally in the container
      textAlign: 'center', // Centers the text elements
    }}
  >
    <IonImg
      style={{
        borderRadius: '120px',
        height: '40%',
        width: '40%',
        objectFit: 'cover', // Ensures the aspect ratio is maintained
      }}
      src={zurabImage}
      alt="Zurab Baratashvili, HappyTaskers LLC"
    />
    Welcome to Happy Taskers Club, where tech transforms financial
    possibilities!
    <br />
    <br />
    📍Based in Tbilisi, Georgia, we blend expertise and creativity to transform
    complex financial algorithms into user-friendly solutions.
    <br />
    <br />
    At Happy Taskers club, we shift fintech from fin to tech with a twist of
    innovation, catering to various markets and needs.
  </div>
);

export const Main = () => {
  return <GenericPage title="main" content={mainContent} />;
};
