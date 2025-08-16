import { GenericPage } from '../components/GenericPage';

const contactContent = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centers children horizontally in the container
      textAlign: 'center', // Centers the text elements
    }}
  >
    <br />
    <text>drop us an email at:</text>
    <text>info@georgiancitizenship.test</text>
    <br />
    <text>we will get back to you asap!</text>
  </div>
);

export const Contact = () => {
  return <GenericPage title="contact" content={contactContent} />;
};
