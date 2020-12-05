import { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EmailOptions, PresentationRequestResponse, SmsOptions, SuccessResponse, UserInfo } from 'types';
export interface Props {
    applicationTitle: string;
    createPresentationRequest: () => Promise<PresentationRequestResponse>;
    sendEmail: (options: EmailOptions) => Promise<SuccessResponse>;
    sendSms: (options: SmsOptions) => Promise<SuccessResponse>;
    goToLogin: () => void;
    userInfo: UserInfo;
}
declare const WidgetHostAndController: FC<Props>;
export default WidgetHostAndController;
