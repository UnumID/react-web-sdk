import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { WidgetContext } from 'types';
import * as widgetStateContext from 'context/widgetStateContext';
import * as smsSrv from 'context/sendSms';
import SMSWidget from 'elements/widgets/SMSWidget';

describe('SMSWidget', () => {
  let smsWidget: ShallowWrapper<Record<string, unknown>>;
  const widgetCtx: WidgetContext = widgetStateContext.defaultWidgetContextState;
  widgetCtx.setWidgetState = jest.fn();

  const renderSMSWidget = (): void => {
    smsWidget = render(<SMSWidget />);
  };

  const mockSMSFunctions = (pWidgetCtx: WidgetContext, smsResp: boolean): void => {
    jest
      .spyOn(widgetStateContext, 'useWidgetStateContext')
      .mockImplementation(() => pWidgetCtx);

    jest
      .spyOn(smsSrv, 'sendSms')
      .mockImplementation(() => smsResp);
  };

  describe('SMSWidget with emailId and canScan=true', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = 'abc@test';
      widgetCtx.custContext.canScan = true;

      await act(async () => {
        mockSMSFunctions(widgetCtx, true);
        await renderSMSWidget();
      });
    });

    describe('render when sms service call success', () => {
      it('renders SMSWidget with the success text', () => {
        expect(smsWidget.getByText(`We texted a link to ${widgetCtx.custContext.phoneNo}.`)).toBeDefined();
        expect(smsWidget.getByText('Please click it to continue.')).toBeDefined();
      });

      it('renders Email link', () => {
        expect(smsWidget.getByText('Get an email instead')).toBeDefined();
      });

      it('renders a Back to Qr Code link', () => {
        expect(smsWidget.getByText('Back to QR code')).toBeDefined();
      });
    });
  });

  describe('SMSWidget without emailId and canScan=true', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = '';
      widgetCtx.custContext.canScan = true;

      await act(async () => {
        mockSMSFunctions(widgetCtx, true);
        await renderSMSWidget();
      });
    });

    describe('render when sms service call success', () => {
      it('renders SMSWidget with the success text', () => {
        expect(smsWidget.getByText(`We texted a link to ${widgetCtx.custContext.phoneNo}.`)).toBeDefined();
        expect(smsWidget.getByText('Please click it to continue.')).toBeDefined();
      });

      it('should not render Email link', () => {
        expect(smsWidget.queryByText('Get an email instead')).toBeNull();
      });

      it('renders a Back to Qr Code link', () => {
        expect(smsWidget.getByText('Back to QR code')).toBeDefined();
      });
    });
  });

  describe('SMSWidget with emailId and canScan=false', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = 'abc@test';
      widgetCtx.custContext.canScan = false;

      await act(async () => {
        mockSMSFunctions(widgetCtx, true);
        await renderSMSWidget();
      });
    });

    describe('render when sms service call success', () => {
      it('renders SMSWidget with the success text', () => {
        expect(smsWidget.getByText(`We texted a link to ${widgetCtx.custContext.phoneNo}.`)).toBeDefined();
        expect(smsWidget.getByText('Please click it to continue.')).toBeDefined();
      });

      it('should not render Email link', () => {
        expect(smsWidget.queryByText('Get an email instead')).toBeDefined();
      });

      it('renders a Back to Button link', () => {
        expect(smsWidget.getByText('Back to Button')).toBeDefined();
      });
    });
  });

  describe('SMSWidget without emailId and canScan=false', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = '';
      widgetCtx.custContext.canScan = false;

      await act(async () => {
        mockSMSFunctions(widgetCtx, true);
        await renderSMSWidget();
      });
    });

    describe('render when sms service call success', () => {
      it('renders SMSWidget with the success text', () => {
        expect(smsWidget.getByText(`We texted a link to ${widgetCtx.custContext.phoneNo}.`)).toBeDefined();
        expect(smsWidget.getByText('Please click it to continue.')).toBeDefined();
      });

      it('should not render Email link', () => {
        expect(smsWidget.queryByText('Get an email instead')).toBeNull();
      });

      it('renders a Back to Button link', () => {
        expect(smsWidget.getByText('Back to Button')).toBeDefined();
      });
    });
  });

  describe('SMSWidget - Error scenario - without emailId and canScan=false', () => {
    beforeEach(async () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = '';
      widgetCtx.custContext.canScan = false;

      await act(async () => {
        mockSMSFunctions(widgetCtx, false);
        await renderSMSWidget();
      });
    });

    describe('render when sms service call is failure', () => {
      it('renders SMSWidget without the success text', () => {
        expect(smsWidget.queryByText(`We texted a link to ${widgetCtx.custContext.phoneNo}.`)).toBeNull();
        expect(smsWidget.queryByText('Please click it to continue.')).toBeNull();
      });

      it('renders SMSWidget with failure message', () => {
        expect(smsWidget.getByText(`Error sending SMS to ${widgetCtx.custContext.phoneNo}.`)).toBeDefined();
      });

      it('should not render Email link', () => {
        expect(smsWidget.queryByText('Get an email instead')).toBeNull();
      });

      it('renders a Back to Button link', () => {
        expect(smsWidget.getByText('Back to Button')).toBeDefined();
      });
    });
  });
});
