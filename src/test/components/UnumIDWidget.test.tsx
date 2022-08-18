import * as React from 'react';
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { clear as clearMockUserAgent, mockUserAgent } from 'jest-useragent-mock';
import * as qrcode from 'qrcode';

import { PresentationRequestDto } from '@unumid/types';
import UnumIDWidget, { Props } from '../../components/UnumIDWidget';
import { useTimeout } from '../../hooks/useTimeout';
import { dummyPresentationRequestResponse } from '../mocks';
import { DeepLinkButtonRole } from '../../components/DeeplinkButton';
import { walletUrls } from '../../constants/saasUrls';
import {
  ContinueToWebWalletRole,
  deepLinkAutoCloseTimer,
  QRCodeRole,
} from '../../components/QRCode';
import { SaasEnvironment } from '../../types';

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
  const saasEnv = 'development';

  const defaultProps: Props = {
    apiKey: 'dummy api key',
    env: saasEnv,
    userInfo: dummyUserInfo,
    createPresentationRequest: mockCreatePresentationRequest,
    goToLogin: mockGoToLogin,
    sendEmail: mockSendEmail,
    sendSms: mockSendSms,
  };

  const renderWidget = (props: Props = defaultProps) => {
    render(<UnumIDWidget {...props} />);
  };

  function webWalletLink(
    presentationRequest: PresentationRequestDto,
    env: SaasEnvironment | undefined,
    qrLink?: boolean,
  ): string|undefined {
    return env ? `${walletUrls[env]}/request?presentationRequestId=${presentationRequest.presentationRequest.id}&autoClose=${deepLinkAutoCloseTimer}${qrLink ? '&link=qr' : ''}` : undefined;
  }

  function queryDeeplinkButton() {
    const deepLinkButton = screen.queryByRole(DeepLinkButtonRole);
    if (deepLinkButton) {
      const altText = `Verify with ${dummyPresentationRequestResponse.holderApp?.name}`;
      const href = dummyPresentationRequestResponse.deeplink;
      const src = dummyPresentationRequestResponse.holderApp?.deeplinkButtonImg;

      expect(deepLinkButton).toHaveAttribute('href', href);

      const img = deepLinkButton.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', altText);
      expect(img).toHaveAttribute('src', src);
    }

    return deepLinkButton;
  }

  function queryContinueWithOneClickButton(env: SaasEnvironment | undefined) {
    const continueToWebWalletButton = screen.queryByRole(ContinueToWebWalletRole);
    if (env) {
      expect(continueToWebWalletButton).toBeInTheDocument();
      const altText = `Verify with ${dummyPresentationRequestResponse.holderApp?.name}`;
      const src = dummyPresentationRequestResponse.holderApp?.deeplinkButtonImg;
      const href = webWalletLink(dummyPresentationRequestResponse, env);
      expect(href).not.toBeUndefined();
      expect(continueToWebWalletButton).toHaveAttribute('href', href);

      const img = continueToWebWalletButton?.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', altText);
      expect(img).toHaveAttribute('src', src);
    } else {
      expect(continueToWebWalletButton).not.toBeInTheDocument();
    }
    return continueToWebWalletButton;
  }

  function queryQRCode(env: SaasEnvironment | undefined) {
    const qrCode = screen.queryByRole(QRCodeRole);
    if (qrCode) {
      const altText = `QR Code to Verify with ${dummyPresentationRequestResponse.holderApp?.name}`;
      const src = dummyPresentationRequestResponse.qrCode;
      const href = webWalletLink(dummyPresentationRequestResponse, env, true);
      if (env) {
        expect(qrCode).toHaveAttribute('href', href);
      }
      const img = qrCode.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', altText);
      expect(img).toHaveAttribute('src', src);
    }
    return qrCode;
  }

  // Expects these elements to be displayed on the screen
  // Checks for each element if the element is being displayed correctly too
  async function expectOnScreen(
    deeplinkButton: boolean,
    qrCode: boolean,
    continueToWebWallet: SaasEnvironment | undefined,
  ) {
    await waitFor(() => {
      const expectations = [
        // [expected, element, name] Dont know how to use name in error messages without jest throwing a fit
        [deeplinkButton, queryDeeplinkButton(), 'DeepLink Button'],
        [qrCode, queryQRCode(continueToWebWallet), 'QR Code'],
        [Boolean(continueToWebWallet), queryContinueWithOneClickButton(continueToWebWallet), '1-Click to Web Wallet'],
      ] as [boolean, HTMLElement, string][];
      expectations.forEach(([expected, element]) => {
        const toExpect = expect(element);
        (expected ? toExpect.not : toExpect).toBeNull();
        (expected ? toExpect : toExpect.not).toBeInTheDocument();
      });
    });
  }

  afterEach(() => {
    jest.clearAllMocks();
    clearMockUserAgent();
  });

  it('creates a PresentationRequest on load if one is not passed as a prop', async () => {
    renderWidget();
    await act(async () => { await dummyPresentationRequestResponse; });
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
    await act(async () => { await dummyPresentationRequestResponse; });
    expect(mockStart).toBeCalled();
  });

  it('renders a qr code on desktop', async () => {
    const env = 'sandbox';
    act(() => {
      renderWidget({
        ...defaultProps,
        env,
      });
    });
    await expectOnScreen(false, true, env);
  });

  it('renders a qr code without web wallet link if no environment is provided', async () => {
    act(() => {
      renderWidget({
        ...defaultProps,
        env: undefined,
      });
    });
    await expectOnScreen(false, true, undefined);
  });

  it('renders a deeplink button on mobile and not a QR code', async () => {
    mockUserAgent('iPhone');
    renderWidget();
    await expectOnScreen(true, false, undefined);
  });

  it('renders the push notification fallback option when appropriate', async () => {
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

    const displayedQrCode = await screen.findByRole(QRCodeRole).then((qrCode) => qrCode.querySelector('img')) as HTMLImageElement;
    const deeplinkWithUserCode = `${dummyPresentationRequestResponse.deeplink}?userCode=${userCode}`;
    expect(qrcode.toDataURL).toBeCalledWith(
      deeplinkWithUserCode,
      { color: { light: '#0000' } },
    );
    expect(displayedQrCode.src).toEqual(dummyQrCodeDataUrl);
  });
});
