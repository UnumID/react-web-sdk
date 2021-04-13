import React, { FC } from 'react';

import { FallbackType, UserInfo } from 'types';
import ErrorMessage from 'components/ErrorMessage';

interface Props {
  userInfo?: UserInfo;
  error?: string;
  fallbackType: FallbackType;
}

/**
 * Component responsible for showing the result of sending a deep link via a fallback method.
 */
const FallbackResult: FC<Props> = ({ userInfo, fallbackType, error }) => {
  // Text for each fallback type.
  const pushText = <>We sent a push notification to your device.</>;
  const smsText = <>We texted a link to {userInfo?.phone}.</>;
  const emailText = <>We emailed a link to {userInfo?.email}.</>;

  // Renders text according to the fallback type.
  const renderFirstLine = () => {
    switch (fallbackType) {
      case 'EMAIL':
        return emailText;
      case 'SMS':
        return smsText;
      case 'PUSH':
        return pushText;
      default:
        console.log('invalid fallback type');
        return null;
    }
  };

  return (
    <div className="fallback-result">
      {
        error
          ? (
            <ErrorMessage>{error}</ErrorMessage>
          )
          : (
            <>
              <div>{renderFirstLine()}</div>
              <div style={{ fontWeight: 'bold' }}>Please click it to continue.</div>
            </>
          )
      }
    </div>
  );
};

export default FallbackResult;
