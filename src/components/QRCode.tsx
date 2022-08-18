import React, { FunctionComponent, useState } from 'react';

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
  holderApp: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
  presentationRequestId?: string;
  env?: SaasEnvironment;
}

export const deepLinkAutoCloseTimer = 3;
export const ContinueToWebWalletRole = 'ContinueToWebWalletRole';
export const QRCodeRole = 'QRCodeRole';

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
  const walletUrl = env ? walletUrls[env] : undefined;
  const deeplinkHref = walletUrl ? `${walletUrl}/request?presentationRequestId=${presentationRequestId}&autoClose=${deepLinkAutoCloseTimer}` : undefined;

  const handleLinkButtonClick = (): void => {
    setShowNeedHelp(!showNeedHelp);
  };

  const renderQrCode = () => (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="image-wrapper"
        href={`${deeplinkHref}&link=qr`}
        role={QRCodeRole}
      >
        <img className="qr-code-img" alt={`QR Code to Verify with ${holderApp.name}`} src={qrCode} />
      </a>
      <Branding />
    </>
  );

  return (
    <div className="qr-code">
      <div className="bold">To continue, scan this QR code</div>
      <div className="light">with your phone camera or {holderApp.name} app:</div>
      <LinkButton onClick={handleLinkButtonClick}>Need help scanning?</LinkButton>
      {
        showNeedHelp && (
          <div className="help">
            <div className="help-item">1. Install the {holderApp.name} app from the app store.</div>
            <div className="help-item">2. Open the {holderApp.name} app and click &quot;Scan a QR
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
        (deeplinkHref && presentationRequestId && holderApp) && (
          <DeeplinkButton
            target="_blank"
            href={deeplinkHref}
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
