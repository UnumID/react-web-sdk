import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  PushNotificationOptions,
  ExternalChannelMessageInput,
  PresentationRequestDto,
  HolderApp,
} from '@unumid/types';
import QRCode from 'qrcode';
import invariant from 'tiny-invariant';

import DeeplinkWidget from './DeeplinkWidget';
import Spinner from './Spinner';
import LinkButton from './LinkButton';
import FallbackButton from './FallbackButton';
import {
  FallbackType,
  SuccessResponse,
  UserInfo,
  WidgetType,
  SaasEnvironment,
} from '../types';
import { saasUrls } from '../constants/saasUrls';
import { useTimeout } from '../hooks/useTimeout';
import { UnumIDClient } from '../UnumIDClient';

import './UnumIDWidget.css';
import FallbackResult from './FallbackResult';
import { isDefined } from '../typeguards';
import { shouldNeverHappen } from '../errors';

export interface Props {
  apiKey?: string;
  env?: SaasEnvironment;
  createPresentationRequest?: () => Promise<PresentationRequestDto | void>;
  sendEmail?: (options: ExternalChannelMessageInput) => Promise<SuccessResponse>;
  sendSms?: (options: ExternalChannelMessageInput) => Promise<SuccessResponse>;
  sendPushNotification?: (options: PushNotificationOptions) => Promise<SuccessResponse>;
  goToLogin?: () => void;
  userInfo?: UserInfo;
  presentationRequest?: PresentationRequestDto;
  createInitialPresentationRequest?: boolean;
  userCode?: string;
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
  userCode,
}: Props) => {
  // determines whether to initially show a qr code or a button
  const [canScan] = useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent));
  const [currentWidget, setCurrentWidget] = useState<WidgetType>('DEEPLINK');
  // The PresentationRequest to display
  const [presentationRequest, setPresentationRequest] = useState(presentationRequestProp);
  const [fallbackOptions, setFallbackOptions] = useState<FallbackType[]>([]);
  const [fallbackResultType, setFallbackResultType] = useState<FallbackType>();
  const [fallbackError, setFallbackError] = useState<string | undefined>();
  const [deeplink, setDeeplink] = useState(presentationRequestProp?.deeplink || '');
  const [qrCode, setQrCode] = useState(presentationRequestProp?.qrCode || '');

  const [unumIdClient] = useState<UnumIDClient | undefined>(
    (apiKey && env) ? new UnumIDClient(saasUrls[env], apiKey) : undefined,
  );

  const [isReady, setIsReady] = useState(!!(presentationRequestProp && !userCode));

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

    if (pushToken && (sendPushNotification || unumIdClient)) {
      // it's a single token
      if (!Array.isArray(pushToken)) {
        queue.push('PUSH');
      }

      // it's an array containing at least one token
      if (Array.isArray(pushToken) && pushToken.length > 0) {
        queue.push('PUSH');
      }
    }

    if (phone && (sendSms || unumIdClient)) {
      queue.push('SMS');
    }

    if (email && (sendEmail || unumIdClient)) {
      queue.push('EMAIL');
    }

    if (!isLoggedIn && goToLogin) {
      queue.push('LOGIN');
    }

    setFallbackOptions(queue);
  }, [
    pushToken,
    phone,
    email,
    isLoggedIn,
    goToLogin,
    unumIdClient,
    sendPushNotification,
    sendEmail,
    sendSms,
  ]);

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
    // If no createPresentationRequest function was provided, this function effectively does nothing
    if (!createPresentationRequest) return;

    const response = await createPresentationRequest();

    if (response) {
      setPresentationRequest(response);

      if (!userCode) {
        setDeeplink(response.deeplink || '');
        setQrCode(response.qrCode || '');
        setIsReady(true);
      }
    }
  };

  // A memoized version of triggerPresentationRequestCreation
  // that will not be redefined when this component re-renders
  // and can be reliably passed to other hooks.
  const memoizedTriggerPresentationRequestCreation = useCallback(
    triggerPresentationRequestCreation,
    [createPresentationRequest, userCode],
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

      if (!userCode) {
        setDeeplink(presentationRequestProp.deeplink || '');
        setQrCode(presentationRequestProp.qrCode || '');
        setIsReady(true);
      }
    } else if (createInitialPresentationRequest) {
      // When this component is rendered without a presentationRequest prop,
      // trigger presentationRequest creation if the createInitialPresentationRequest prop is true.
      memoizedTriggerPresentationRequestCreation();
    }
  }, [
    presentationRequestProp,
    memoizedTriggerPresentationRequestCreation,
    createInitialPresentationRequest,
    userCode,
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

  // if a userCode is provided, add it to the deeplink from the presentationRequest as a query param
  // and generate a new qr code from the updated deeplink
  useEffect(() => {
    const addUserCodeToDeeplinkAndQr = async () => {
      if (presentationRequest && userCode) {
        const updatedDeeplink = `${presentationRequest.deeplink}?userCode=${userCode}`;
        setDeeplink(updatedDeeplink);

        // only generate the qr code if it's going to be displayed
        if (canScan) {
          const updatedQrCode = await QRCode.toDataURL(updatedDeeplink, { color: { light: '#0000' } });
          setQrCode(updatedQrCode);
        }

        setIsReady(true);
      }
    };

    addUserCodeToDeeplinkAndQr();
  }, [presentationRequest, userCode, canScan]);

  // display a spinner if the widget isn't ready yet
  if (!isReady) {
    return (
      <div className="unumid-web-sdk-widget">
        <Spinner />
      </div>
    );
  }

  // the presentationRequest should be defined at this point
  invariant(
    isDefined<PresentationRequestDto>(presentationRequest),
    shouldNeverHappen('Missing presentationRequest'),
  );

  // throw if the presentationRequest does not contain holderApp info
  // this should never happen, but the holderApp property is technically optional
  // on the PresentationRequestDto type
  invariant(
    isDefined <Pick<HolderApp, 'name' | 'deeplinkButtonImg' | 'appStoreUrl' | 'playStoreUrl'>>(presentationRequest.holderApp),
    'Missing presentationRequest holder app info. THIS SHOULD NEVER HAPPEN.',
  );

  return (
    <div className="unumid-web-sdk-widget">
      {
      (currentWidget === 'DEEPLINK') && (
        <DeeplinkWidget
          holderApp={presentationRequest?.holderApp}
          deeplink={deeplink}
          qrCode={qrCode}
          canScan={canScan}
          env={env}
          presentationRequestId={presentationRequest?.presentationRequest.id}
          userCode={userCode}
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
        canScan={canScan}
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
