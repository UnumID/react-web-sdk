import React from 'react';

import { WidgetContext } from '../../../types';
import * as widgetStateContext from '../../../context/widgetStateContext';
import QRCodeWidget, { Props } from '../../../elements/widgets/QRCodeWidget';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { widgetTypes } from '../../../frwk/ruiFrwkConst';

describe('QRCodeWidget', () => {
  const mockSetCurrentWidget = jest.fn();
  const mockGoToLogin = jest.fn();
  const dummyQrCode = 'dummy qr code';
  const dummyApplicationTitle = 'Dummy Application Title';
  const dummyUserInfo = { email: 'test@test.com', phone: 'KL5-5555' };
  const dummyDeeplink = 'https://unumid.org/unumid/presentationRequest/574e1509-6f3e-49c5-9a8b-c49450c17d45';

  const defaultProps: Props = {
    applicationTitle: dummyApplicationTitle,
    canScan: true,
    isLoggedIn: false,
    userInfo: {},
    deeplink: dummyDeeplink,
    setCurrentWidget: mockSetCurrentWidget,
    qrCode: dummyQrCode,
    goToLogin: mockGoToLogin
  };

  const renderWidget = (props: Props = defaultProps) => {
    render(<QRCodeWidget {...props} />);
  }

  it('renders a qr code if canScan is true', async () => {
    renderWidget();
    const qrCode = await screen.findByAltText('qr code');
    expect(qrCode).toBeInTheDocument();
    expect(qrCode).toHaveAttribute('src', dummyQrCode);
  });

  it('renders a deeplink button if canScan is false', async () => {
    renderWidget({ ...defaultProps, canScan: false });
    const button = await screen.findByText(`Continue with ${dummyApplicationTitle} App`);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(button).toHaveAttribute('href', dummyDeeplink);
    expect(button).toHaveAttribute('target', '_blank');
  });

  it('renders a login link if there is no logged in user', async () => {
    renderWidget();
    const link = await screen.findByText('Log in with your email address for more authentication options');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockGoToLogin).toBeCalled();
  });

  it('does not render a login link if there is a logged in user', async () => {
    renderWidget({ ...defaultProps, isLoggedIn: true, userInfo: dummyUserInfo });
    const link = await waitFor(() => screen.queryByText('Log in with your email address for more authentication options'));
    expect(link).not.toBeInTheDocument();
  });

  it('renders sms fallback link if there is a logged in user with a phone nubmer', async () => {
    renderWidget({ ...defaultProps, isLoggedIn: true, userInfo: dummyUserInfo });
    const link = await screen.findByText('Get an SMS instead');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.SMS);
  });

  it('renders email fallback link if there is a logged in user without a phone number', async () => {
    renderWidget({ ...defaultProps, isLoggedIn: true, userInfo: { email: 'test@test.com' } });
    const link  = await screen.findByText('Get an email instead');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.EMAIL);
  });

  it('does not render email or sms options if there is no logged in user', async () => {
    renderWidget();
    const emailLink = await waitFor(() => screen.queryByText('Get an email instead'));
    const smsLink = await waitFor(() => screen.queryByText('Get an SMS instead'));

    expect(emailLink).not.toBeInTheDocument();
    expect(smsLink).not.toBeInTheDocument();
  });
});
