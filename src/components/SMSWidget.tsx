import React, {
  useState, useEffect, FunctionComponent,
} from 'react';

import { SmsData, SmsResponse, UserInfo } from 'types';
import LinkButton from 'components/LinkButton';
import { widgetTypes } from 'constants/widgetTypes';

import './SMSWidget.css';

export interface Props {
  userInfo: UserInfo;
  sendSms: (options: SmsData) => Promise<SmsResponse>;
  canScan: boolean;
  setCurrentWidget: (widget: string) => void;
  deeplink: string;
}

const SMSWidget: FunctionComponent<Props> = ({
  userInfo,
  sendSms,
  canScan,
  setCurrentWidget,
  deeplink,
}) => {
  const [smsResp, setSMSResp] = useState(false);
  const [smsSent, setSMSSent] = useState(false);
  const backLinkLiteral = `Back to ${canScan ? 'QR code' : 'Button'}`;

  useEffect(() => {
    async function sendSMSMsg() {
      const options = {
        to: userInfo.phone,
        msg: `Authentication Request: ACME website. Click here to complete: ${deeplink}`,
      };

      try {
        await sendSms(options);
        setSMSResp(true);
        setSMSSent(true);
      } catch (e) {
        setSMSSent(true);
      }
    }

    sendSMSMsg();
  }, [deeplink, userInfo, sendSms]);

  const handleEmailLinkClick = (): void => {
    setCurrentWidget(widgetTypes.EMAIL);
  };

  const backToQrCode = (): void => {
    setCurrentWidget(widgetTypes.QR_CODE);
  };

  return (
    <div>
      {smsSent
        && (
        <div className="sms-content">
          {smsResp
            && (
            <div>
              <div>We texted a link to {userInfo.phone}.</div>
              <div className="bold">Please click it to continue.</div>
            </div>
            )}
          {!smsResp
            && <div className="error">Error sending SMS to {userInfo.phone}.</div>}
          { userInfo.email
            && <LinkButton onClick={handleEmailLinkClick}>Get an email instead</LinkButton> }
          <LinkButton onClick={backToQrCode}>
            {backLinkLiteral}
          </LinkButton>
        </div>
        )}
    </div>
  );
};

export default SMSWidget;
