import React, { FunctionComponent } from 'react';

import { objUtil } from 'util/ruiObjectUtils';
import { frwkHlpr } from 'frwk/ruiFrwkHlpr';
import { WidgetContext } from 'types';
import { useWidgetStateContext } from 'context/widgetStateContext';
import QRCode from 'elements/components/QRCode';
import LinkButton from 'elements/components/LinkButton';
import ActionButton from 'elements/components/ActionButton';
import { widgetTypes } from 'frwk/ruiFrwkConst';

import './QRCodeWidget.css';

const QRCodeWidget: FunctionComponent = () => {
  const widgetContext: WidgetContext = useWidgetStateContext();

  frwkHlpr.logInfo('QRCodeWidget', JSON.stringify(widgetContext));

  const handleLoginLinkClick = (): void => {
    window.location.href = objUtil.getEnvValue('REACT_APP_LOGIN_PAGE') as string;
  };

  const handleSMSLinkClick = (): void => {
    if (widgetContext.setWidgetState) {
      widgetContext.setWidgetState({ currentWidget: widgetTypes.SMS });
    }
  };

  const handleEmailLinkClick = (): void => {
    if (widgetContext.setWidgetState) {
      widgetContext.setWidgetState({ currentWidget: widgetTypes.EMAIL });
    }
  };

  const btnLbl = `Continue with ${objUtil.getEnvValue('REACT_APP_APPLICATION_TITLE')} App`;

  return (
    <div className="qrcode-widget-content">
      { widgetContext.custContext.canScan
        && <QRCode qrCode={widgetContext.deepLinkDtl.qrCode} /> }
      { !widgetContext.custContext.canScan
        && (
        <ActionButton
          className="bold-label"
          type="primary"
          target="_blank"
          href={widgetContext.deepLinkDtl.deeplink}
        >
          {btnLbl}
        </ActionButton>
        ) }
      { (widgetContext.unAuthenticatedCtx)
        && (
          <LinkButton onClick={handleLoginLinkClick}>
            Log in with your email address for more authentication options
          </LinkButton>
        ) }
      { (!widgetContext.unAuthenticatedCtx && widgetContext.custContext.phoneNo)
        && (
          <LinkButton onClick={handleSMSLinkClick}>
            Get an SMS instead
          </LinkButton>
        ) }
      { (!widgetContext.unAuthenticatedCtx)
        && (!widgetContext.custContext.phoneNo && widgetContext.custContext.emailId)
        && (
          <LinkButton onClick={handleEmailLinkClick}>
            Get an email instead
          </LinkButton>
        ) }
    </div>
  );
};

export default QRCodeWidget;
