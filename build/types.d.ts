export interface DeeplinkObject {
    uuid: string;
    verifier: string;
    deeplink: string;
    qrCode: string;
}
export interface CustomerContext {
    emailId?: string;
    phoneNo?: string;
    canScan?: boolean;
}
export interface WidgetContext {
    deepLinkDtl: DeeplinkObject;
    custContext: CustomerContext;
    isSameDevice: boolean;
    unAuthenticatedCtx: boolean;
    currentWidget?: string;
    setWidgetState?: (value: Record<string, unknown>) => void;
}
export interface PresentationRequest {
    credentialRequests: [
        {
            type: string;
            issuers: string[];
        }
    ];
    holderAppUuid: string;
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
export interface EmailData {
    to: string;
    subject: string;
    htmlBody: string;
}
export interface EmailResponse {
    success: boolean;
}
export interface EmailTemplate {
    subjectText: string;
    htmlTemplateText?: string;
}
