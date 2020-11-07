import React, { useState, FunctionComponent } from 'react';

import LinkButton from 'elements/components/LinkButton';

import './QRCode.css';

interface Props {
  qrCode: string;
}

const QRCode: FunctionComponent<Props> = ({ qrCode }) => {
  const [showNeedHelp, setShowNeedHelp] = useState(false);

  const handleLinkButtonClick = (): void => {
    setShowNeedHelp(!showNeedHelp);
  };

  return (
    <div className="qr-code">
      <div className="bold">To continue, scan this QR code</div>
      <div>with your phone camera or ACME app:</div>
      <LinkButton onClick={handleLinkButtonClick}>Need help scanning?</LinkButton>
      {
          showNeedHelp && (
          <div className="help">
            <div className="help-item">1. Install the ACME app from the app store.</div>
            <div className="help-item">2. Open the ACME app and click &quot;Scan a QR code&quot;.</div>
            <div className="help-item">3. Hover over the QR code.</div>
          </div>
          )
      }
      <div className="qrcode-img-wrapper">
        <img alt="qr code" src={qrCode} />
      </div>
    </div>
  );
};

export default QRCode;
