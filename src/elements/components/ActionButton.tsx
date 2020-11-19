import React, { Component, ReactNode } from 'react';

import Button from 'react-bootstrap/Button';

interface Props {
  onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  type: 'primary' | 'secondary';
  className?: string;
  target?: string;
  href?: string;
  children: string;
}

class ActionButton extends Component<Props> {
  render(): ReactNode {
    const { onClick, type, className, target, href, children } = this.props;
    return (
      <Button className={className} variant={type} onClick={onClick} 
        href={href} target={target}>
        { children }
      </Button>
    );
  }
}

export default ActionButton;
