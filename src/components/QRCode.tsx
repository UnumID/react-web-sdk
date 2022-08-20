import React, {
  FC,
  FunctionComponent, PropsWithChildren, useEffect, useMemo, useState,
} from 'react';

import './QRCode.css';
import { HolderApp } from '@unumid/types';
import { walletUrls } from '../constants/saasUrls';
import { SaasEnvironment } from '../types';

import DeeplinkButton from './DeeplinkButton';
import LinkButton from './LinkButton';
import Spinner from './Spinner';
import Branding from './Branding';

interface Props {
  qrCode: string;
  holderApp?: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
  presentationRequestId?: string;
  env?: SaasEnvironment;
}

export const deepLinkAutoCloseTimer = 3;
export const ContinueToWebWalletRole = 'ContinueToWebWalletRole';
export const QRCodeRole = 'QRCodeRole';

export const detectHasPlatformAuthenticator: () => Promise<boolean> = () =>
  window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(() => false);

type QRCodeState = {
  walletHref: string|undefined,
  hasPlatformAuthenticator: boolean
}

/**
 * Component responsible for rendering a QR code
 */
const QRCode: FunctionComponent<Props> = ({
  qrCode,
  env,
  presentationRequestId,
  holderApp,
}) => {
  const [showNeedHelp, setShowNeedHelp] = useState(false);
  const [hasPlatformAuthenticator, setHasPlatformAuthenticator] = useState<boolean>(false);
  const walletHref = useMemo<string|undefined>(() => {
    const walletUrl = env ? walletUrls[env] : undefined;
    return walletUrl ? `${walletUrl}/request?presentationRequestId=${presentationRequestId}&autoClose=${deepLinkAutoCloseTimer}` : undefined;
  }, [env, presentationRequestId]);

  const handleLinkButtonClick = (): void => {
    setShowNeedHelp(!showNeedHelp);
  };

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

  const LinkWrapper: FC<PropsWithChildren<{ className: string, role: string }>> = ({
    children,
    className,
    role,
  }) => {
    const props = {
      className,
      role,
    };

    if (walletHref && holderApp) {
      return (
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          href={walletHref}
        >
          {children}
        </a>
      );
    }
    return (
      <div
        {...props}
      >
        {children}
      </div>
    );
  };

  const renderQrCode = () => (
    <>
      <LinkWrapper
        className="image-wrapper"
        role={QRCodeRole}
      >
        <img className="qr-code-img" alt={`QR Code to Verify with ${holderApp?.name}`} src={qrCode} />
      </LinkWrapper>
      <Branding />
    </>
  );

  return (
    <div className="qr-code">
      <div className="bold">To continue, scan this QR code</div>
      <div className="light">with your phone camera or {holderApp?.name} app:</div>
      <LinkButton onClick={handleLinkButtonClick}>Need help scanning?</LinkButton>
      {
        showNeedHelp && (
          <div className="help">
            <div className="help-item">1. Install the {holderApp?.name} app from the app store.</div>
            <div className="help-item">2. Open the {holderApp?.name} app and click &quot;Scan a QR
              code&quot;.
            </div>
            <div className="help-item">3. Hover over the QR code.</div>
          </div>
        )
      }
      <div className="qrcode-img-wrapper">
        {qrCode ? renderQrCode() : <Spinner />}
      </div>
      {
        (hasPlatformAuthenticator && walletHref && holderApp) && (
          <DeeplinkButton
            target="_blank"
            href={walletHref}
            className="continue-under-qr"
            role={ContinueToWebWalletRole}
          >
            <img src={holderApp.deeplinkButtonImg} alt={`Verify with ${holderApp.name}`} />
          </DeeplinkButton>
        )
      }
    </div>
  );
};

export default QRCode;
