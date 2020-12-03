import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { widgetTypes } from '../../../constants/widgetTypes';
import EmailWidget, { Props } from '../../../elements/widgets/EmailWidget';

describe('EmailWidget', () => {
  const dummyEmail = 'test@test.com';
  const dummyDeeplink = 'https://unumid.org/unumid/presentationRequest/574e1509-6f3e-49c5-9a8b-c49450c17d45';
  const dummyEmailSuccessResponse = Promise.resolve({ success: true });
  const mockSendEmail = jest.fn().mockResolvedValue(dummyEmailSuccessResponse);
  const mockGoToLogin = jest.fn();
  const mockSetCurrentWidget = jest.fn();

  const defaultProps: Props = {
    email: dummyEmail,
    deeplink: dummyDeeplink,
    canScan: true,
    sendEmail: mockSendEmail,
    goToLogin: mockGoToLogin,
    setCurrentWidget: mockSetCurrentWidget,
  };

  const renderWidget = (props: Props = defaultProps) => {
    render(<EmailWidget {...props} />);
  };

  it('tries to send an email on load', async () => {
    renderWidget();
    await act(() => dummyEmailSuccessResponse);
    expect(mockSendEmail).toBeCalled();
  });

  it('renders success text when sending email succeeds', async () => {
    renderWidget();
    expect(await screen.findByText(`We emailed a link to ${dummyEmail}.`)).toBeDefined();
  });

  it('renders a use a different email link', async () => {
    renderWidget();
    expect(await screen.findByText('Use a different email')).toBeDefined();
  });

  it('navigates to login when the use a different email link is clicked', async () => {
    renderWidget();
    const link = await screen.findByText('Use a different email');
    fireEvent.click(link);
    expect(mockGoToLogin).toBeCalled();
  });

  it('renders a Back to QR Code link if canScan is true', async () => {
    renderWidget();
    expect(await screen.findByText('Back to QR code')).toBeDefined();
  });

  it('sets the QR code widget when the back link is clicked', async () => {
    renderWidget();
    const link = await screen.findByText('Back to QR code');
    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.QR_CODE);
  });

  it('renders a Back to Button link when canScan is false', async () => {
    const props = { ...defaultProps, canScan: false };
    renderWidget(props);
    expect(await screen.findByText('Back to Button')).toBeDefined();
  });

  it('sets the QR code widget when the back link is clicked', async () => {
    const props = { ...defaultProps, canScan: false };
    renderWidget(props);
    const link = await screen.findByText('Back to Button');
    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.QR_CODE);
  });

  it('renders an error message when sending email fails', async () => {
    mockSendEmail.mockRejectedValueOnce(false);
    renderWidget();
    expect(await screen.findByText(`Error sending Email to ${dummyEmail}.`)).toBeDefined();
  });
});
