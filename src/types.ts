import { PushToken } from '@unumid/types';

export interface CredentialRequest {
  type: string;
  issuers: string[];
  required?: boolean;
}

export interface Proof {
  created: string;
  signatureValue: string;
  type: string;
  verificationMethod: string;
  proofPurpose: string;
}

export interface UserInfo {
  email?: string;
  phone?: string;
  pushToken?: PushToken | PushToken[];
}

export interface SuccessResponse {
  success: boolean;
}

export interface ExternalMessageInput {
  to: string;
  deeplink: string;
}

export type FallbackType = 'PUSH' | 'SMS' | 'EMAIL' | 'LOGIN';
export type WidgetType = 'DEEPLINK' | 'FALLBACK_RESULT';
export type SaasEnvironment = 'development' | 'sandbox' | 'production';
