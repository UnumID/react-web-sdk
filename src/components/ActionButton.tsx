import React, { FC, PropsWithChildren } from 'react';
import cc from 'classcat';

import './ActionButton.css';

type Props = PropsWithChildren<{
  target?: string;
  href: string;
  className?: string;
}>

const ActionButton: FC<Props> = ({
  target,
  href,
  className,
  children,
}) => (
  <a
    className={cc(['action-button', className])}
    href={href}
    target={target}
  >
    {children}
  </a>
);

export default ActionButton;
