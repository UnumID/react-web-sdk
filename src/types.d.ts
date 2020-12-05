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

export interface PresentationRequest {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  verifier: string;
  credentialRequests: CredentialRequest[];
  holderAppUuid: string;
  proof: Proof
  metadata?: Record<string, unknown>;
}

export interface PresentationRequestResponse {
  presentationRequest: PresentationRequest;
  verifier: {
    name: string;
    did: string;
    url: string;
  };
  issuers: {
    [did: string]: {
      name: string;
      did: string;
    }
  },
  deeplink: string;
  qrCode: string;
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
