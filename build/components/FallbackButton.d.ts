import { FC } from 'react';
import { PushNotificationOptions, ExternalChannelMessageInput, PresentationRequestDto } from '@unumid/types';
import { FallbackType, SuccessResponse, UserInfo } from '../types';
import { UnumIDClient } from '../UnumIDClient';
interface Props {
    client?: UnumIDClient;
    fallbackType: FallbackType;
    nextFallback: () => void;
    setFallbackError: (err?: string) => void;
    userInfo?: UserInfo;
    presentationRequest: PresentationRequestDto;
    sendEmail?: (options: ExternalChannelMessageInput) => Promise<SuccessResponse>;
    sendSms?: (options: ExternalChannelMessageInput) => Promise<SuccessResponse>;
    sendPushNotification?: (options: PushNotificationOptions) => Promise<SuccessResponse>;
    goToLogin?: () => void;
}
/**
 * Component responsible for rendering a button to trigger the current fallback method.
 */
declare const FallbackButton: FC<Props>;
export default FallbackButton;
//# sourceMappingURL=FallbackButton.d.ts.map