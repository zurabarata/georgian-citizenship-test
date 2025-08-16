import { ReactElement, ReactNode } from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: ReactNode;
}

export const ExploreContainer = ({ name }: ContainerProps) => {
  return (
    <div className="container">
      <span className="textSelection">{name}</span>
    </div>
  );
};
