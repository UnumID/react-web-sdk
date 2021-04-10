import { FunctionComponent } from 'react';
import { HolderApp } from '@unumid/types';
import './QRCodeWidget.css';
export interface Props {
    holderApp: Pick<HolderApp, 'name' | 'deeplinkButtonImg'>;
    deeplink: string;
    qrCode: string;
    setCurrentWidget: (widget: string) => void;
    canScan: boolean;
    goToLogin?: () => void;
    shouldShowEmailLink: boolean;
    shouldShowSmsLink: boolean;
    shouldShowLoginLink: boolean;
}
declare const QRCodeWidget: FunctionComponent<Props>;
export default QRCodeWidget;
//# sourceMappingURL=QRCodeWidget.d.ts.map