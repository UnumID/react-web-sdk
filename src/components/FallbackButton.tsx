import React, { FC, MouseEventHandler } from 'react';

import { PresentationRequestPostDto, PushNotificationOptions } from '@unumid/types';

import {
  FallbackType,
  ExternalMessageInput,
  SuccessResponse,
  UserInfo,
} from 'types';
import { UnumIDClient } from 'UnumIDClient';
import LinkButton from './LinkButton';

interface Props {
  client?: UnumIDClient;
  fallbackType: FallbackType;
  nextFallback: () => void;
  setFallbackError: (err?: string) => void;
  userInfo?: UserInfo;
  presentationRequest: PresentationRequestPostDto;
  sendEmail?: (options: ExternalMessageInput) => Promise<SuccessResponse>;
  sendSms?: (options: ExternalMessageInput) => Promise<SuccessResponse>;
  sendPushNotification?: (options: PushNotificationOptions) => Promise<SuccessResponse>;
  goToLogin?: () => void;
}

/**
 * Component responsible for rendering a button to trigger the current fallback method.
 */
const FallbackButton: FC<Props> = ({
  client,
  fallbackType,
  nextFallback,
  setFallbackError,
  userInfo,
  presentationRequest,
  sendEmail,
  sendSms,
  sendPushNotification,
  goToLogin,
}) => {
  if (!fallbackType) {
    return null;
  }

  const handleClick: MouseEventHandler = () => {
    switch (fallbackType) {
      case 'EMAIL':
        actuallySendEmail();
        break;
      case 'SMS':
        actuallySendSms();
        break;
      case 'PUSH':
        actuallySendPush();
        break;
      case 'LOGIN': {
        if (goToLogin) {
          goToLogin();
        }
        break;
      }
      default:
        console.log('invalid fallback type');
        break;
    }
    nextFallback();
  };

  // Button text for each fallback type.
  const loginText = <>Log in for more verification options.</>;
  const emailText = <>Get an email instead.</>;
  const smsText = <>Get an SMS instead.</>;
  const pushText = <>Get a push notification instead.</>;

  /**
   * Returns the correct button text depending on the fallback type.
   */
  const renderFallbackText = () => {
    switch (fallbackType) {
      case 'EMAIL':
        return emailText;
      case 'SMS':
        return smsText;
      case 'PUSH':
        return pushText;
      case 'LOGIN': {
        return loginText;
      }
      default:
        console.log('invalid fallback type');
        return null;
    }
  };

  /**
   * Sends a deeplink via email.
   * Uses a custom sendEmail function if availiable
   * Otherwise uses the default provided by the UnumIDClient.
   */
  const actuallySendEmail = async () => {
    // Clear any previous fallback error message.
    setFallbackError(undefined);

    if (!userInfo || !userInfo.email) {
      // We can't send the user an email if we don't have the user's email address.
      console.log('email fallback not available');
      return;
    }

    const { deeplink } = presentationRequest;
    const options: ExternalMessageInput = {
      to: userInfo?.email,
      deeplink,
    };

    if (sendEmail) {
      // If a custom sendEmail function was provided as a prop, use it to send an email.
      try {
        await sendEmail(options);
      } catch (e) {
        console.log('error sending email', e);
        setFallbackError(`Error sending email to ${userInfo.email}.`);
      }
    } else if (client) {
      // If no sendEmail function was provided, use the default UnumIDClient.sendEmail.
      try {
        await client.sendEmail(options);
      } catch (e) {
        console.log('error sending email', e);
        setFallbackError(`Error sending email to ${userInfo.email}.`);
      }
    }
  };

  /**
 * Sends a deeplink via sms.
 * Uses a custom sendSMS function if availiable
 * Otherwise uses the default provided by the UnumIDClient.
 */
  const actuallySendSms = async () => {
    // Clear any previous fallback error message.
    setFallbackError(undefined);

    if (!userInfo || !userInfo.phone) {
      // We can't send the user an SMS if we don't have their mobile phone number.
      console.log('sms fallback not available');
      return;
    }

    const { deeplink } = presentationRequest;

    const options: ExternalMessageInput = {
      to: userInfo.phone,
      deeplink,
    };

    if (sendSms) {
      // If a custom sendSms function was provided as a prop, use it to send an sms.
      try {
        await sendSms(options);
      } catch (e) {
        console.log('error sending sms', e);
        setFallbackError(`Error sending sms to ${userInfo.phone}.`);
      }
    } else if (client) {
      // If no sendSms function was provided, use the default UnumIDClient.sendSms.
      try {
        await client.sendSms(options);
      } catch (e) {
        console.log('error sending sms', e);
        setFallbackError(`Error sending sms to ${userInfo.phone}.`);
      }
    }
  };

  /**
 * Sends a deeplink via push notification (APNS or FCM).
 * Uses a custom sendPushNotification function if availiable
 * Otherwise uses the default provided by the UnumIDClient.
 */
  const actuallySendPush = async () => {
    // Clear any previous fallback error message.
    setFallbackError(undefined);
    if (!userInfo) {
      // we can't send the user a push notification if we don't know who they are
      console.log('push fallback not available.');
      return;
    }

    const { pushToken } = userInfo;

    if (!pushToken) {
      // we can't send the user a push notification if we don't have their device token.
      console.log('push fallback not available.');
      return;
    }

    if (Array.isArray(pushToken) && pushToken.length === 0) {
      // we can't send a push notification to an empty array
      console.log('push fallback not available.');
      return;
    }

    const { deeplink, presentationRequest: { holderAppUuid } } = presentationRequest;

    const options: PushNotificationOptions = {
      token: pushToken,
      deeplink,
      holderAppUuid,
    };

    if (sendPushNotification) {
      // If a custom sendPushNotification function was provided as a prop,
      // use it to send a push notification.
      try {
        await sendPushNotification(options);
      } catch (e) {
        console.log('error sending push notification', e);
        setFallbackError('Error sending push notification.');
      }
    } else if (client) {
      // If a custom sendPushNotification was not provided,
      // use the default UnumIDClient.sendPushNotification.
      try {
        await client.sendPushNotification(options);
      } catch (e) {
        console.log('error sending push notification', e);
        setFallbackError('Error sending push notification.');
      }
    }
  };

  return (
    <div className="fallback-button">
      <LinkButton onClick={handleClick}>
        {renderFallbackText()}
      </LinkButton>
    </div>
  );
};

export default FallbackButton;
