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
import { useTimeout } from 'hooks/useTimeout';

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
  createInitialPresentationRequest?: boolean;
}

const WidgetHostAndController: FC<Props> = ({
  applicationTitle,
  createPresentationRequest,
  sendEmail,
  sendSms,
  goToLogin,
  userInfo,
  presentationRequest: presentationRequestProp,
  deeplinkImgSrc,
  createInitialPresentationRequest = !presentationRequestProp,
}: Props) => {
  const [deeplink, setDeeplink] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isSameDevice, setIsSameDevice] = useState(!!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [canScan, setCanScan] = useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [currentWidget, setCurrentWidget] = useState(widgetTypes.QR_CODE);
  const [presentationRequest, setPresentationRequest] = useState(presentationRequestProp);

  const triggerPresentationRequestCreation = async () => {
    if (createPresentationRequest) {
      const response = await createPresentationRequest();

      if (response) {
        setPresentationRequest(response);
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
  const delay = oneMinuteBeforeExpiration || nineMinutesFromNow;

  const [startTimeout, stopTimeout] = useTimeout(memoizedTriggerPresentationRequestCreation);

  const [isLoggedIn] = useState(!!userInfo);

  useEffect(() => {
    if (presentationRequestProp) {
      setDeeplink(presentationRequestProp.deeplink);
      setQrCode(presentationRequestProp.qrCode);
    } else if (createInitialPresentationRequest) {
      memoizedTriggerPresentationRequestCreation();
    }
  }, [
    presentationRequestProp,
    memoizedTriggerPresentationRequestCreation,
    createInitialPresentationRequest,
  ]);

  useEffect(() => {
    startTimeout(delay);

    return stopTimeout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentationRequest]);

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
