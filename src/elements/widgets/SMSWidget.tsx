import React, {
  useContext, useState, useEffect, FunctionComponent,
} from 'react';

import { WidgetContext } from 'types';
import { widgetStateContext } from 'context/widgetStateContext';
import { sendSms } from 'context/sendSms';
import LinkButton from 'elements/components/LinkButton';

import './SMSWidget.css';

const SMSWidget: FunctionComponent<{}> = () => {
  const widgetContext: WidgetContext = useContext(widgetStateContext);
  const [smsResp, setSMSResp] = useState(false);
  const [smsSent, setSMSSent] = useState(false);

  useEffect(() => {
    async function getSMS() {
      setSMSResp(await sendSms(widgetContext.phoneNo || '', widgetContext.deepLinkDtl.deeplink));
      setSMSSent(true);
    }
	
	getSMS();
  }, [widgetContext]);

  const handleEmailLinkClick = (): void => {
    if (widgetContext.setWidgetState) {
      widgetContext.setWidgetState({ currentWidget: 'Email' });
    }
  };

  const backToQrCode = (): void => {
    if (widgetContext.setWidgetState) {
      widgetContext.setWidgetState({ currentWidget: 'QrCode' });
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
              <div>We texted a link to {widgetContext.phoneNo}.</div>
              <div className="bold">Please click it to continue.</div>
            </div>
            )}
          {!smsResp
            && <div className="error">Error sending SMS to {widgetContext.phoneNo}.</div>}
          { widgetContext.emailId
            && <LinkButton onClick={handleEmailLinkClick}>Get an email instead</LinkButton> }
          <LinkButton onClick={backToQrCode}>Back to QR code</LinkButton>
        </div>
      )
    }
	</div>
  );
};

export default SMSWidget;
