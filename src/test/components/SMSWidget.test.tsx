import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import SMSWidget, { Props } from '../../components/SMSWidget';
import { widgetTypes } from '../../constants/widgetTypes';

describe('SMSWidget', () => {
  const dummyUserInfo = { email: 'test@test.com', phone: 'KL5-5555' };
  const dummyDeeplink = 'https://unumid.org/unumid/presentationRequest/574e1509-6f3e-49c5-9a8b-c49450c17d45';
  const dummySmsSuccessResponse = Promise.resolve({ success: true });
  const mockSendSms = jest.fn().mockResolvedValue(dummySmsSuccessResponse);
  const mockSetCurrentWidget = jest.fn();

  const defaultProps: Props = {
    userInfo: dummyUserInfo,
    deeplink: dummyDeeplink,
    canScan: true,
    sendSms: mockSendSms,
    setCurrentWidget: mockSetCurrentWidget
  };

  const renderWidget = (props: Props = defaultProps) => {
    render(<SMSWidget {...props} />);
  }

  it('tries to send an sms on load', async () => {
    renderWidget();
    await act(() => dummySmsSuccessResponse);
    expect(mockSendSms).toBeCalled();
  });

  it('renders success test when sending email succeeds', async () => {
    renderWidget();
    expect(await screen.findByText(`We texted a link to ${dummyUserInfo.phone}.`)).toBeInTheDocument();
  });

  it('renders get email instead link', async () => {
    renderWidget();
    const link = await screen.findByText('Get an email instead');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.EMAIL);
  });

  it('renders a back to QR code link if canScan is true', async () => {
    renderWidget();
    const link = await screen.findByText('Back to QR code');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.QR_CODE);
  });

  it('renders a Back to Button link if canScan is false', async () => {
    renderWidget({ ...defaultProps, canScan: false });
    const link = await screen.findByText('Back to Button');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(mockSetCurrentWidget).toBeCalledWith(widgetTypes.QR_CODE);
  });

  it('renders an error message when sending sms fails', async () => {
    mockSendSms.mockRejectedValueOnce(false);
    renderWidget();
    expect(await screen.findByText(`Error sending SMS to ${dummyUserInfo.phone}.`));
  });
});
