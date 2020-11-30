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
export interface CredentialRequest {
    type: string;
    issuers: string[];
    required?: boolean;
}
export interface VerifierInfo {
    name: string;
    did: string;
    url: string;
}
export interface IssuerInfo {
    name: string;
    did: string;
}
export interface IssuerInfoMap {
    [did: string]: IssuerInfo;
}
export interface Proof {
    created: string;
    signatureValue: string;
    type: string;
    verificationMethod: string;
    proofPurpose: string;
}
export interface PresentationRequest {
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    verifier: string;
    holderAppUuid: string;
    credentialRequests: CredentialRequest[];
    proof: Proof;
    metadata?: Record<string, unknown>;
}
export interface PresentationRequestResponse {
    presentationRequest: PresentationRequest;
    verifier: VerifierInfo;
    issuers: IssuerInfoMap;
    deeplink: string;
    qrCode: string;
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
