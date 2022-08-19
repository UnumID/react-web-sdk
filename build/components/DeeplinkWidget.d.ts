import { FC } from 'react';
import { HolderApp } from '@unumid/types';
import './DeeplinkWidget.css';
import { SaasEnvironment } from '../types';
export interface Props {
    holderApp?: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
    deeplink: string;
    qrCode: string;
    canScan: boolean;
    env?: SaasEnvironment;
    presentationRequestId?: string;
}
/**
 * Component responsible for rendering a deep link referencing a PresentationRequest,
 * either as a QR code (default on desktop) or a button (default on mobile).
 */
declare const DeeplinkWidget: FC<Props>;
export default DeeplinkWidget;
//# sourceMappingURL=DeeplinkWidget.d.ts.map