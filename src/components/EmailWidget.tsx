import React, {
  useState, useEffect, FunctionComponent,
} from 'react';

import { EmailOptions, SuccessResponse } from 'types';
import LinkButton from 'components/LinkButton';
import { widgetTypes } from 'constants/widgetTypes';

import './EmailWidget.css';

export interface Props {
  email: string;
  sendEmail: (options: EmailOptions) => Promise<SuccessResponse>;
  canScan: boolean;
  goToLogin?: () => void;
  deeplink: string;
  setCurrentWidget: (widget: string) => void;
}

const EmailWidget: FunctionComponent<Props> = ({
  email,
  sendEmail,
  canScan,
  goToLogin,
  deeplink,
  setCurrentWidget,
}) => {
  const [emailResp, setEmailResp] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const backLinkLiteral = `Back to ${canScan ? 'QR code' : 'Button'}`;

  useEffect(() => {
    async function sendEmailData() {
      const options = {
        to: email,
        subject: 'Authentication Request: ACME website',
        htmlBody: `<div>Click <a href=${deeplink}>here</a> to complete`,
      };

      try {
        await sendEmail(options);
        setEmailResp(true);
        setEmailSent(true);
      } catch (e) {
        setEmailResp(false);
        setEmailSent(true);
      }
    }

    sendEmailData();
  }, [email, deeplink, sendEmail]);

  const backToQrCode = (): void => {
    setCurrentWidget(widgetTypes.QR_CODE);
  };

  return (
    <div>
      {emailSent
        && (
        <div className="email-content">
          {emailResp
            && (
            <div>
              <div>We emailed a link to {email}.</div>
              <div className="bold">Please click it to continue.</div>
            </div>
            )}
          {!emailResp
            && <div className="error">Error sending Email to {email}.</div>}
          { goToLogin && <LinkButton onClick={goToLogin}>Use a different email</LinkButton> }
          <LinkButton onClick={backToQrCode}>
            {backLinkLiteral}
          </LinkButton>
        </div>
        )}
    </div>
  );
};

export default EmailWidget;
