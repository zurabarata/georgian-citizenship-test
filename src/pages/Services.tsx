import { GenericPage } from '../components/GenericPage';
import { HeadLine } from '../components/HeadLine';

const packages = [
  {
    name: 'Standard Package',
    description:
      'Basic services including coding, testing, and deployment, suitable for straightforward projects.',
  },
  {
    name: 'Premium Package',
    description:
      'Advanced development, comprehensive testing, maintenance, and support for complex projects.',
  },
  {
    name: 'Custom Package',
    description:
      'Services tailored to specific client needs, adapting to unique project requirements.',
  },
];

const ServicesContent = () => {
  return (
    <div>
      {packages.map(service => (
        <div key={service.name}>
          <HeadLine text={service.name} />
          <div>{service.description}</div>
        </div>
      ))}
    </div>
  );
};

export const Services = () => {
  return <GenericPage title="services" content={<ServicesContent />} />;
};
