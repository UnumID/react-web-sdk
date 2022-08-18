import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import DeeplinkWidget, { Props } from '../../components/DeeplinkWidget';
import { dummyHolderAppInfo, dummyPresentationRequestResponse } from '../mocks';
import { QRCodeRole } from '../../components/QRCode';

describe('DeeplinkWidget', () => {
  const dummyQrCode = dummyPresentationRequestResponse.qrCode;
  const dummyDeeplink = dummyPresentationRequestResponse.deeplink;

  const defaultProps: Props = {
    holderApp: dummyHolderAppInfo,
    canScan: true,
    deeplink: dummyDeeplink,
    qrCode: dummyQrCode,
  };

  const renderWidget = (props: Props = defaultProps) => {
    render(<DeeplinkWidget {...props} />);
  };

  it('renders a qr code if canScan is true', async () => {
    renderWidget();
    const qrCode = await screen.findByRole(QRCodeRole);
    expect(qrCode).toBeInTheDocument();

    const qrImage = qrCode.querySelector('img');
    expect(qrImage).toBeInTheDocument();
    expect(qrImage).toHaveAttribute('src', dummyQrCode);
  });

  it('renders a deeplink button if canScan is false', async () => {
    renderWidget({ ...defaultProps, canScan: false });
    const link = screen.getByAltText(`Verify with ${dummyHolderAppInfo.name}`).closest('a');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(link).toHaveAttribute('href', dummyDeeplink);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('uses the button image from the holderApp', async () => {
    renderWidget({ ...defaultProps, canScan: false });
    const image = await screen.findByAltText(`Verify with ${dummyHolderAppInfo.name}`);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', dummyHolderAppInfo.deeplinkButtonImg);
  });

  it('renders Unum ID branding with the deeplink button', async () => {
    renderWidget({ ...defaultProps, canScan: false });
    const branding = await screen.findByAltText('Powered by Unum ID');
    expect(branding).toBeInTheDocument();
  });
});
