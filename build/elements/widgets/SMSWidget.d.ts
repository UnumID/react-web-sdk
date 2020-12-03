import { FunctionComponent } from 'react';
import { SmsData, SmsResponse, UserInfo } from 'types';
import './SMSWidget.css';
interface Props {
    userInfo: UserInfo;
    sendSms: (options: SmsData) => Promise<SmsResponse>;
    canScan: boolean;
    setCurrentWidget: (widget: string) => void;
    deeplink: string;
}
declare const SMSWidget: FunctionComponent<Props>;
export default SMSWidget;
