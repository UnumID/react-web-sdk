import { FunctionComponent } from 'react';
import './QRCode.css';
import { HolderApp } from '@unumid/types';
import { SaasEnvironment } from '../types';
interface Props {
    qrCode: string;
    holderApp: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
    presentationRequestId?: string;
    env?: SaasEnvironment;
}
export declare const deepLinkAutoCloseTimer = 3;
export declare const ContinueToWebWalletRole = "ContinueToWebWalletRole";
export declare const QRCodeRole = "QRCodeRole";
/**
 * Component responsible for rendering a QR code
 */
declare const QRCode: FunctionComponent<Props>;
export default QRCode;
//# sourceMappingURL=QRCode.d.ts.map