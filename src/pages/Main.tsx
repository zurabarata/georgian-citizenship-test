import { GenericPage } from '../components/GenericPage';

const mainContent = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <h2>🇬🇪 Georgian Citizenship Test</h2>
    <p>
      Welcome to your comprehensive preparation tool for the Georgian citizenship test!
    </p>
    <br />
    <p>
      📚 Practice with 200+ questions across three categories:
    </p>
    <ul style={{ textAlign: 'left', margin: '20px 0' }}>
      <li>🇬🇪 Georgian Language</li>
      <li>📖 Georgian History</li>
      <li>⚖️ Georgian Law</li>
    </ul>
    <p>
      Each test consists of 10 questions, and you need to answer at least 7 correctly to pass.
    </p>
    <br />
    <p>
      🎯 Start practicing today and prepare for your citizenship journey!
    </p>
  </div>
);

export const Main = () => {
  return <GenericPage title="main" content={mainContent} />;
};
