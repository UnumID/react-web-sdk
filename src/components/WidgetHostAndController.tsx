import React, { FC, useState, useEffect } from 'react';

import WidgetContainer from 'components/WidgetContainer';
import QRCodeWidget from 'components/QRCodeWidget';
import SMSWidget from 'components/SMSWidget';
import EmailWidget from 'components/EmailWidget';
import {
  EmailOptions,
  PresentationRequestResponse,
  SmsOptions,
  SuccessResponse,
  UserInfo,
} from 'types';
import { widgetTypes } from 'constants/widgetTypes';

export interface Props {
  applicationTitle: string;
  createPresentationRequest?: () => Promise<PresentationRequestResponse>;
  sendEmail?: (options: EmailOptions) => Promise<SuccessResponse>;
  sendSms?: (options: SmsOptions) => Promise<SuccessResponse>;
  goToLogin?: () => void;
  userInfo: UserInfo;
  presentationRequest?: PresentationRequestResponse
}

const WidgetHostAndController: FC<Props> = ({
  applicationTitle,
  createPresentationRequest,
  sendEmail,
  sendSms,
  goToLogin,
  userInfo,
  presentationRequest,
}: Props) => {
  const [deeplink, setDeeplink] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isSameDevice, setIsSameDevice] = useState(!!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [canScan, setCanScan] = useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [currentWidget, setCurrentWidget] = useState(widgetTypes.QR_CODE);

  const [isLoggedIn] = useState(!!userInfo);

  useEffect(() => {
    (async () => {
      if (presentationRequest) {
        setDeeplink(presentationRequest.deeplink);
        setQrCode(presentationRequest.qrCode);
      } else if (createPresentationRequest) {
        const response = await createPresentationRequest();
        setDeeplink(response.deeplink);
        setQrCode(response.qrCode);
      }
    })();
  }, [presentationRequest, createPresentationRequest]);

  const shouldShowEmailLink = !!(isLoggedIn && userInfo.email && sendEmail);
  const shouldShowSmsLink = !!(isLoggedIn && userInfo.phone && sendSms);
  const shouldShowLoginLink = !!(!isLoggedIn && goToLogin);
  return (
    <WidgetContainer>
      {
      (currentWidget === widgetTypes.QR_CODE) && (
        <QRCodeWidget
          qrCode={qrCode}
          setCurrentWidget={setCurrentWidget}
          applicationTitle={applicationTitle}
          canScan={canScan}
          deeplink={deeplink}
          goToLogin={goToLogin}
          shouldShowEmailLink={shouldShowEmailLink}
          shouldShowSmsLink={shouldShowSmsLink}
          shouldShowLoginLink={shouldShowLoginLink}
        />
      )
      }
      { (currentWidget === widgetTypes.SMS) && sendSms && (
        <SMSWidget
          userInfo={userInfo}
          sendSms={sendSms}
          canScan={canScan}
          setCurrentWidget={setCurrentWidget}
          deeplink={deeplink}
        />
      )}
      { (currentWidget === widgetTypes.EMAIL) && sendEmail && (
        <EmailWidget
          email={userInfo.email}
          sendEmail={sendEmail}
          canScan={canScan}
          goToLogin={goToLogin}
          deeplink={deeplink}
          setCurrentWidget={setCurrentWidget}
        />
      )}

    </WidgetContainer>
  );
};

export default WidgetHostAndController;
