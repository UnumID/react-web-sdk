import React, { FC, useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import WidgetContainer from 'elements/containers/WidgetContainer';
import QRCodeWidget from 'elements/widgets/QRCodeWidget';
import SMSWidget from 'elements/widgets/SMSWidget';
import EmailWidget from 'elements/widgets/EmailWidget';
import {
  EmailData,
  EmailResponse,
  PresentationRequestResponse,
  SmsData,
  SmsResponse,
  UserInfo,
} from 'types';
import { widgetTypes } from 'frwk/ruiFrwkConst';

export interface Props {
  applicationTitle: string;
  createPresentationRequest: () => Promise<PresentationRequestResponse>;
  sendEmail: (options: EmailData) => Promise<EmailResponse>;
  sendSms: (options: SmsData) => Promise<SmsResponse>;
  goToLogin: () => void;
  userInfo: UserInfo;
}

const WidgetHostAndController: FC<Props> = (props: Props) => {
  const [deeplink, setDeeplink] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isSameDevice, setIsSameDevice] = useState(!!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [canScan, setCanScan] = useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [currentWidget, setCurrentWidget] = useState(widgetTypes.QR_CODE);
  // eslint-disable-next-line react/destructuring-assignment
  const [isLoggedIn] = useState(!!props.userInfo);

  useEffect(() => {
    (async () => {
      const { createPresentationRequest } = props;

      // create + send PresentationRequest and save resulting deeplink and qrCode in state
      const presentationRequestResponse = await createPresentationRequest();
      setDeeplink(presentationRequestResponse.deeplink);
      setQrCode(presentationRequestResponse.qrCode);
    })();
  }, [props]);

  const {
    applicationTitle,
    userInfo,
    sendEmail,
    goToLogin,
    sendSms,
  } = props;
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
