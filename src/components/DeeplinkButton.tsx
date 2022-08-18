import React, { FC, PropsWithChildren } from 'react';
import cc from 'classcat';

import './DeeplinkButton.css';

type Props = PropsWithChildren<{
  target?: string;
  href: string;
  className?: string;
  role?: string;
}>

export const DeepLinkButtonRole = 'DeepLinkButtonRole';

/**
 * Component responsible for displaying a deep link as a clickable button.
 * Primarily intended for use in mobile browsers.
 */
const DeeplinkButton: FC<Props> = ({
  target,
  href,
  className,
  children,
  role,
}) => (
  <a
    className={cc(['deeplink-button', className])}
    href={href}
    target={target}
    role={role || DeepLinkButtonRole}
  >
    {children}
  </a>
);

export default DeeplinkButton;
