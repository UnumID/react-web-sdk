import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { PresentationRequestPostDto, PushNotificationOptions } from '@unumid/types';

import DeeplinkWidget from 'components/DeeplinkWidget';
import Spinner from 'components/Spinner';
import LinkButton from 'components/LinkButton';
import FallbackButton from 'components/FallbackButton';
import {
  EmailOptions,
  FallbackType,
  SmsOptions,
  SuccessResponse,
  UserInfo,
  WidgetType,
  SaasEnvironment,
} from 'types';
import { saasUrls } from 'constants/saasUrls';
import { useTimeout } from 'hooks/useTimeout';
import { UnumIDClient } from 'UnumIDClient';

import './UnumIDWidget.css';
import FallbackResult from './FallbackResult';

export interface Props {
  apiKey: string;
  env: SaasEnvironment;
  createPresentationRequest: () => Promise<PresentationRequestPostDto>;
  sendEmail?: (options: EmailOptions) => Promise<SuccessResponse>;
  sendSms?: (options: SmsOptions) => Promise<SuccessResponse>;
  sendPushNotification?: (options: PushNotificationOptions) => Promise<any>;
  goToLogin?: () => void;
  userInfo?: UserInfo;
  presentationRequest?: PresentationRequestPostDto;
  createInitialPresentationRequest?: boolean;
}

/**
 * Our top-level component exported from this SDK.
 * It manages much of the SDK's state and determines which other components should be rendered.
 */
const UnumIDWidget: FC<Props> = ({
  apiKey,
  env,
  createPresentationRequest,
  sendEmail,
  sendSms,
  sendPushNotification,
  goToLogin,
  userInfo,
  presentationRequest: presentationRequestProp,
  createInitialPresentationRequest = !presentationRequestProp,
}: Props) => {
  // determines whether to initially show a qr code or a button
  const [canScan] = useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [currentWidget, setCurrentWidget] = useState<WidgetType>('DEEPLINK');
  // The PresentationRequest to display
  const [presentationRequest, setPresentationRequest] = useState(presentationRequestProp);
  const [fallbackOptions, setFallbackOptions] = useState<FallbackType[]>([]);
  const [fallbackResultType, setFallbackResultType] = useState<FallbackType>();
  const [fallbackError, setFallbackError] = useState<string | undefined>();

  const [unumIdClient] = useState<UnumIDClient>(new UnumIDClient(saasUrls[env], apiKey));

  // destructure userInfo properties so we can pass them to a useEffect dependency array
  // without worrying about object equality
  const pushToken = userInfo?.pushToken;
  const email = userInfo?.email;
  const phone = userInfo?.phone;
  const isLoggedIn = !!userInfo;

  // Set up our queue of available fallback options
  // based on the information we have about the user.
  useEffect(() => {
    const queue: FallbackType[] = [];

    if (pushToken) {
      queue.push('PUSH');
    }

    if (phone) {
      queue.push('SMS');
    }

    if (email) {
      queue.push('EMAIL');
    }

    if (!isLoggedIn && goToLogin) {
      queue.push('LOGIN');
    }

    setFallbackOptions(queue);
  }, [pushToken, phone, email, isLoggedIn, goToLogin]);

  const nextFallback = () => {
    if (fallbackOptions.length === 0) {
      return;
    }

    setCurrentWidget('FALLBACK_RESULT');
    setFallbackResultType(fallbackOptions[0]);
    const updatedFallbackQueue = fallbackOptions.slice(1);
    setFallbackOptions(updatedFallbackQueue);
  };

  /**
   * Calls the provided createPresentationRequest function.
   * If a value is returned, it will be set as the current presentationRequest to display.
   * If not, an updated presentationRequest prop must be provided when the function completes.
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

  // Determine the delay after which a new presentationRequest should be created,
  // to ensure that an expired request is never displayed to the user.
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
      (currentWidget === 'DEEPLINK') && (
        <DeeplinkWidget
          holderApp={presentationRequest?.holderApp}
          deeplink={presentationRequest?.deeplink}
          qrCode={presentationRequest?.qrCode}
          canScan={canScan}
        />
      )
      }
      {
         currentWidget === 'FALLBACK_RESULT' && fallbackResultType && (
           <FallbackResult
             userInfo={userInfo}
             fallbackType={fallbackResultType}
             error={fallbackError}
           />
         )
      }
      <FallbackButton
        client={unumIdClient}
        fallbackType={fallbackOptions[0]}
        nextFallback={nextFallback}
        setFallbackError={setFallbackError}
        userInfo={userInfo}
        presentationRequest={presentationRequest}
        sendEmail={sendEmail}
        sendSms={sendSms}
        sendPushNotification={sendPushNotification}
        goToLogin={goToLogin}
      />
      {
        currentWidget !== 'DEEPLINK' && (
          <LinkButton onClick={() => setCurrentWidget('DEEPLINK')}>
            Back to { canScan ? 'QR Code' : 'Verification button'}.
          </LinkButton>
        )
      }
    </div>
  );
};

export default UnumIDWidget;
