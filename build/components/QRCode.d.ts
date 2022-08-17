import { FunctionComponent } from 'react';
import './QRCode.css';
import { SaasEnvironment } from '../types';
import { HolderApp } from '@unumid/types';
interface Props {
    qrCode: string;
    holderAppName: string;
    holderApp: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
    presentationRequestId?: string;
    env?: SaasEnvironment;
}
/**
 * Component responsible for rendering a QR code
 */
declare const QRCode: FunctionComponent<Props>;
export default QRCode;
//# sourceMappingURL=QRCode.d.ts.map