import React, { FC, ReactNode } from 'react';

import './WidgetContainer.css';

interface Props {
  children: ReactNode;
  className?: string;
}

const WidgetContainer: FC<Props> = ({ children, className }) => {
  let newClass = 'single-widget content-box';
  newClass = className ? `${className} ${newClass}` : newClass;

  return (
    <div className={newClass}>
      {children}
    </div>
  );
};

export default WidgetContainer;
