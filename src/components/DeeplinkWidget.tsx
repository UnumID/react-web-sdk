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
  userCode?: string;
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
  userCode = undefined,
}) => {
  const renderQrCode = () => (
    <QRCode
      qrCode={qrCode}
      env={env}
      presentationRequestId={presentationRequestId}
      holderApp={holderApp}
      userCode={userCode}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canScan],
  );

  return (
    <div className="deeplink-widget">
      {widget}
    </div>
  );
};

export default DeeplinkWidget;
