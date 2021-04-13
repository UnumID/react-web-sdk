import React, { FC, PropsWithChildren } from 'react';
import cc from 'classcat';

import './DeeplinkButton.css';

type Props = PropsWithChildren<{
  target?: string;
  href: string;
  className?: string;
}>

/**
 * Component responsible for displaying a deep link as a clickable button.
 * Primarily intended for use in mobile browsers.
 */
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
