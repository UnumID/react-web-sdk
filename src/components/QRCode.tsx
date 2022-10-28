import React, {
  FC,
  FunctionComponent, PropsWithChildren, useMemo, useState,
} from 'react';

import './QRCode.css';
import { HolderApp } from '@unumid/types';
import { walletUrls } from '../constants/saasUrls';
import { SaasEnvironment } from '../types';

import DeeplinkButton from './DeeplinkButton';
import LinkButton from './LinkButton';
import Spinner from './Spinner';
import Branding from './Branding';
import { useAuthenticatorProfile } from '../hooks/useAuthenticatorProfile';

interface Props {
  qrCode: string;
  holderApp?: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
  presentationRequestId?: string;
  env?: SaasEnvironment;
  userCode?: string;
  notUsingUnumWebWalletHolderApp: boolean;
}

export const deepLinkAutoCloseTimer = 3;
export const ContinueToWebWalletRole = 'ContinueToWebWalletRole';
export const QRCodeRole = 'QRCodeRole';

export function queryParam(key: string, value: string): string {
  return `${key}=${value}`;
}
export function queryParams(params: Record<string, string|undefined>): string {
  return (Object.entries(params)
    .filter(([, value]) => Boolean(value)) as [string, string][])
    .map(([key, value]) => queryParam(key, value))
    .join('&');
}

/**
 * Component responsible for rendering a QR code
 */
const QRCode: FunctionComponent<Props> = ({
  qrCode,
  env,
  presentationRequestId,
  holderApp,
  userCode = undefined,
  notUsingUnumWebWalletHolderApp = false,
}) => {
  const [showNeedHelp, setShowNeedHelp] = useState(false);
  const {
    hasSupportedPlatformAuthenticator,
    authenticatorType,
  } = useAuthenticatorProfile() || {};

  const walletHref = useMemo<string|undefined>(() => {
    if (!presentationRequestId || !env) return undefined;
    const walletUrl = walletUrls[env];
    const urlParams = queryParams({
      presentationRequestId,
      autoClose: deepLinkAutoCloseTimer.toString(),
      skipQRCode: !hasSupportedPlatformAuthenticator ? 'true' : undefined,
      userCode,
    });

    return walletUrl ? `${walletUrl}/request?${urlParams}` : undefined;
  }, [env, presentationRequestId, hasSupportedPlatformAuthenticator, userCode]);

  const handleLinkButtonClick = (): void => {
    setShowNeedHelp(!showNeedHelp);
  };

  const QRLinkWrapper: FC<PropsWithChildren<{ className: string, role: string }>> = ({
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
          href={`${walletHref}&${queryParam('link', 'qr')}`}
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
      <QRLinkWrapper
        className="image-wrapper"
        role={QRCodeRole}
      >
        <img className="qr-code-img" alt={`QR Code to Verify with ${holderApp?.name}`} src={qrCode} />
      </QRLinkWrapper>
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
        (hasSupportedPlatformAuthenticator && walletHref && holderApp && notUsingUnumWebWalletHolderApp === false) && (
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
