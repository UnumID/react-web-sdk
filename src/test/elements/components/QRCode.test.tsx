import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import QRCode from 'elements/components/QRCode';

describe('QRCode', () => {
  const sampleQrCode = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
  let qrCodeComp: ShallowWrapper<Record<string, unknown>>;

  beforeAll(() => {
    qrCodeComp = shallow(<QRCode qrCode={sampleQrCode} />);
  });

  afterAll(() => {
    qrCodeComp.unmount();
  });

  describe('render', () => {
    it('renders a QRCode component with its contents', () => {
      expect(qrCodeComp.find('div.qr-code').length).toBe(1);
      expect(qrCodeComp.find('div.bold').length).toBe(1);
      expect(qrCodeComp.find({ children: 'with your phone camera or ACME app:' }).length).toBe(1);
      expect(qrCodeComp.find({ children: 'Need help scanning?' }).length).toBe(1);
      expect(qrCodeComp.find('div.qrcode-img-wrapper').length).toBe(1);
    });
  });

  describe('renders with help content hidden', () => {
    it('renders a QRCode component without help content initially', () => {
      expect(qrCodeComp.find('div.help').length).toBe(0);
    });
  });

  describe('renders img', () => {
    it('renders a QRCode component with the qrCode passed', () => {
      expect(qrCodeComp.find({ src: `${sampleQrCode}` }).length).toBe(1);
    });
  });

  describe('LinkButton action', () => {
    it('Click the LinkButton', () => {
      let lnkBtn = qrCodeComp.find({ children: 'Need help scanning?' });
      expect(lnkBtn.length).toBe(1);
      lnkBtn.simulate('click');

      expect(qrCodeComp.find('div.help').length).toBe(1);
      expect(qrCodeComp.find('div.help-item').length).toBe(3);

      lnkBtn = qrCodeComp.find({ children: 'Need help scanning?' });
      expect(lnkBtn.length).toBe(1);
      lnkBtn.simulate('click');

      expect(qrCodeComp.find('div.help').length).toBe(0);
      expect(qrCodeComp.find('div.help-item').length).toBe(0);
    });
  });
});
