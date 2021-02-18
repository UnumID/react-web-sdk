import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';

import QRCode from '../../components/QRCode';

describe('QRCode', () => {
  const sampleQrCode = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
  let component: RenderResult;

  describe('render', () => {
    it('renders a QRCode component with its contents', () => {
      component = render(<QRCode qrCode={sampleQrCode} applicationTitle="ACME" />);
      expect(component.getByText('To continue, scan this QR code')).toBeInTheDocument();
      expect(component.getByText('with your phone camera or ACME app:')).toBeInTheDocument();
      expect(component.getByText('Need help scanning?')).toBeInTheDocument();
    });
  });

  it('hides the help content initially', () => {
    component = render(<QRCode qrCode={sampleQrCode} applicationTitle="ACME" />);
    expect(component.queryByText('1. Install the ACME app from the app store.')).not.toBeInTheDocument();
  });

  it('shows the help content when the user clicks need help', () => {
    component = render(<QRCode qrCode={sampleQrCode} applicationTitle="ACME" />);
    const helpButton = component.getByText('Need help scanning?');

    fireEvent.click(helpButton);
    expect(component.getByText('1. Install the ACME app from the app store.')).toBeInTheDocument();
    expect(component.getByText('2. Open the ACME app and click "Scan a QR code".')).toBeInTheDocument();
    expect(component.getByText('3. Hover over the QR code.')).toBeInTheDocument();
  });

  it('renders a spinner instead of a qr code when the qr code has not been loaded', () => {
    component = render(<QRCode qrCode="" applicationTitle="ACME" />);
    expect(component.queryByAltText('qr code')).not.toBeInTheDocument();
    const spinner = component.getByLabelText('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner');
  });

  it('renders the qr code image', () => {
    component = render(<QRCode qrCode={sampleQrCode} applicationTitle="ACME" />);
    const image = component.getByAltText('qr code');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', sampleQrCode);
  });

  it('renders Unum ID branding', () => {
    component = render(<QRCode qrCode={sampleQrCode} applicationTitle="ACME" />);
    const branding = component.getByAltText('Powered by Unum ID');
    expect(branding).toBeInTheDocument();
  });
});
