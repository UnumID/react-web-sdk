import { FC } from 'react';
import { EmailOptions, PresentationRequestResponse, SmsOptions, SuccessResponse, UserInfo } from 'types';
export interface Props {
    applicationTitle: string;
    createPresentationRequest: () => Promise<PresentationRequestResponse>;
    sendEmail: (options: EmailOptions) => Promise<SuccessResponse>;
    sendSms: (options: SmsOptions) => Promise<SuccessResponse>;
    goToLogin?: () => void;
    userInfo: UserInfo;
    presentationRequest?: PresentationRequestResponse;
}
declare const WidgetHostAndController: FC<Props>;
export default WidgetHostAndController;
