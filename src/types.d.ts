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
  email: string;
  phone: string;
}

export interface SmsOptions {
  to: string;
  msg: string;
}

export interface SuccessResponse {
  success: boolean;
}

export interface EmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}
