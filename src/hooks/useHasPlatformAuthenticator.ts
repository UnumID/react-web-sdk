import { useEffect, useState } from 'react';

export const detectHasPlatformAuthenticator: () => Promise<boolean> = () => (
  window.PublicKeyCredential
    ? window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(() => false)
    : Promise.resolve(false)
);

export function useHasPlatformAuthenticator(): boolean {
  const [hasPlatformAuthenticator, setHasPlatformAuthenticator] = useState<boolean>(false);

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
