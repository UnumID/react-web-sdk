import React, { Component, ReactNode } from 'react';

import Button from 'react-bootstrap/Button';

interface Props {
  onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  href?: string;
  children: string;
}

class LinkButton extends Component<Props> {
  render(): ReactNode {
    const { onClick, href, children } = this.props;
    return (
      <Button href={href} variant="link" onClick={onClick}>
        { children }
      </Button>
    );
  }
}

export default LinkButton;
