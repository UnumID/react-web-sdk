import { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EmailData, EmailResponse, PresentationRequestResponse, SmsData, SmsResponse, UserInfo } from 'types';
export interface Props {
    applicationTitle: string;
    createPresentationRequest: () => Promise<PresentationRequestResponse>;
    sendEmail: (options: EmailData) => Promise<EmailResponse>;
    sendSms: (options: SmsData) => Promise<SmsResponse>;
    goToLogin: () => void;
    userInfo: UserInfo;
}
declare const WidgetHostAndController: FC<Props>;
export default WidgetHostAndController;
