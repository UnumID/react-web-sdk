export interface DeeplinkObject {
  uuid: string;
  verifier: string;
  deeplink: string;
  qrCode: string;
}

export interface WidgetContext {
  deepLinkDtl: DeeplinkObject;
  isSameDevice: boolean;
  canScan: boolean;
  unAuthenticatedCtx: boolean;
  emailId?: string;
  phoneNo?: string;
  currentWidget?: string;
  setWidgetState?: (value: Record<string, unknown>) => void;
}

export interface SmsData {
  to: string;
  msg: string;
}

export interface SmsResponse {
  success: boolean;
}

export interface SmsTemplate {
  templateText?: string;
}
