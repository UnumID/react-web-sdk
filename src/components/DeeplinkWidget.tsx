import React, { FC } from 'react';
import { HolderApp } from '@unumid/types';

import QRCode from './QRCode';
import DeeplinkButton from './DeeplinkButton';
import Branding from './Branding';

import './DeeplinkWidget.css';

export interface Props {
  holderApp: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
  deeplink: string;
  qrCode: string;
  canScan: boolean;
}

/**
 * Component responsible for rendering a deep link referencing a PresentationRequest,
 * either as a QR code (default on desktop) or a button (default on mobile).
 */
const DeeplinkWidget: FC<Props> = ({
  holderApp,
  qrCode,
  deeplink,
  canScan,
}) => {
  const renderQrCode = () => <QRCode qrCode={qrCode} holderAppName={holderApp.name} />;

  const renderDeeplinkButton = () => (
    <div className="deeplink-button-wrapper">
      <DeeplinkButton
        target="_blank"
        href={deeplink}
      >
        <img src={holderApp.deeplinkButtonImg} alt={`Verify with ${holderApp.name}`} />
      </DeeplinkButton>
      <Branding />
    </div>

  );

  return (
    <div className="deeplink-widget">
      { canScan && renderQrCode() }
      { !canScan && renderDeeplinkButton() }

    </div>
  );
};

export default DeeplinkWidget;
