import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ShallowWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { WidgetContext } from 'types';
import * as widgetStateContext from 'context/widgetStateContext';
import * as emailSrv from 'context/sendEmail';
import EmailWidget from 'elements/widgets/EmailWidget';

describe('EmailWidget', () => {
  let emailWidget: ShallowWrapper<Record<string, unknown>>;
  const widgetCtx: WidgetContext = widgetStateContext.defaultWidgetContextState;
  widgetCtx.setWidgetState = jest.fn();

  const renderEmailWidget = (): void => {
    emailWidget = render(<EmailWidget />);
  };

  const mockEmailFunctions = (pWidgetCtx: WidgetContext, emailResp: boolean): void => {
    jest
      .spyOn(widgetStateContext, 'useWidgetStateContext')
      .mockImplementation(() => pWidgetCtx);

    jest
      .spyOn(emailSrv, 'sendEmail')
      .mockImplementation(() => emailResp);
  };

  describe('EmailWidget with canScan=true', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = 'abc@test.com';
      widgetCtx.custContext.canScan = true;

      await act(async () => {
        mockEmailFunctions(widgetCtx, true);
        await renderEmailWidget();
      });
    });

    describe('render when email service call success', () => {
      it('renders EmailWidget with the success text', () => {
        expect(emailWidget.getByText(`We emailed a link to ${widgetCtx.custContext.emailId}.`)).toBeDefined();
        expect(emailWidget.getByText('Please click it to continue.')).toBeDefined();
      });

      it('renders Email alternate link', () => {
        expect(emailWidget.getByText('Use a different email')).toBeDefined();
      });

      it('renders a Back to Qr Code link', () => {
        expect(emailWidget.getByText('Back to QR code')).toBeDefined();
      });
    });
  });

  describe('EmailWidget with canScan=false', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = 'abc@test.com';
      widgetCtx.custContext.canScan = false;

      await act(async () => {
        mockEmailFunctions(widgetCtx, true);
        await renderEmailWidget();
      });
    });

    describe('render when email service call success', () => {
      it('renders EmailWidget with the success text', () => {
        expect(emailWidget.getByText(`We emailed a link to ${widgetCtx.custContext.emailId}.`)).toBeDefined();
        expect(emailWidget.getByText('Please click it to continue.')).toBeDefined();
      });

      it('renders Email alternate link', () => {
        expect(emailWidget.getByText('Use a different email')).toBeDefined();
      });

      it('renders a Back to Button link', () => {
        expect(emailWidget.getByText('Back to Button')).toBeDefined();
      });
    });
  });

  describe('EmailWidget - Error scenario - canScan=false', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = '';
      widgetCtx.custContext.canScan = false;

      await act(async () => {
        mockEmailFunctions(widgetCtx, false);
        await renderEmailWidget();
      });
    });

    describe('render when email service call is failure', () => {
      it('renders EmailWidget without the success text', () => {
        expect(emailWidget.queryByText(`We emailed a link to ${widgetCtx.custContext.emailId}.`)).toBeNull();
        expect(emailWidget.queryByText('Please click it to continue.')).toBeNull();
      });

      it('renders EmailWidget with failure message', () => {
        expect(emailWidget.getByText(`Error sending Email to ${widgetCtx.custContext.emailId}.`)).toBeDefined();
      });

      it('renders Email alternate link', () => {
        expect(emailWidget.getByText('Use a different email')).toBeDefined();
      });

      it('renders a Back to Button link', () => {
        expect(emailWidget.getByText('Back to Button')).toBeDefined();
      });
    });
  });

  describe('action for alternate email link and back button link', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = 'abc@test.com';
      widgetCtx.custContext.canScan = false;

      await act(async () => {
        mockEmailFunctions(widgetCtx, true);
        await renderEmailWidget();
      });
    });

    it('Check the onClick event of Alternate Email link', () => {
      const altEmailLink = emailWidget.getByText('Use a different email');
      fireEvent.click(altEmailLink);
      expect(window.location.href).toBe(`http://localhost/${process.env.REACT_APP_LOGIN_PAGE}`);
    });

    it('Check the onClick event of Back button', () => {
      const backButton = emailWidget.getByText('Back to Button');
      fireEvent.click(backButton);
      expect(widgetCtx.setWidgetState).toHaveBeenCalledTimes(1);
    });
  });
});
