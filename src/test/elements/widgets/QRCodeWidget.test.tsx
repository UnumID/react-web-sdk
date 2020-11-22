import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { WidgetContext } from 'types';
import * as widgetStateContext from 'context/widgetStateContext';
import QRCodeWidget from 'elements/widgets/QRCodeWidget';

let qrCodeWidget: ShallowWrapper<Record<string, unknown>>;

const renderQrCodeWidget = (widgetCtx): void => {
  jest
    .spyOn(widgetStateContext, 'useWidgetStateContext')
    .mockImplementation(() => widgetCtx);
  qrCodeWidget = shallow(<QRCodeWidget />);
};

describe('QRCodeWidget', () => {
  const widgetCtx: WidgetContext = widgetStateContext.defaultWidgetContextState;
  widgetCtx.setWidgetState = jest.fn();

  afterEach(() => {
    qrCodeWidget.unmount();
  });

  describe('render without customer context', () => {
    it('renders a QRCodeWidget with unknown customer context', () => {
      widgetCtx.deepLinkDtl.qrCode = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      renderQrCodeWidget(widgetCtx);

      expect(qrCodeWidget.find('div.qrcode-widget-content').length).toBe(1);
      expect(qrCodeWidget.find('QRCode').length).toBe(1);
      expect(qrCodeWidget.find({ children: 'Log in with your email address for more authentication options' }).length).toBe(1);
    });

    it('renders a ActionButton with unknown customer context', () => {
      widgetCtx.deepLinkDtl.deeplink = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
      widgetCtx.custContext.canScan = false;
      renderQrCodeWidget(widgetCtx);

      expect(qrCodeWidget.find('div.qrcode-widget-content').length).toBe(1);
      expect(qrCodeWidget.find('ActionButton').length).toBe(1);
      expect(qrCodeWidget.find({ children: 'Log in with your email address for more authentication options' }).length).toBe(1);
    });
  });

  describe('render with customer context and canScan=true', () => {
    it('renders a QRCodeWidget with phone number', () => {
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.unAuthenticatedCtx = false;
      widgetCtx.custContext.canScan = true;
      renderQrCodeWidget(widgetCtx);

      expect(qrCodeWidget.find('div.qrcode-widget-content').length).toBe(1);
      expect(qrCodeWidget.find('QRCode').length).toBe(1);
      expect(qrCodeWidget.find({ children: 'Get an SMS instead' }).length).toBe(1);
    });

    it('renders a QRCodeWidget with phone number and email id', () => {
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = 'abc@test';
      widgetCtx.unAuthenticatedCtx = false;
      widgetCtx.custContext.canScan = true;
      renderQrCodeWidget(widgetCtx);

      expect(qrCodeWidget.find('div.qrcode-widget-content').length).toBe(1);
      expect(qrCodeWidget.find('QRCode').length).toBe(1);
      expect(qrCodeWidget.find({ children: 'Get an SMS instead' }).length).toBe(1);
    });

    it('renders a QRCodeWidget with phone number', () => {
      widgetCtx.custContext.phoneNo = '';
      widgetCtx.custContext.emailId = 'abc@test';
      widgetCtx.unAuthenticatedCtx = false;
      widgetCtx.custContext.canScan = true;
      renderQrCodeWidget(widgetCtx);

      expect(qrCodeWidget.find('div.qrcode-widget-content').length).toBe(1);
      expect(qrCodeWidget.find('QRCode').length).toBe(1);
      expect(qrCodeWidget.find({ children: 'Get an email instead' }).length).toBe(1);
    });
  });

  describe('render with customer context and canScan=false', () => {
    it('renders a QRCodeWidget with phone number', () => {
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.unAuthenticatedCtx = false;
      widgetCtx.custContext.canScan = false;
      renderQrCodeWidget(widgetCtx);

      expect(qrCodeWidget.find('div.qrcode-widget-content').length).toBe(1);
      expect(qrCodeWidget.find('ActionButton').length).toBe(1);
      expect(qrCodeWidget.find({ children: 'Get an SMS instead' }).length).toBe(1);
    });

    it('renders a QRCodeWidget with phone number and email id', () => {
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.custContext.emailId = 'abc@test';
      widgetCtx.unAuthenticatedCtx = false;
      widgetCtx.custContext.canScan = false;
      renderQrCodeWidget(widgetCtx);

      expect(qrCodeWidget.find('div.qrcode-widget-content').length).toBe(1);
      expect(qrCodeWidget.find('ActionButton').length).toBe(1);
      expect(qrCodeWidget.find({ children: 'Get an SMS instead' }).length).toBe(1);
    });

    it('renders a QRCodeWidget with phone number', () => {
      widgetCtx.custContext.phoneNo = '';
      widgetCtx.custContext.emailId = 'abc@test';
      widgetCtx.unAuthenticatedCtx = false;
      widgetCtx.custContext.canScan = false;
      renderQrCodeWidget(widgetCtx);

      expect(qrCodeWidget.find('div.qrcode-widget-content').length).toBe(1);
      expect(qrCodeWidget.find('ActionButton').length).toBe(1);
      expect(qrCodeWidget.find({ children: 'Get an email instead' }).length).toBe(1);
    });
  });

  describe('action for sms link and email link', () => {
    it('Check the onClick event of Log in link', () => {
      widgetCtx.custContext.phoneNo = '';
      widgetCtx.unAuthenticatedCtx = true;
      widgetCtx.custContext.canScan = false;
      renderQrCodeWidget(widgetCtx);

      qrCodeWidget.find({ children: 'Log in with your email address for more authentication options' }).simulate('click');
      expect(window.location.href).toBe('http://localhost/#login');
    });

    it('Check the onClick event of SMS LinkButton', () => {
      widgetCtx.custContext.phoneNo = '12345';
      widgetCtx.unAuthenticatedCtx = false;
      widgetCtx.custContext.canScan = false;
      renderQrCodeWidget(widgetCtx);

      qrCodeWidget.find({ children: 'Get an SMS instead' }).simulate('click');
      expect(widgetCtx.setWidgetState).toHaveBeenCalledTimes(1);
    });

    it('Check the onClick event of Email LinkButton', () => {
      widgetCtx.custContext.phoneNo = '';
      widgetCtx.custContext.emailId = 'abc@test';
      widgetCtx.unAuthenticatedCtx = false;
      widgetCtx.custContext.canScan = false;
      renderQrCodeWidget(widgetCtx);

      qrCodeWidget.find({ children: 'Get an email instead' }).simulate('click');
      expect(widgetCtx.setWidgetState).toHaveBeenCalledTimes(2);
    });
  });

  describe('attributes for ActionButton when canScan=false', () => {
    it('Check the href attribute value', () => {
      widgetCtx.custContext.phoneNo = '';
      widgetCtx.unAuthenticatedCtx = true;
      widgetCtx.custContext.canScan = false;
      renderQrCodeWidget(widgetCtx);

      const btnLbl = `Continue with ${process.env.REACT_APP_APPLICATION_TITLE} App`;
      expect(qrCodeWidget.find({ children: btnLbl }).prop('href')).toBe(widgetCtx.deepLinkDtl.deeplink);
    });
  });
});
