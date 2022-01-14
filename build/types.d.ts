import { PushToken } from '@unumid/types';
export interface UserInfo {
    email?: string;
    phone?: string;
    pushToken?: PushToken | PushToken[];
}
export interface SuccessResponse {
    success: boolean;
}
export declare type FallbackType = 'PUSH' | 'SMS' | 'EMAIL' | 'LOGIN';
export declare type WidgetType = 'DEEPLINK' | 'FALLBACK_RESULT';
export declare type SaasEnvironment = 'development' | 'sandbox' | 'production';
//# sourceMappingURL=types.d.ts.map