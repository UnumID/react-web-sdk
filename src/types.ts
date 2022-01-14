import { PushToken } from '@unumid/types';

export interface UserInfo {
  email?: string;
  phone?: string;
  pushToken?: PushToken | PushToken[];
}

export interface SuccessResponse {
  success: boolean;
}

export type FallbackType = 'PUSH' | 'SMS' | 'EMAIL' | 'LOGIN';
export type WidgetType = 'DEEPLINK' | 'FALLBACK_RESULT';
export type SaasEnvironment = 'development' | 'sandbox' | 'production';
