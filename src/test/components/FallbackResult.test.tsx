import React from 'react';
import { render, screen } from '@testing-library/react';

import FallbackResult from '../../components/FallbackResult';
import { dummyUserInfo } from '../mocks';

describe('FallbackResult component', () => {
  it('renders push notification text', () => {
    const props = {
      userInfo: dummyUserInfo,
      fallbackType: 'PUSH',
    };

    render(<FallbackResult {...props} />);
    expect(screen.getByText('We sent a push notification to your device.')).toBeInTheDocument();
    expect(screen.getByText('Please click it to continue.')).toBeInTheDocument();
  });

  it('renders email text', () => {
    const props = {
      userInfo: dummyUserInfo,
      fallbackType: 'EMAIL',
    };

    render(<FallbackResult {...props} />);
    expect(screen.getByText(`We emailed a link to ${props.userInfo.email}.`)).toBeInTheDocument();
    expect(screen.getByText('Please click it to continue.')).toBeInTheDocument();
  });

  it('renders sms text', () => {
    const props = {
      userInfo: dummyUserInfo,
      fallbackType: 'SMS',
    };

    render(<FallbackResult {...props} />);
    expect(screen.getByText(`We texted a link to ${props.userInfo.phone}.`)).toBeInTheDocument();
    expect(screen.getByText('Please click it to continue.')).toBeInTheDocument();
  });

  it('renders error message', () => {
    const props = {
      userInfo: dummyUserInfo,
      fallbackType: 'PUSH',
      error: 'Error sending push notification.',
    };
    render(<FallbackResult {...props} />);
    expect(screen.getByText('Error sending push notification.')).toBeInTheDocument();
  });
});
