import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { act } from 'react-dom/test-utils';

import {
  DeeplinkObject, CustomerContext, PresentationRequest,
} from 'types';
import WidgetHostAndController from 'elements/widgets/WidgetHostAndController';
import * as presentation from 'context/presentation';
import * as emailSrv from 'context/sendEmail';
import * as smsSrv from 'context/sendSms';

let widgetHost: ShallowWrapper<Record<string, unknown>>;

const renderWidgetHost = (custCtx: CustomerContext, input: PresentationRequest): void => {
  widgetHost = render(<WidgetHostAndController
    custContext={custCtx}
    presentationRequest={input}
  />);
};

const mockPresentationRequest = (): void => {
  jest
    .spyOn(presentation, 'getPresentation')
    .mockImplementation((): DeeplinkObject => ({
      uuid: '99bfd603-00c1-4bdc-9951-f2d8cc3fd07a',
      verifier: 'did:unum:43c27ff5-f622-4d14-9a57-da250187a267',
      deeplink: 'http://www.unumid.org/e0a9f115-b9c8-4799-b775-8f96aafcd1d9',
      qrCode: 'https://s3-us-west-1.amazonaws.com/lobqrcodes/324ea164-9be0-4e88-ac78-1e6acfc1a54e',
    }));
};

const mockSendEmail = (emailResp): void => {
  jest
    .spyOn(emailSrv, 'sendEmail')
    .mockImplementation(() => emailResp);
};

const mockSendSMS = (smsResp): void => {
  jest
    .spyOn(smsSrv, 'sendSms')
    .mockImplementation(() => smsResp);
};

