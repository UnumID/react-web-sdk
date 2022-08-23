/**
 * checks if webauthn is available in the current environment
 * @returns {boolean} true if webauthn is available, false if it is not
 */
export declare const getWebauthnAvailability: () => boolean;
/**
 * checks if a platform authenticator is available in the current environment
 * @returns {Promise<boolean>} true if a platform authenticator is available, false if not
 */
export declare const getPlatformAuthenticatorAvailability: () => Promise<boolean>;
export declare type AuthenticatorProfile = {
    hasWebauthn: boolean;
    hasPlatformAuthenticator: boolean;
    hasSupportedPlatformAuthenticator: boolean;
    isWindows?: boolean;
    authenticatorType?: 'platform' | 'cross-platform';
};
export declare function detectHasPlatformAuthenticator(): Promise<AuthenticatorProfile>;
export declare function useAuthenticatorProfile(): AuthenticatorProfile | undefined;
//# sourceMappingURL=useAuthenticatorProfile.d.ts.map