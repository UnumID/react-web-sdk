import { FunctionComponent } from 'react';
import { SmsOptions, SuccessResponse, UserInfo } from 'types';
import './SMSWidget.css';
export interface Props {
    userInfo: UserInfo;
    sendSms: (options: SmsOptions) => Promise<SuccessResponse>;
    canScan: boolean;
    setCurrentWidget: (widget: string) => void;
    deeplink: string;
}
declare const SMSWidget: FunctionComponent<Props>;
export default SMSWidget;
