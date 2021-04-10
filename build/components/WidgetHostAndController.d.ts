import { FC } from 'react';
import { PresentationRequestPostDto } from '@unumid/types';
import { EmailOptions, SmsOptions, SuccessResponse, UserInfo } from 'types';
import './WidgetHostAndController.css';
export interface Props {
    createPresentationRequest: () => Promise<PresentationRequestPostDto>;
    sendEmail?: (options: EmailOptions) => Promise<SuccessResponse>;
    sendSms?: (options: SmsOptions) => Promise<SuccessResponse>;
    goToLogin?: () => void;
    userInfo?: UserInfo;
    presentationRequest?: PresentationRequestPostDto;
    createInitialPresentationRequest?: boolean;
}
declare const WidgetHostAndController: FC<Props>;
export default WidgetHostAndController;
//# sourceMappingURL=WidgetHostAndController.d.ts.map