import React, { FunctionComponent } from 'react';

import QRCode from 'components/QRCode';
import LinkButton from 'components/LinkButton';
import ActionButton from 'components/ActionButton';
import { widgetTypes } from 'constants/widgetTypes';

import './QRCodeWidget.css';

export interface Props {
  qrCode: string;
  setCurrentWidget: (widget: string) => void;
  applicationTitle: string;
  canScan: boolean;
  deeplink: string;
  goToLogin?: () => void;
  shouldShowEmailLink: boolean;
  shouldShowSmsLink: boolean;
  shouldShowLoginLink: boolean;
}

const QRCodeWidget: FunctionComponent<Props> = ({
  qrCode,
  setCurrentWidget,
  applicationTitle,
  canScan,
  deeplink,
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

  const btnLbl = `Continue with ${applicationTitle} App`;

  const renderQrCode = () => <QRCode qrCode={qrCode} applicationTitle={applicationTitle} />;

  const renderDeeplinkButton = () => (
    <ActionButton
      className="bold-label"
      target="_blank"
      href={deeplink}
    >
      {btnLbl}
    </ActionButton>
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
