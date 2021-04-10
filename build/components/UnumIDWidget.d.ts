import { FC } from 'react';
import { PresentationRequestPostDto } from '@unumid/types';
import { EmailOptions, SmsOptions, SuccessResponse, UserInfo } from 'types';
import './UnumIDWidget.css';
export interface Props {
    createPresentationRequest: () => Promise<PresentationRequestPostDto>;
    sendEmail?: (options: EmailOptions) => Promise<SuccessResponse>;
    sendSms?: (options: SmsOptions) => Promise<SuccessResponse>;
    goToLogin?: () => void;
    userInfo?: UserInfo;
    presentationRequest?: PresentationRequestPostDto;
    createInitialPresentationRequest?: boolean;
}
declare const UnumIDWidget: FC<Props>;
export default UnumIDWidget;
//# sourceMappingURL=UnumIDWidget.d.ts.map