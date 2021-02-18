import React, { useState, FunctionComponent } from 'react';

import LinkButton from 'components/LinkButton';
import Spinner from 'components/Spinner';

import './QRCode.css';
import branding from '../assets/PoweredByUnumID.png';

interface Props {
  qrCode: string;
  applicationTitle: string;
}

const QRCode: FunctionComponent<Props> = ({ qrCode, applicationTitle = 'ACME' }) => {
  const [showNeedHelp, setShowNeedHelp] = useState(false);

  const handleLinkButtonClick = (): void => {
    setShowNeedHelp(!showNeedHelp);
  };

  const renderQrCode = () => (
    <div className="image-wrapper">
      <img className="qr-code-img" alt="qr code" src={qrCode} />
      <img className="branding-img" alt="Powered by Unum ID" src={branding} />
    </div>
  );

  return (
    <div className="qr-code">
      <div className="bold">To continue, scan this QR code</div>
      <div>with your phone camera or {applicationTitle} app:</div>
      <LinkButton onClick={handleLinkButtonClick}>Need help scanning?</LinkButton>
      {
          showNeedHelp && (
          <div className="help">
            <div className="help-item">1. Install the {applicationTitle} app from the app store.</div>
            <div className="help-item">2. Open the {applicationTitle} app and click &quot;Scan a QR code&quot;.</div>
            <div className="help-item">3. Hover over the QR code.</div>
          </div>
          )
      }
      <div className="qrcode-img-wrapper">
        {qrCode ? renderQrCode() : <Spinner />}
      </div>
    </div>
  );
};

export default QRCode;
