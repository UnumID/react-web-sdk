import { FC } from 'react';
import { PushNotificationOptions, ExternalChannelMessageInput, PresentationRequestDto } from '@unumid/types';
import { SuccessResponse, UserInfo, SaasEnvironment } from '../types';
import './UnumIDWidget.css';
export interface Props {
    apiKey?: string;
    env?: SaasEnvironment;
    createPresentationRequest?: () => Promise<PresentationRequestDto | void>;
    sendEmail?: (options: ExternalChannelMessageInput) => Promise<SuccessResponse>;
    sendSms?: (options: ExternalChannelMessageInput) => Promise<SuccessResponse>;
    sendPushNotification?: (options: PushNotificationOptions) => Promise<SuccessResponse>;
    goToLogin?: () => void;
    userInfo?: UserInfo;
    presentationRequest?: PresentationRequestDto;
    createInitialPresentationRequest?: boolean;
    userCode?: string;
}
/**
 * Our top-level component exported from this SDK.
 * It manages much of the SDK's state and determines which other components should be rendered.
 */
declare const UnumIDWidget: FC<Props>;
export default UnumIDWidget;
//# sourceMappingURL=UnumIDWidget.d.ts.map