import React, { Component, ReactNode } from 'react';

import Card from 'react-bootstrap/Card';

import './WidgetContainer.css';

interface Props {
  children: ReactNode;
  className?: string;
}

class WidgetContainer extends Component<Props> {
  render(): ReactNode {
    const { children } = this.props;
    return (
      <Card className="single-widget content-box">
        { children }
      </Card>
    );
  }
}

export default WidgetContainer;
