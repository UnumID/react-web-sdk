import { FC, PropsWithChildren } from 'react';
import './DeeplinkButton.css';
declare type Props = PropsWithChildren<{
    target?: string;
    href: string;
    className?: string;
    role?: string;
}>;
export declare const DeepLinkButtonRole = "DeepLinkButtonRole";
/**
 * Component responsible for displaying a deep link as a clickable button.
 * Primarily intended for use in mobile browsers.
 */
declare const DeeplinkButton: FC<Props>;
export default DeeplinkButton;
//# sourceMappingURL=DeeplinkButton.d.ts.map