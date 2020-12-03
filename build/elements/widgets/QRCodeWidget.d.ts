import { FunctionComponent } from 'react';
import { UserInfo } from 'types';
import './QRCodeWidget.css';
interface Props {
    qrCode: string;
    setCurrentWidget: (widget: string) => void;
    applicationTitle: string;
    canScan: boolean;
    deeplink: string;
    isLoggedIn: boolean;
    userInfo: UserInfo;
}
declare const QRCodeWidget: FunctionComponent<Props>;
export default QRCodeWidget;
