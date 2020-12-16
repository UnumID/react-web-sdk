import React, { FC, PropsWithChildren } from 'react';
import './LinkButton.css';

type Props = PropsWithChildren<{
  onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  children: string;
}>;

const LinkButton: FC<Props> = ({ onClick, children }) => (
  <button type="button" className="link-button" onClick={onClick}>
    {children}
  </button>
);

export default LinkButton;
