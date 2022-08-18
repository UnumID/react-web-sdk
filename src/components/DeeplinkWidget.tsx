import React, { FC, useMemo } from 'react';
import { HolderApp } from '@unumid/types';

import QRCode from './QRCode';
import DeeplinkButton from './DeeplinkButton';
import Branding from './Branding';

import './DeeplinkWidget.css';
import { SaasEnvironment } from '../types';

export interface Props {
  holderApp?: Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>;
  deeplink: string;
  qrCode: string;
  canScan: boolean;
  env?: SaasEnvironment;
  presentationRequestId?: string;
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
  env,
  presentationRequestId,
}) => {
  const renderQrCode = () => (
    <QRCode
      qrCode={qrCode}
      env={env}
      presentationRequestId={presentationRequestId}
      holderApp={holderApp}
    />
  );

  const renderDeeplinkButton = () => (
    <div className="deeplink-button-wrapper">
      <DeeplinkButton
        target="_blank"
        href={deeplink}
      >
        <img src={holderApp?.deeplinkButtonImg} alt={`Verify with ${holderApp?.name}`} />
      </DeeplinkButton>
      <Branding />
    </div>
  );

  const widget = useMemo(
    () => (canScan ? renderQrCode() : renderDeeplinkButton()),
    [canScan],
  );

  return (
    <div className="deeplink-widget">
      {widget}
    </div>
  );
};

export default DeeplinkWidget;
