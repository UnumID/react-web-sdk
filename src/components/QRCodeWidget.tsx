import React, { FunctionComponent } from 'react';
import { HolderApp } from '@unumid/types';

import QRCode from 'components/QRCode';
import LinkButton from 'components/LinkButton';
import ActionButton from 'components/ActionButton';
import Branding from 'components/Branding';
import { widgetTypes } from 'constants/widgetTypes';

import './QRCodeWidget.css';

export interface Props {
  holderApp: Pick<HolderApp, 'name' | 'deeplinkButtonImg'>;
  deeplink: string;
  qrCode: string;
  setCurrentWidget: (widget: string) => void;
  canScan: boolean;
  goToLogin?: () => void;
  shouldShowEmailLink: boolean;
  shouldShowSmsLink: boolean;
  shouldShowLoginLink: boolean;
}

const QRCodeWidget: FunctionComponent<Props> = ({
  holderApp,
  qrCode,
  deeplink,
  setCurrentWidget,
  canScan,
  goToLogin,
  shouldShowEmailLink,
  shouldShowSmsLink,
  shouldShowLoginLink,
}) => {
  const handleSMSLinkClick = (): void => {
    setCurrentWidget(widgetTypes.SMS);
  };

  const handleEmailLinkClick = (): void => {
    setCurrentWidget(widgetTypes.EMAIL);
  };

  const renderQrCode = () => <QRCode qrCode={qrCode} holderAppName={holderApp.name} />;

  const renderDeeplinkButton = () => (
    <div className="deeplink-button-wrapper">
      <ActionButton
        target="_blank"
        href={deeplink}
      >
        <img src={holderApp.deeplinkButtonImg} alt={`Verify with ${holderApp.name}`} />
      </ActionButton>
      <Branding />
    </div>

  );

  const renderLoginButton = () => (
    goToLogin && (
      <LinkButton onClick={goToLogin}>
        Log in with your email address for more authentication options
      </LinkButton>
    )
  );

  const renderSmsButton = () => (
    <LinkButton onClick={handleSMSLinkClick}>
      Get an SMS instead
    </LinkButton>
  );

  const renderEmailButton = () => (
    <LinkButton onClick={handleEmailLinkClick}>
      Get an email instead
    </LinkButton>
  );

  return (
    <div className="qrcode-widget-content">
      { canScan && renderQrCode() }
      { !canScan && renderDeeplinkButton() }
      { shouldShowLoginLink && renderLoginButton() }
      { shouldShowSmsLink && renderSmsButton() }
      { shouldShowEmailLink && renderEmailButton() }
    </div>
  );
};

export default QRCodeWidget;
