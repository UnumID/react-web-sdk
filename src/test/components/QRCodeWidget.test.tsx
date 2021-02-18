import React from 'react';

import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import QRCodeWidget, { Props } from '../../components/QRCodeWidget';
import { widgetTypes } from '../../constants/widgetTypes';

describe('QRCodeWidget', () => {
  const mockSetCurrentWidget = jest.fn();
  const mockGoToLogin = jest.fn();
  const dummyQrCode = 'dummy qr code';
  const dummyApplicationTitle = 'Dummy Application Title';
  const dummyDeeplink = 'https://unumid.org/unumid/presentationRequest/574e1509-6f3e-49c5-9a8b-c49450c17d45';

  const defaultProps: Props = {
    applicationTitle: dummyApplicationTitle,
    canScan: true,
    deeplink: dummyDeeplink,
    setCurrentWidget: mockSetCurrentWidget,
    qrCode: dummyQrCode,
    goToLogin: mockGoToLogin,
    shouldShowEmailLink: true,
    shouldShowLoginLink: true,
    shouldShowSmsLink: true,
  };

  const renderWidget = (props: Props = defaultProps) => {
    render(<QRCodeWidget {...props} />);
  };

  it('renders a qr code if canScan is true', async () => {
    renderWidget();
    const qrCode = await screen.findByAltText('qr code');
    expect(qrCode).toBeInTheDocument();
    expect(qrCode).toHaveAttribute('src', dummyQrCode);
  });

  it('renders a deeplink button if canScan is false', async () => {
    renderWidget({ ...defaultProps, canScan: false });
    const button = await screen.findByText(`Verify with ${dummyApplicationTitle}`);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(button).toHaveAttribute('href', dummyDeeplink);
    expect(button).toHaveAttribute('target', '_blank');
  });

  it('renders Unum ID branding with the deeplink button', async () => {
    renderWidget({ ...defaultProps, canScan: false });
    const branding = await screen.findByAltText('Powered by Unum ID');
    expect(branding).toBeInTheDocument();
  });

  it('renders a login link if there is no logged in user', async () => {
    renderWidget();
    const link = await screen.findByText('Log in with your email address for more authentication options');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockGoToLogin).toBeCalled();
  });

  it('does not render a login link if shouldShowLoginLink is false', async () => {
    renderWidget({ ...defaultProps, shouldShowLoginLink: false });
    const link = await waitFor(() => screen.queryByText('Log in with your email address for more authentication options'));
    expect(link).not.toBeInTheDocument();
  });

  it('does not render a login link if there is no goToLogin function', async () => {
    renderWidget({ ...defaultProps, goToLogin: undefined });
    const link = await waitFor(() => screen.queryByText('Log in with your email address for more authentication options'));
    expect(link).not.toBeInTheDocument();
  });

  it('renders sms fallback link if shouldShowSmsLink is true', async () => {
    renderWidget({ ...defaultProps, shouldShowSmsLink: true });
    const link = await screen.findByText('Get an SMS instead');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.SMS);
  });

  it('renders email fallback link if shouldShowEmailLink is true', async () => {
    renderWidget({ ...defaultProps, shouldShowEmailLink: true });
    const link = await screen.findByText('Get an email instead');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.EMAIL);
  });

  it('does not render email fallback link if shouldShowEmailLink is false', async () => {
    renderWidget({ ...defaultProps, shouldShowEmailLink: false });
    const link = await screen.queryByText('Get an email instead');
    expect(link).not.toBeInTheDocument();
  });

  it('does not render sms fallback link if shouldShowSmsLink is false', async () => {
    renderWidget({ ...defaultProps, shouldShowSmsLink: false });
    const link = await screen.queryByText('Get an sms instead');
    expect(link).not.toBeInTheDocument();
  });
});
