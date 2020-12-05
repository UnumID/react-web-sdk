import React, { FC, useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import WidgetContainer from 'components/WidgetContainer';
import QRCodeWidget from 'components/QRCodeWidget';
import SMSWidget from 'components/SMSWidget';
import EmailWidget from 'components/EmailWidget';
import {
  EmailData,
  EmailResponse,
  PresentationRequestResponse,
  SmsData,
  SmsResponse,
  UserInfo,
} from 'types';
import { widgetTypes } from 'constants/widgetTypes';

export interface Props {
  applicationTitle: string;
  createPresentationRequest: () => Promise<PresentationRequestResponse>;
  sendEmail: (options: EmailData) => Promise<EmailResponse>;
  sendSms: (options: SmsData) => Promise<SmsResponse>;
  goToLogin: () => void;
  userInfo: UserInfo;
}

const WidgetHostAndController: FC<Props> = ({
  applicationTitle,
  createPresentationRequest,
  sendEmail,
  sendSms,
  goToLogin,
  userInfo,
}: Props) => {
  const [deeplink, setDeeplink] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isSameDevice, setIsSameDevice] = useState(!!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [canScan, setCanScan] = useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [currentWidget, setCurrentWidget] = useState(widgetTypes.QR_CODE);

  const [isLoggedIn] = useState(!!userInfo);

  useEffect(() => {
    (async () => {
      // create + send PresentationRequest and save resulting deeplink and qrCode in state
      const response = await createPresentationRequest();
      setDeeplink(response.deeplink);
      setQrCode(response.qrCode);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
          goToLogin={goToLogin}
        />
      )
      }
      { (currentWidget === widgetTypes.SMS) && (
        <SMSWidget
          userInfo={userInfo}
          sendSms={sendSms}
          canScan={canScan}
          setCurrentWidget={setCurrentWidget}
          deeplink={deeplink}
        />
      )}
      { (currentWidget === widgetTypes.EMAIL) && (
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
