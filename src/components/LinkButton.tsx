import React, { FC, PropsWithChildren } from 'react';
import './LinkButton.css';

type Props = PropsWithChildren<{
  onClick: React.MouseEventHandler
}>;

/**
 * Component that renders a button styled as a link.
 */
const LinkButton: FC<Props> = ({ onClick, children }) => (
  <button type="button" className="link-button" onClick={onClick}>
    {children}
  </button>
);

export default LinkButton;
