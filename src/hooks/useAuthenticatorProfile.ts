import { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

/**
 * checks if webauthn is available in the current environment
 * @returns {boolean} true if webauthn is available, false if it is not
 */
export const getWebauthnAvailability = (): boolean =>
  Boolean(window.PublicKeyCredential);

/**
 * checks if a platform authenticator is available in the current environment
 * @returns {Promise<boolean>} true if a platform authenticator is available, false if not
 */
export const getPlatformAuthenticatorAvailability = async (): Promise<boolean> =>
  window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();

export type AuthenticatorProfile = {
  hasWebauthn: boolean,
  hasPlatformAuthenticator: boolean,
  isWindows?: boolean,
  authenticatorType?: 'platform' | 'cross-platform',
}

export async function detectHasPlatformAuthenticator(): Promise<AuthenticatorProfile> {
  const hasWebauthn = getWebauthnAvailability();

  if (!hasWebauthn) {
    return {
      hasWebauthn: Boolean(hasWebauthn),
      hasPlatformAuthenticator: false,
    };
  }
  const ua = UAParser();
  const hasPlatformAuthenticator = await getPlatformAuthenticatorAvailability();
  const isWindows = ua.os.name === 'Windows';
  const hasSupportedPlatformAuthenticator = hasPlatformAuthenticator && !isWindows;

  console.log('hasWebauthn', hasWebauthn);
  console.log('isWindows', isWindows);
  console.log('hasSupportedPlatformAuthenticator', hasSupportedPlatformAuthenticator);

  return {
    hasWebauthn: Boolean(hasWebauthn),
    hasPlatformAuthenticator: Boolean(hasPlatformAuthenticator),
    isWindows: Boolean(isWindows),
    authenticatorType: hasSupportedPlatformAuthenticator ? 'platform' : 'cross-platform',
  };
}

export function useAuthenticatorProfile(): AuthenticatorProfile|undefined {
  const [hasPlatformAuthenticator, setHasPlatformAuthenticator] = useState<AuthenticatorProfile|undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    detectHasPlatformAuthenticator()
      .then((hasAuthenticator) => {
        if (mounted) setHasPlatformAuthenticator(hasAuthenticator);
      })
      .catch(() => { /* do nothing */ });

    return () => {
      mounted = false;
    };
  }, []);

  return hasPlatformAuthenticator;
}
