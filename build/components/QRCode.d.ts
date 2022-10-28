import { FunctionComponent } from 'react';
import './QRCode.css';
import { HolderApp } from '@unumid/types';
import { SaasEnvironment } from '../types';
interface Props {
    qrCode: string;
    holderApp?: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
    presentationRequestId?: string;
    env?: SaasEnvironment;
    userCode?: string;
    notUsingUnumWebWalletHolderApp?: boolean;
}
export declare const deepLinkAutoCloseTimer = 3;
export declare const ContinueToWebWalletRole = "ContinueToWebWalletRole";
export declare const QRCodeRole = "QRCodeRole";
export declare function queryParam(key: string, value: string): string;
export declare function queryParams(params: Record<string, string | undefined>): string;
/**
 * Component responsible for rendering a QR code
 */
declare const QRCode: FunctionComponent<Props>;
export default QRCode;
//# sourceMappingURL=QRCode.d.ts.map