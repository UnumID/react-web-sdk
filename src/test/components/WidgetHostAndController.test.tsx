import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { clear as clearMockUserAgent, mockUserAgent } from 'jest-useragent-mock';

import WidgetHostAndController, { Props } from '../../components/WidgetHostAndController';

describe('WidgetHostAndController', () => {
  const dummyApplicationTitle = 'Dummy Application Title';
  const dummyUserInfo = { email: 'test@test.com', phone: 'KL5-5555' };
  const dummyPresentationRequestResponse = {
    presentationRequest: {
      uuid: 'a930334e-9046-43f3-b668-e8b8beaefba2',
      createdAt: new Date('2020-12-02T23:01:30.164Z'),
      updatedAt: new Date('2020-12-02T23:01:30.164Z'),
      expiresAt: new Date('2020-12-02T23:11:30.164Z'),
      verifier: 'did:unum:a40e162e-3297-4834-a1a3-a15e96554fac',
      credentialRequests: [
        {
          type: 'DummyCredential',
          issuers: [
            'did:unum:c1dc61eb-6a6a-43c5-8a85-f7e03ded890d',
          ],
          required: true,
        },
      ],
      proof: {
        signatureValue: 'iKx1CJMMrpAHb9Qtv3rB5ugiqZv7URG8P8WYrUvrAgWTbKAhihMjNSegtAYv6kHa8dnypZHbfEfjAbruvy54Co47bhC3iWHyg4',
        created: '2020-08-21T00:58:58.140Z',
        type: 'secp256r1Signature2020',
        verificationMethod: 'did:unum:66e030cf-96b5-4a40-84c8-7bbbd442b81f#9a0e0366-cd38-4f3c-9030-f413802ad7ca',
        proofPurpose: 'assertionMethod',
      },
      metadata: {},
      holderAppUuid: '20cdb5bd-e263-4d22-aa0a-0606818d1ab8',
    },
    verifier: {
      name: 'ACME, Inc. Verifier',
      did: 'did:unum:a40e162e-3297-4834-a1a3-a15e96554fac',
      url: 'https://customer-api.dev-unumid.org/presentationRequest',
    },
    issuers: {
      'did:unum:c1dc61eb-6a6a-43c5-8a85-f7e03ded890d': {
        name: 'Witting, Simonis and Hane Issuer',
        did: 'did:unum:c1dc61eb-6a6a-43c5-8a85-f7e03ded890d',
      },
    },
    deeplink: 'https://unumid.org/unumid/presentationRequest/a930334e-9046-43f3-b668-e8b8beaefba2',
    qrCode: 'data:image/png;base64,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',
  };

  const dummyCreatePresentationRequestResponse = Promise.resolve(dummyPresentationRequestResponse);
  const mockCreatePresentationRequest = jest.fn()
    .mockResolvedValue(dummyCreatePresentationRequestResponse);
  const mockSendEmail = jest.fn();
  const mockSendSms = jest.fn();
  const mockGoToLogin = jest.fn();

  const defaultProps: Props = {
    applicationTitle: dummyApplicationTitle,
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
    await act(() => dummyCreatePresentationRequestResponse);
    expect(mockCreatePresentationRequest).toBeCalled();
  });

  it('does not create a new PresentationRequest if one is passed as a prop', async () => {
    renderWidget({ ...defaultProps, presentationRequest: dummyPresentationRequestResponse });
    expect(mockCreatePresentationRequest).not.toBeCalled();
  });

  it('does not create a presentaionRequest if createPresentationRequest is not passed', async () => {
    renderWidget({ ...defaultProps, createPresentationRequest: undefined });
    expect(mockCreatePresentationRequest).not.toBeCalled();
  });

  it('renders a qr code on desktop', async () => {
    renderWidget();
    const qrCode = await screen.findByAltText('qr code');
    expect(qrCode).toBeInTheDocument();
  });

  it('renders a deeplink button on mobile', async () => {
    mockUserAgent('iPhone');
    renderWidget();
    const button = await screen.findByText(`Verify with ${dummyApplicationTitle}`);

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
