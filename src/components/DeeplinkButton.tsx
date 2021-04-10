import React, { FC, PropsWithChildren } from 'react';
import cc from 'classcat';

import './DeeplinkButton.css';

type Props = PropsWithChildren<{
  target?: string;
  href: string;
  className?: string;
}>

const DeeplinkButton: FC<Props> = ({
  target,
  href,
  className,
  children,
}) => (
  <a
    className={cc(['deeplink-button', className])}
    href={href}
    target={target}
  >
    {children}
  </a>
);

export default DeeplinkButton;
