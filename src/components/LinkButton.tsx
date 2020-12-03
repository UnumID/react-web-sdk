import React, { FC } from 'react';

import Button from 'react-bootstrap/Button';

interface Props {
  onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  href?: string;
  children: string;
}

const LinkButton: FC<Props> = ({ onClick, href, children }) => (
  <Button href={href} variant="link" onClick={onClick}>
    {children}
  </Button>
);

export default LinkButton;
