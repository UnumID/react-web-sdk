import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { clear as clearMockUserAgent, mockUserAgent } from 'jest-useragent-mock';
import qrcode from 'qrcode';

import UnumIDWidget, { Props } from '../../components/UnumIDWidget';
import { useTimeout } from '../../hooks/useTimeout';
import { dummyPresentationRequestResponse } from '../mocks';

const mockStart = jest.fn();
const mockStop = jest.fn();
jest.mock('../../hooks/useTimeout');
jest.mock('../../UnumIDClient');
jest.mock('qrcode');

const mockUseTimeout = useTimeout as jest.Mock;
mockUseTimeout.mockReturnValue([mockStart, mockStop]);

describe('UnumIDWidget', () => {
  const dummyUserInfo = { email: 'test@test.com', phone: 'KL5-5555' };

  const dummyCreatePresentationRequestResponse = Promise.resolve(dummyPresentationRequestResponse);

  const mockCreatePresentationRequest = jest.fn()
    .mockResolvedValue(dummyCreatePresentationRequestResponse);
  const mockSendEmail = jest.fn();
  const mockSendSms = jest.fn();
  const mockGoToLogin = jest.fn();

  const defaultProps: Props = {
    apiKey: 'dummy api key',
    env: 'development',
    userInfo: dummyUserInfo,
    createPresentationRequest: mockCreatePresentationRequest,
    goToLogin: mockGoToLogin,
    sendEmail: mockSendEmail,
    sendSms: mockSendSms,
  };

  const renderWidget = (props: Props = defaultProps) => {
    render(<UnumIDWidget {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
    clearMockUserAgent();
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

  it('does not create a new PresentationRequest if no createPresentationRequest prop was provided', async () => {
    renderWidget({ ...defaultProps, createPresentationRequest: undefined });
    expect(mockCreatePresentationRequest).not.toBeCalled();
  });

  it('sets a timeout to create a new presentationRequest before the old one expires', async () => {
    renderWidget();
    await act(async () => { await Promise.resolve(dummyPresentationRequestResponse); });
    expect(mockStart).toBeCalled();
  });

  it('renders a qr code on desktop', async () => {
    renderWidget();
    const displayedQrCode = await screen.findByAltText('qr code');
    expect(displayedQrCode).toBeInTheDocument();
  });

  it('renders a deeplink button on mobile', async () => {
    mockUserAgent('iPhone');
    renderWidget();
    const button = await screen.findByAltText(`Verify with ${dummyPresentationRequestResponse.holderApp?.name}`);

    expect(button).toBeDefined();
  });

  it('renders the push notfication fallback option when appropriate', async () => {
    const props: Props = {
      ...defaultProps,
      userInfo: {
        pushToken: {
          provider: 'FCM',
          value: 'test token',
        },
      },
    };
    renderWidget(props);
    const pushButton = await screen.findByText('Get a push notification instead.');

    fireEvent.click(pushButton);
    expect(await screen.findByText('We sent a push notification to your device.')).toBeInTheDocument();
  });

  it('renders the sms fallback option when appropriate', async () => {
    renderWidget();
    const smsButton = await screen.findByText('Get an SMS instead.');

    fireEvent.click(smsButton);
    expect(await screen.findByText(`We texted a link to ${dummyUserInfo.phone}.`)).toBeInTheDocument();
  });

  it('renders the email fallback option when appropriate', async () => {
    renderWidget({ ...defaultProps, userInfo: { email: dummyUserInfo.email } });
    const emailButton = await screen.findByText('Get an email instead.');

    fireEvent.click(emailButton);
    expect(await screen.findByText(`We emailed a link to ${dummyUserInfo.email}.`)).toBeInTheDocument();
  });

  it('adds a provided userCode to the deeplink as a query param', async () => {
    mockUserAgent('iPhone');
    const userCode = 'test-user-code';
    renderWidget({
      ...defaultProps,
      presentationRequest: dummyPresentationRequestResponse,
      userCode,
    });

    const button = await screen.findByAltText(`Verify with ${dummyPresentationRequestResponse.holderApp?.name}`);
    const anchor = button.closest('a');
    expect(anchor?.href).toEqual(`${dummyPresentationRequestResponse.deeplink}?userCode=${userCode}`);
  });

  it('generates and displays a new qr code containing the userCode', async () => {
    const userCode = 'test-user-code';
    const dummyQrCodeDataUrl = 'data:image/png;base64,test-qr-code';
    (qrcode.toDataURL as jest.Mock).mockResolvedValueOnce(dummyQrCodeDataUrl);
    renderWidget({
      ...defaultProps,
      presentationRequest: dummyPresentationRequestResponse,
      userCode,
    });

    const displayedQrCode = await screen.findByAltText('qr code') as HTMLImageElement;
    const deeplinkWithUserCode = `${dummyPresentationRequestResponse.deeplink}?userCode=${userCode}`;
    expect(qrcode.toDataURL).toBeCalledWith(
      deeplinkWithUserCode,
      { color: { light: '#0000' } },
    );
    expect(displayedQrCode.src).toEqual(dummyQrCodeDataUrl);
  });
});
