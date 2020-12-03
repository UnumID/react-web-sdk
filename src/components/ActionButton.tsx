import React, { FC } from 'react';

import Button from 'react-bootstrap/Button';

interface Props {
  onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  type: 'primary' | 'secondary';
  className?: string;
  target?: string;
  href?: string;
  children: string;
}

const ActionButton: FC<Props> = ({
  onClick,
  type,
  className,
  target,
  href,
  children,
}) => (
  <Button
    className={className}
    variant={type}
    onClick={onClick}
    href={href}
    target={target}
  >
    {children}
  </Button>
);

export default ActionButton;
