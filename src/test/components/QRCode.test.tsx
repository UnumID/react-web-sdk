import React from 'react';
import {
  render, RenderResult, fireEvent, waitFor, act,
} from '@testing-library/react';

import QRCode, { QRCodeRole } from '../../components/QRCode';
import { dummyHolderAppInfo } from '../mocks';

describe('QRCode', () => {
  const sampleQrCode = 'https://s3-us-west-1.amazonaws.com/lobqrcodes/8883301f-b0ce-4d1e-96c3-7d3e47526d0b';
  let component: RenderResult;

  describe('render', () => {
    it('renders a QRCode component with its contents', async () => {
      await act(() => {
        component = render(<QRCode qrCode={sampleQrCode} holderApp={dummyHolderAppInfo} />);
      });

      expect(component.getByText('To continue, scan this QR code')).toBeInTheDocument();
      expect(component.getByText(`with your phone camera or ${dummyHolderAppInfo.name} app:`)).toBeInTheDocument();
      expect(component.getByText('Need help scanning?')).toBeInTheDocument();
    });
  });

  it('hides the help content initially', () => {
    act(() => {
      component = render(<QRCode qrCode={sampleQrCode} holderApp={dummyHolderAppInfo} />);
    });
    expect(component.queryByText(`1. Install the ${dummyHolderAppInfo.name} app from the app store.`)).not.toBeInTheDocument();
  });

  it('shows the help content when the user clicks need help', async () => {
    await act(async () => {
      component = render(<QRCode qrCode={sampleQrCode} holderApp={dummyHolderAppInfo} />);
    });

    const helpButton = await waitFor(() => component.getByText('Need help scanning?'));
    expect(helpButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(helpButton);
    });

    expect(component.getByText(`1. Install the ${dummyHolderAppInfo.name} app from the app store.`)).toBeInTheDocument();
    expect(component.getByText(`2. Open the ${dummyHolderAppInfo.name} app and click "Scan a QR code".`)).toBeInTheDocument();
    expect(component.getByText('3. Hover over the QR code.')).toBeInTheDocument();
  });

  it('renders a spinner instead of a qr code when the qr code has not been loaded', () => {
    act(() => {
      component = render(<QRCode qrCode="" holderApp={dummyHolderAppInfo} />);
    });

    expect(component.queryByAltText('qr code')).not.toBeInTheDocument();

    const spinner = component.getByLabelText('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner');
  });

  it('renders the qr code image', () => {
    act(() => {
      component = render(<QRCode qrCode={sampleQrCode} holderApp={dummyHolderAppInfo} />);
    });
    const image = component.getByRole(QRCodeRole);
    expect(image).toBeInTheDocument();

    const qrImage = image.querySelector('img');
    expect(qrImage).toBeInTheDocument();
    expect(qrImage).toHaveAttribute('src', sampleQrCode);
  });

  it('renders Unum ID branding', () => {
    act(() => {
      component = render(<QRCode qrCode={sampleQrCode} holderApp={dummyHolderAppInfo} />);
    });
    const branding = component.getByAltText('Powered by Unum ID');
    expect(branding).toBeInTheDocument();
  });
});
