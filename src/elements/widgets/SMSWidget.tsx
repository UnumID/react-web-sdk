import React, {
  useContext, useState, useEffect, FunctionComponent,
} from 'react';

import { WidgetContext } from 'types';
import { widgetStateContext } from 'context/widgetStateContext';
import { sendSms } from 'context/sendSms';
import LinkButton from 'elements/components/LinkButton';
import { widgetTypes } from 'frwk/ruiFrwkConst';

import './SMSWidget.css';

const SMSWidget: FunctionComponent = () => {
  const widgetContext: WidgetContext = useContext(widgetStateContext);
  const [smsResp, setSMSResp] = useState(false);
  const [smsSent, setSMSSent] = useState(false);
  const backLinkLiteral = `Back to ${widgetContext.custContext.canScan ? 'QR code' : 'Button'}`;

  useEffect(() => {
    async function sendSMSMsg() {
      setSMSResp(await sendSms(widgetContext.custContext.phoneNo || '', widgetContext.deepLinkDtl.deeplink));
      setSMSSent(true);
    }

    sendSMSMsg();
  }, [widgetContext]);

  const handleEmailLinkClick = (): void => {
    if (widgetContext.setWidgetState) {
      widgetContext.setWidgetState({ currentWidget: widgetTypes.EMAIL });
    }
  };

  const backToQrCode = (): void => {
    if (widgetContext.setWidgetState) {
      widgetContext.setWidgetState({ currentWidget: widgetTypes.QR_CODE });
    }
  };

  return (
    <div>
      {smsSent
        && (
        <div className="sms-content">
          {smsResp
            && (
            <div>
              <div>We texted a link to {widgetContext.custContext.phoneNo}.</div>
              <div className="bold">Please click it to continue.</div>
            </div>
            )}
          {!smsResp
            && <div className="error">Error sending SMS to {widgetContext.custContext.phoneNo}.</div>}
          { widgetContext.custContext.emailId
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
