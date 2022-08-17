import React, { FunctionComponent, useState } from 'react';

import LinkButton from './LinkButton';
import Spinner from './Spinner';
import Branding from './Branding';

import './QRCode.css';
import { walletUrls } from '../constants/saasUrls';
import { SaasEnvironment } from '../types';
import { HolderApp } from '@unumid/types';
import DeeplinkButton from './DeeplinkButton';

interface Props {
  qrCode: string;
  holderAppName: string;
  holderApp: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
  presentationRequestId?: string;
  env?: SaasEnvironment
}

/**
 * Component responsible for rendering a QR code
 */
const QRCode: FunctionComponent<Props> = ({
  qrCode, holderAppName, env, presentationRequestId, holderApp,
}) => {
  const [showNeedHelp, setShowNeedHelp] = useState(false);
  const walletUrl = env ? walletUrls[env] : undefined;
  const deeplinkHref = `${walletUrl}/request?presentationRequestId=${presentationRequestId}&autoClose=3`;

  const handleLinkButtonClick = (): void => {
    setShowNeedHelp(!showNeedHelp);
  };

  const renderQrCode = () => (
    <>
      <a target="_blank" rel="noopener noreferrer" className="image-wrapper" href={`${deeplinkHref}?link=qr`}>
        <img className="qr-code-img" alt="qr code" src={qrCode} />
      </a>
      <Branding />
    </>
  );

  return (
    <div className="qr-code">
      <div className="bold">To continue, scan this QR code</div>
      <div className="light">with your phone camera or {holderAppName} app:</div>
      <LinkButton onClick={handleLinkButtonClick}>Need help scanning?</LinkButton>
      {
          showNeedHelp && (
          <div className="help">
            <div className="help-item">1. Install the {holderAppName} app from the app store.</div>
            <div className="help-item">2. Open the {holderAppName} app and click &quot;Scan a QR code&quot;.</div>
            <div className="help-item">3. Hover over the QR code.</div>
          </div>
          )
      }
      <div className="qrcode-img-wrapper">
        {qrCode ? renderQrCode() : <Spinner />}
      </div>
      { (walletUrl && presentationRequestId && holderApp)
          && (
          <DeeplinkButton
            target="_blank"
            href={deeplinkHref}
            className="continue-under-qr"
          >
            <img src={holderApp.deeplinkButtonImg} alt={`Verify with ${holderApp.name}`} />
          </DeeplinkButton>
          )}
    </div>
  );
};

export default QRCode;