describe('WidgetHostAndController', () => {
  const btnLbl = `Continue with ${process.env.REACT_APP_APPLICATION_TITLE} App`;
  const custContext: CustomerContext = {
    emailId: '',
    phoneNo: '',
  };

  const presentationInput: PresentationRequest = {
    credentialRequests: [
      {
        type: 'DummyCredential',
        issuers: [
          'did:unum:042b9089-9ee9-4217-844f-b01965cf569a',
        ],
      },
    ],
    holderAppUuid: 'a91a5574-e338-46bd-9405-3a72acbd1b6a',
  };

  beforeAll(() => {
    mockPresentationRequest();
  });

  describe('render without customer context', () => {
    it('renders QRCodeWidget with QRCode component - canScan not defined', async () => {
      await act(async () => {
        await renderWidgetHost(custContext, presentationInput);
      });

      expect(widgetHost.getByText('To continue, scan this QR code')).toBeDefined();
      expect(widgetHost.getByText('Log in with your email address for more authentication options')).toBeDefined();

      expect(widgetHost.queryByText(btnLbl)).toBeNull();
      expect(widgetHost.queryByText('Get an SMS instead')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();

      const loginLnk = widgetHost.getByText('Log in with your email address for more authentication options');
      fireEvent.click(loginLnk);
      expect(window.location.href).toBe(`http://localhost/${process.env.REACT_APP_LOGIN_PAGE}`);
    });

    it('renders QRCodeWidget with QRCode component - canScan=true', async () => {
      custContext.canScan = true;
      await act(async () => {
        await renderWidgetHost(custContext, presentationInput);
      });

      expect(widgetHost.getByText('To continue, scan this QR code')).toBeDefined();
      expect(widgetHost.getByText('Log in with your email address for more authentication options')).toBeDefined();

      expect(widgetHost.queryByText(btnLbl)).toBeNull();
      expect(widgetHost.queryByText('Get an SMS instead')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();

      const loginLnk = widgetHost.getByText('Log in with your email address for more authentication options');
      fireEvent.click(loginLnk);
      expect(window.location.href).toBe(`http://localhost/${process.env.REACT_APP_LOGIN_PAGE}`);
    });

    it('renders QRCodeWidget with Button - canScan=false', async () => {
      custContext.canScan = false;
      await act(async () => {
        await renderWidgetHost(custContext, presentationInput);
      });

      expect(widgetHost.getByText(btnLbl)).toBeDefined();
      expect(widgetHost.getByText('Log in with your email address for more authentication options')).toBeDefined();

      expect(widgetHost.queryByText('To continue, scan this QR code')).toBeNull();
      expect(widgetHost.queryByText('Get an SMS instead')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();

      const loginLnk = widgetHost.getByText('Log in with your email address for more authentication options');
      fireEvent.click(loginLnk);
      expect(window.location.href).toBe(`http://localhost/${process.env.REACT_APP_LOGIN_PAGE}`);

      expect(widgetHost.getByText(btnLbl).href).toBe('http://www.unumid.org/e0a9f115-b9c8-4799-b775-8f96aafcd1d9');
    });
  });

  describe('render with customer context - email id and canScan=true', () => {
    it('renders QRCodeWidget with QRCode component', async () => {
      custContext.canScan = true;
      custContext.emailId = 'abc@test.com';
      await act(async () => {
        await renderWidgetHost(custContext, presentationInput);
      });

      expect(widgetHost.getByText('To continue, scan this QR code')).toBeDefined();
      expect(widgetHost.getByText('Get an email instead')).toBeDefined();

      expect(widgetHost.queryByText(btnLbl)).toBeNull();
      expect(widgetHost.queryByText('Log in with your email address for more authentication options')).toBeNull();
      expect(widgetHost.queryByText('Get an SMS instead')).toBeNull();

      // Renders Email Widget
      const emailLnk = widgetHost.getByText('Get an email instead');
      await act(async () => {
        mockSendEmail(true);
        await fireEvent.click(emailLnk);
      });

      expect(widgetHost.getByText(`We emailed a link to ${custContext.emailId}.`)).toBeDefined();
      expect(widgetHost.getByText('Please click it to continue.')).toBeDefined();
      expect(widgetHost.getByText('Use a different email')).toBeDefined();
      expect(widgetHost.getByText('Back to QR code')).toBeDefined();

      // Test case for the click event of Use different email
      const altEmailLink = widgetHost.getByText('Use a different email');
      fireEvent.click(altEmailLink);
      expect(window.location.href).toBe(`http://localhost/${process.env.REACT_APP_LOGIN_PAGE}`);

      // Test case for the click event of Back to QR code
      const backBtnLnk = widgetHost.getByText('Back to QR code');
      fireEvent.click(backBtnLnk);

      // QRCodeWidget should have been rendered again.
      expect(widgetHost.getByText('To continue, scan this QR code')).toBeDefined();
      expect(widgetHost.getByText('Get an email instead')).toBeDefined();

      expect(widgetHost.queryByText(btnLbl)).toBeNull();
      expect(widgetHost.queryByText('Log in with your email address for more authentication options')).toBeNull();
      expect(widgetHost.queryByText('Get an SMS instead')).toBeNull();
    });
  });

  describe('render with customer context - both email and phone# and canScan=true', () => {
    it('renders QRCodeWidget with QRCode component', async () => {
      custContext.canScan = true;
      custContext.emailId = 'abc@test.com';
      custContext.phoneNo = '12345';
      await act(async () => {
        await renderWidgetHost(custContext, presentationInput);
      });

      expect(widgetHost.getByText('To continue, scan this QR code')).toBeDefined();
      expect(widgetHost.getByText('Get an SMS instead')).toBeDefined();

      expect(widgetHost.queryByText(btnLbl)).toBeNull();
      expect(widgetHost.queryByText('Log in with your email address for more authentication options')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();

      // Renders SMS Widget
      const smsLnk = widgetHost.getByText('Get an SMS instead');
      await act(async () => {
        mockSendSMS(true);
        await fireEvent.click(smsLnk);
      });

      expect(widgetHost.getByText(`We texted a link to ${custContext.phoneNo}.`)).toBeDefined();
      expect(widgetHost.getByText('Please click it to continue.')).toBeDefined();
      expect(widgetHost.getByText('Get an email instead')).toBeDefined();
      expect(widgetHost.getByText('Back to QR code')).toBeDefined();

      // Renders Email Widget
      const emailLnk = widgetHost.getByText('Get an email instead');
      await act(async () => {
        mockSendEmail(true);
        await fireEvent.click(emailLnk);
      });

      expect(widgetHost.getByText(`We emailed a link to ${custContext.emailId}.`)).toBeDefined();
      expect(widgetHost.getByText('Please click it to continue.')).toBeDefined();
      expect(widgetHost.getByText('Use a different email')).toBeDefined();
      expect(widgetHost.getByText('Back to QR code')).toBeDefined();

      // Test case for the click event of Use different email
      const altEmailLink = widgetHost.getByText('Use a different email');
      fireEvent.click(altEmailLink);
      expect(window.location.href).toBe(`http://localhost/${process.env.REACT_APP_LOGIN_PAGE}`);

      // Test case for the click event of Back to QR code
      const backBtnLnk = widgetHost.getByText('Back to QR code');
      fireEvent.click(backBtnLnk);

      // QRCodeWidget should have been rendered again.
      expect(widgetHost.getByText('To continue, scan this QR code')).toBeDefined();
      expect(widgetHost.getByText('Get an SMS instead')).toBeDefined();

      expect(widgetHost.queryByText(btnLbl)).toBeNull();
      expect(widgetHost.queryByText('Log in with your email address for more authentication options')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();
    });
  });

  describe('render with customer context - both email and phone# and canScan=false', () => {
    it('renders QRCodeWidget with Button component', async () => {
      custContext.canScan = false;
      custContext.emailId = 'abc@test.com';
      custContext.phoneNo = '12345';
      await act(async () => {
        await renderWidgetHost(custContext, presentationInput);
      });

      expect(widgetHost.getByText(btnLbl)).toBeDefined();
      expect(widgetHost.getByText('Get an SMS instead')).toBeDefined();

      expect(widgetHost.queryByText('To continue, scan this QR code')).toBeNull();
      expect(widgetHost.queryByText('Log in with your email address for more authentication options')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();

      // Renders SMS Widget
      const smsLnk = widgetHost.getByText('Get an SMS instead');
      await act(async () => {
        mockSendSMS(true);
        await fireEvent.click(smsLnk);
      });

      expect(widgetHost.getByText(`We texted a link to ${custContext.phoneNo}.`)).toBeDefined();
      expect(widgetHost.getByText('Please click it to continue.')).toBeDefined();
      expect(widgetHost.getByText('Get an email instead')).toBeDefined();
      expect(widgetHost.getByText('Back to Button')).toBeDefined();

      // Renders Email Widget
      const emailLnk = widgetHost.getByText('Get an email instead');
      await act(async () => {
        mockSendEmail(true);
        await fireEvent.click(emailLnk);
      });

      expect(widgetHost.getByText(`We emailed a link to ${custContext.emailId}.`)).toBeDefined();
      expect(widgetHost.getByText('Please click it to continue.')).toBeDefined();
      expect(widgetHost.getByText('Use a different email')).toBeDefined();
      expect(widgetHost.getByText('Back to Button')).toBeDefined();

      // Test case for the click event of Use different email
      const altEmailLink = widgetHost.getByText('Use a different email');
      fireEvent.click(altEmailLink);
      expect(window.location.href).toBe(`http://localhost/${process.env.REACT_APP_LOGIN_PAGE}`);

      // Test case for the click event of Back to QR code
      const backBtnLnk = widgetHost.getByText('Back to Button');
      fireEvent.click(backBtnLnk);

      // QRCodeWidget should have been rendered again with Button.
      expect(widgetHost.getByText(btnLbl)).toBeDefined();
      expect(widgetHost.getByText('Get an SMS instead')).toBeDefined();

      expect(widgetHost.queryByText('To continue, scan this QR code')).toBeNull();
      expect(widgetHost.queryByText('Log in with your email address for more authentication options')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();
    });
  });

  describe('render with customer context - both email and phone# and canScan=false - failure scenarios', () => {
    it('renders QRCodeWidget with Button component', async () => {
      custContext.canScan = false;
      custContext.emailId = 'abc@test.com';
      custContext.phoneNo = '12345';
      await act(async () => {
        await renderWidgetHost(custContext, presentationInput);
      });

      expect(widgetHost.getByText(btnLbl)).toBeDefined();
      expect(widgetHost.getByText('Get an SMS instead')).toBeDefined();

      expect(widgetHost.queryByText('To continue, scan this QR code')).toBeNull();
      expect(widgetHost.queryByText('Log in with your email address for more authentication options')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();

      // Renders SMS Widget with error message when SMS service call is not successful
      const smsLnk = widgetHost.getByText('Get an SMS instead');
      await act(async () => {
        mockSendSMS(false);
        await fireEvent.click(smsLnk);
      });

      expect(widgetHost.getByText(`Error sending SMS to ${custContext.phoneNo}.`)).toBeDefined();
      expect(widgetHost.getByText('Get an email instead')).toBeDefined();
      expect(widgetHost.getByText('Back to Button')).toBeDefined();

      expect(widgetHost.queryByText(`We texted a link to ${custContext.phoneNo}.`)).toBeNull();
      expect(widgetHost.queryByText('Please click it to continue.')).toBeNull();

      // Renders Email Widget with error message when Email service call is not successful
      const emailLnk = widgetHost.getByText('Get an email instead');
      await act(async () => {
        mockSendEmail(false);
        await fireEvent.click(emailLnk);
      });

      expect(widgetHost.getByText(`Error sending Email to ${custContext.emailId}.`)).toBeDefined();
      expect(widgetHost.getByText('Use a different email')).toBeDefined();
      expect(widgetHost.getByText('Back to Button')).toBeDefined();

      expect(widgetHost.queryByText(`We emailed a link to ${custContext.emailId}.`)).toBeNull();
      expect(widgetHost.queryByText('Please click it to continue.')).toBeNull();

      // Test case for the click event of Use different email
      const altEmailLink = widgetHost.getByText('Use a different email');
      fireEvent.click(altEmailLink);
      expect(window.location.href).toBe(`http://localhost/${process.env.REACT_APP_LOGIN_PAGE}`);

      // Test case for the click event of Back to QR code
      const backBtnLnk = widgetHost.getByText('Back to Button');
      fireEvent.click(backBtnLnk);

      // QRCodeWidget should have been rendered again with Button.
      expect(widgetHost.getByText(btnLbl)).toBeDefined();
      expect(widgetHost.getByText('Get an SMS instead')).toBeDefined();

      expect(widgetHost.queryByText('To continue, scan this QR code')).toBeNull();
      expect(widgetHost.queryByText('Log in with your email address for more authentication options')).toBeNull();
      expect(widgetHost.queryByText('Get an email instead')).toBeNull();
    });
  });
});
