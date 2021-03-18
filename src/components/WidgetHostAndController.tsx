import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';

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
import { useInterval } from 'hooks/useInterval';

import './WidgetHostAndController.css';

export interface Props {
  applicationTitle: string;
  createPresentationRequest?: () => Promise<PresentationRequestResponse>;
  sendEmail?: (options: EmailOptions) => Promise<SuccessResponse>;
  sendSms?: (options: SmsOptions) => Promise<SuccessResponse>;
  goToLogin?: () => void;
  userInfo: UserInfo;
  presentationRequest?: PresentationRequestResponse;
  deeplinkImgSrc?: string;
}

const WidgetHostAndController: FC<Props> = ({
  applicationTitle,
  createPresentationRequest,
  sendEmail,
  sendSms,
  goToLogin,
  userInfo,
  presentationRequest,
  deeplinkImgSrc,
}: Props) => {
  const [deeplink, setDeeplink] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isSameDevice, setIsSameDevice] = useState(!!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [canScan, setCanScan] = useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [currentWidget, setCurrentWidget] = useState(widgetTypes.QR_CODE);

  const triggerPresentationRequestCreation = async () => {
    if (createPresentationRequest) {
      const response = await createPresentationRequest();

      if (response) {
        setDeeplink(response.deeplink);
        setQrCode(response.qrCode);
      }
    }
  };

  const memoizedTriggerPresentationRequestCreation = useCallback(
    triggerPresentationRequestCreation,
    [createPresentationRequest],
  );

  const timeUntilExpiration = presentationRequest
    && new Date(presentationRequest.presentationRequest.expiresAt).getTime() - new Date().getTime();
  const oneMinuteBeforeExpiration = timeUntilExpiration && (timeUntilExpiration - 60 * 1000);
  const nineMinutesFromNow = 9 * 60 * 1000;
  const interval = oneMinuteBeforeExpiration || nineMinutesFromNow;

  const [startInterval, stopInterval] = useInterval(
    memoizedTriggerPresentationRequestCreation,
    interval,
  );

  const [isLoggedIn] = useState(!!userInfo);

  useEffect(() => {
    if (presentationRequest) {
      setDeeplink(presentationRequest.deeplink);
      setQrCode(presentationRequest.qrCode);
    } else {
      memoizedTriggerPresentationRequestCreation();
    }
  }, [presentationRequest, memoizedTriggerPresentationRequestCreation]);

  useEffect(() => {
    startInterval();

    return stopInterval();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldShowEmailLink = !!(isLoggedIn && userInfo.email && sendEmail);
  const shouldShowSmsLink = !!(isLoggedIn && userInfo.phone && sendSms);
  const shouldShowLoginLink = !!(!isLoggedIn && goToLogin);
  return (
    <div className="unumid-web-sdk-widget">
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
          deeplinkImgSrc={deeplinkImgSrc}
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
    </div>
  );
};

export default WidgetHostAndController;
