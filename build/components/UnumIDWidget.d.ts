import { FC } from 'react';
import { PresentationRequestPostDto, PushNotificationOptions } from '@unumid/types';
import { ExternalMessageInput, SuccessResponse, UserInfo, SaasEnvironment } from 'types';
import './UnumIDWidget.css';
export interface Props {
    apiKey: string;
    env: SaasEnvironment;
    createPresentationRequest: () => Promise<PresentationRequestPostDto>;
    sendEmail?: (options: ExternalMessageInput) => Promise<SuccessResponse>;
    sendSms?: (options: ExternalMessageInput) => Promise<SuccessResponse>;
    sendPushNotification?: (options: PushNotificationOptions) => Promise<SuccessResponse>;
    goToLogin?: () => void;
    userInfo?: UserInfo;
    presentationRequest?: PresentationRequestPostDto;
    createInitialPresentationRequest?: boolean;
}
/**
 * Our top-level component exported from this SDK.
 * It manages much of the SDK's state and determines which other components should be rendered.
 */
declare const UnumIDWidget: FC<Props>;
export default UnumIDWidget;
//# sourceMappingURL=UnumIDWidget.d.ts.map