import { FunctionComponent } from 'react';
import './QRCodeWidget.css';
export interface Props {
    qrCode: string;
    setCurrentWidget: (widget: string) => void;
    applicationTitle: string;
    canScan: boolean;
    deeplink: string;
    goToLogin?: () => void;
    shouldShowEmailLink: boolean;
    shouldShowSmsLink: boolean;
    shouldShowLoginLink: boolean;
}
declare const QRCodeWidget: FunctionComponent<Props>;
export default QRCodeWidget;
//# sourceMappingURL=QRCodeWidget.d.ts.map