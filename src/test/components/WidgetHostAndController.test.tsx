import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { clear as clearMockUserAgent, mockUserAgent } from 'jest-useragent-mock';

import WidgetHostAndController, { Props } from '../../components/WidgetHostAndController';
import { useTimeout } from '../../hooks/useTimeout';
import { dummyPresentationRequestResponse } from '../mocks';

const mockStart = jest.fn();
const mockStop = jest.fn();
jest.mock('../../hooks/useTimeout');

const mockUseTimeout = useTimeout as jest.Mock;
mockUseTimeout.mockReturnValue([mockStart, mockStop]);

describe('WidgetHostAndController', () => {
  const dummyUserInfo = { email: 'test@test.com', phone: 'KL5-5555' };

  const dummyCreatePresentationRequestResponse = Promise.resolve(dummyPresentationRequestResponse);

  const mockCreatePresentationRequest = jest.fn()
    .mockResolvedValue(dummyCreatePresentationRequestResponse);
  const mockSendEmail = jest.fn();
  const mockSendSms = jest.fn();
  const mockGoToLogin = jest.fn();

  const defaultProps: Props = {
    userInfo: dummyUserInfo,
    createPresentationRequest: mockCreatePresentationRequest,
    goToLogin: mockGoToLogin,
    sendEmail: mockSendEmail,
    sendSms: mockSendSms,
  };

  const renderWidget = (props: Props = defaultProps) => {
    render(<WidgetHostAndController {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a PresentationRequest on load if one is not passed as a prop', async () => {
    renderWidget();
    await act(async () => { await Promise.resolve(dummyPresentationRequestResponse); });
    expect(mockCreatePresentationRequest).toBeCalled();
  });

  it('does not create a new PresentationRequest if one is passed as a prop', async () => {
    renderWidget({ ...defaultProps, presentationRequest: dummyPresentationRequestResponse });
    expect(mockCreatePresentationRequest).not.toBeCalled();
  });

  it('does not create a new PresentationRequest if createInitialPresentationRequest prop is false', () => {
    renderWidget({ ...defaultProps, createInitialPresentationRequest: false });
    expect(mockCreatePresentationRequest).not.toBeCalled();
  });

  it('sets a timeout to create a new presentationRequest before the old one expires', async () => {
    renderWidget();
    await act(async () => { await Promise.resolve(dummyPresentationRequestResponse); });
    expect(mockStart).toBeCalled();
  });

  it('renders a qr code on desktop', async () => {
    renderWidget();
    const qrCode = await screen.findByAltText('qr code');
    expect(qrCode).toBeInTheDocument();
  });

  it('renders a deeplink button on mobile', async () => {
    mockUserAgent('iPhone');
    renderWidget();
    const button = await screen.findByAltText(`Verify with ${dummyPresentationRequestResponse.holderApp.name}`);

    expect(button).toBeDefined();
    clearMockUserAgent();
  });

  it('renders the sms widget when appropriate', async () => {
    renderWidget();
    const smsButton = await screen.findByText('Get an SMS instead');

    fireEvent.click(smsButton);
    expect(await screen.findByText(`We texted a link to ${dummyUserInfo.phone}.`)).toBeInTheDocument();
  });

  it('renders the email widget when appropriate', async () => {
    renderWidget({ ...defaultProps, userInfo: { email: dummyUserInfo.email } });
    const emailButton = await screen.findByText('Get an email instead');

    fireEvent.click(emailButton);
    expect(await screen.findByText(`We emailed a link to ${dummyUserInfo.email}.`)).toBeInTheDocument();
  });
});
