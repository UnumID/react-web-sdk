import { FC } from 'react';
import { EmailOptions, PresentationRequestResponse, SmsOptions, SuccessResponse, UserInfo } from 'types';
import './WidgetHostAndController.css';
export interface Props {
    applicationTitle: string;
    createPresentationRequest?: () => Promise<PresentationRequestResponse>;
    sendEmail?: (options: EmailOptions) => Promise<SuccessResponse>;
    sendSms?: (options: SmsOptions) => Promise<SuccessResponse>;
    goToLogin?: () => void;
    userInfo: UserInfo;
    presentationRequest?: PresentationRequestResponse;
    deeplinkImgSrc?: string;
}
declare const WidgetHostAndController: FC<Props>;
export default WidgetHostAndController;
//# sourceMappingURL=WidgetHostAndController.d.ts.map