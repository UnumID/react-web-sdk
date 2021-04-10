import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { PresentationRequestPostDto } from '@unumid/types';

import QRCodeWidget from 'components/DeeplinkWidget';
import SMSWidget from 'components/SMSWidget';
import EmailWidget from 'components/EmailWidget';
import Spinner from 'components/Spinner';
import {
  EmailOptions,
  SmsOptions,
  SuccessResponse,
  UserInfo,
} from 'types';
import { widgetTypes } from 'constants/widgetTypes';
import { useTimeout } from 'hooks/useTimeout';

import './UnumIDWidget.css';

export interface Props {
  createPresentationRequest: () => Promise<PresentationRequestPostDto>;
  sendEmail?: (options: EmailOptions) => Promise<SuccessResponse>;
  sendSms?: (options: SmsOptions) => Promise<SuccessResponse>;
  goToLogin?: () => void;
  userInfo?: UserInfo;
  presentationRequest?: PresentationRequestPostDto;
  createInitialPresentationRequest?: boolean;
}

const UnumIDWidget: FC<Props> = ({
  createPresentationRequest,
  sendEmail,
  sendSms,
  goToLogin,
  userInfo,
  presentationRequest: presentationRequestProp,
  createInitialPresentationRequest = !presentationRequestProp,
}: Props) => {
  // determines whether to initially show a qr code or a button
  const [canScan] = useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [currentWidget, setCurrentWidget] = useState(widgetTypes.QR_CODE);
  // The PresentationRequest to display
  const [presentationRequest, setPresentationRequest] = useState(presentationRequestProp);

  /**
   * Calls the provided createPresentationRequest function.
   * If a value is returned, it will be set as the current presentationRequest to display.
   */
  const triggerPresentationRequestCreation = async () => {
    const response = await createPresentationRequest();

    if (response) {
      setPresentationRequest(response);
    }
  };

  // A memoized version of triggerPresentationRequestCreation
  // that will not be redefined when this component re-renders
  // and can be reliably passed to other hooks.
  const memoizedTriggerPresentationRequestCreation = useCallback(
    triggerPresentationRequestCreation,
    [createPresentationRequest],
  );

  const expiresAt = presentationRequest?.presentationRequest?.expiresAt as unknown as string;
  const timeUntilExpiration = presentationRequest
    && new Date(expiresAt).getTime() - new Date().getTime();
  const oneMinuteBeforeExpiration = timeUntilExpiration && (timeUntilExpiration - 60 * 1000);
  const nineMinutesFromNow = 9 * 60 * 1000;
  const delay = oneMinuteBeforeExpiration || nineMinutesFromNow;

  const [startTimeout, stopTimeout] = useTimeout(memoizedTriggerPresentationRequestCreation);

  useEffect(() => {
    if (presentationRequestProp) {
      // When this component is rendered with a new presentationRequest prop,
      // update the presentationRequest state.
      setPresentationRequest(presentationRequestProp);
    } else if (createInitialPresentationRequest) {
      // When this component is rendered without a presentationRequest prop,
      // trigger presentationRequest creation if the createInitialPresentationRequest prop is true.
      memoizedTriggerPresentationRequestCreation();
    }
  }, [
    presentationRequestProp,
    memoizedTriggerPresentationRequestCreation,
    createInitialPresentationRequest,
  ]);

  useEffect(() => {
    // Stop any previously set timeout.
    stopTimeout();
    // Schedule a new presentationRequest to be created after a delay.
    // (To ensure that the current one is replaced before it expires.)
    startTimeout(delay);

    // Stop the excurrent timeout when this component is unmounted.
    return stopTimeout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentationRequest]);

  const shouldShowEmailLink = !!(userInfo?.email && sendEmail);
  const shouldShowSmsLink = !!(userInfo?.phone && sendSms);
  const shouldShowLoginLink = !!(!userInfo && goToLogin);

  // This component can't display a presentationRequest if it doesn't have one.
  // Show a spinner instead.
  if (!presentationRequest) {
    return (
      <div className="unumid-web-sdk-widget">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="unumid-web-sdk-widget">
      {
      (currentWidget === widgetTypes.QR_CODE) && (
        <QRCodeWidget
          holderApp={presentationRequest?.holderApp}
          deeplink={presentationRequest?.deeplink}
          qrCode={presentationRequest?.qrCode}
          setCurrentWidget={setCurrentWidget}
          canScan={canScan}
          goToLogin={goToLogin}
          shouldShowEmailLink={shouldShowEmailLink}
          shouldShowSmsLink={shouldShowSmsLink}
          shouldShowLoginLink={shouldShowLoginLink}
        />
      )
      }
      { (currentWidget === widgetTypes.SMS) && sendSms && userInfo && (
        <SMSWidget
          userInfo={userInfo}
          sendSms={sendSms}
          canScan={canScan}
          setCurrentWidget={setCurrentWidget}
          deeplink={presentationRequest.deeplink}
        />
      )}
      { (currentWidget === widgetTypes.EMAIL) && sendEmail && userInfo && (
        <EmailWidget
          email={userInfo.email}
          sendEmail={sendEmail}
          canScan={canScan}
          goToLogin={goToLogin}
          deeplink={presentationRequest.deeplink}
          setCurrentWidget={setCurrentWidget}
        />
      )}
    </div>
  );
};

export default UnumIDWidget;
