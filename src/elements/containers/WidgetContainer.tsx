import React, { Component, ReactNode } from 'react';

import Card from 'react-bootstrap/Card';

import './WidgetContainer.css';

interface Props {
  children: ReactNode;
  className?: string;
}

class WidgetContainer extends Component<Props> {
  render(): ReactNode {
    const { children, className } = this.props;
    let newClass = 'single-widget content-box';
    newClass = (className ? `${className} ${newClass}` : newClass);

    return (
      <Card className={newClass}>
        { children }
      </Card>
    );
  }
}

export default WidgetContainer;
