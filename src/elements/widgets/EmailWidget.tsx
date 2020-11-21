import React, {
  useContext, useState, useEffect, FunctionComponent,
} from 'react';

import { WidgetContext } from 'types';
import { widgetStateContext } from 'context/widgetStateContext';
import { sendEmail } from 'context/sendEmail';
import LinkButton from 'elements/components/LinkButton';
import { widgetTypes } from 'frwk/ruiFrwkConst';
import { objUtil } from 'util/ruiObjectUtils';

import './EmailWidget.css';

const EmailWidget: FunctionComponent = () => {
  const widgetContext: WidgetContext = useContext(widgetStateContext);
  const [emailResp, setEmailResp] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const backLinkLiteral = `Back to ${widgetContext.custContext.canScan ? 'QR code' : 'Button'}`;

  useEffect(() => {
    async function sendEmailData() {
      setEmailResp(await sendEmail(widgetContext.custContext.emailId || '', widgetContext.deepLinkDtl.deeplink));
      setEmailSent(true);
    }

    sendEmailData();
  }, [widgetContext]);

  const handleAnotherEmailLinkClick = (): void => {
    window.location.href = objUtil.getEnvValue('REACT_APP_LOGIN_PAGE') as string;
  };

  const backToQrCode = (): void => {
    if (widgetContext.setWidgetState) {
      widgetContext.setWidgetState({ currentWidget: widgetTypes.QR_CODE });
    }
  };

  return (
    <div>
      {emailSent
        && (
        <div className="email-content">
          {emailResp
            && (
            <div>
              <div>We emailed a link to {widgetContext.custContext.emailId}.</div>
              <div className="bold">Please click it to continue.</div>
            </div>
            )}
          {!emailResp
            && <div className="error">Error sending Email to {widgetContext.custContext.emailId}.</div>}
          <LinkButton onClick={handleAnotherEmailLinkClick}>Use a different email</LinkButton>
          <LinkButton onClick={backToQrCode}>
            {backLinkLiteral}
          </LinkButton>
        </div>
        )}
    </div>
  );
};

export default EmailWidget;
