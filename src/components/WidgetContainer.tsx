import React, { FC, ReactNode } from 'react';

import Card from 'react-bootstrap/Card';

import './WidgetContainer.css';

interface Props {
  children: ReactNode;
  className?: string;
}

const WidgetContainer: FC<Props> = ({ children, className }) => {
  let newClass = 'single-widget content-box';
  newClass = className ? `${className} ${newClass}` : newClass;

  return (
    <Card className={newClass}>
      {children}
    </Card>
  );
};

export default WidgetContainer;
