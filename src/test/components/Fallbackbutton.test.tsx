import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FallbackButton from '../../components/FallbackButton';
import { dummyPresentationRequestResponse } from '../mocks';

describe('FallbackButton component', () => {
  const mockClient = {
    sendEmail: jest.fn(),
    sendSms: jest.fn(),
    sendPushNotification: jest.fn(),
  };

  const defaultProps = {
    fallbackType: 'PUSH',
    client: mockClient,
    nextFallback: jest.fn(),
    setFallbackError: jest.fn(),
    presentationRequest: dummyPresentationRequestResponse,
    userInfo: {
      pushToken: {
        provider: 'FCM',
        value: 'test fcm token',
      },
      email: 'test@unum.id',
      phone: 'KL5-5555',
    },
  };

  it('renders push notification text', () => {
    render(<FallbackButton {...defaultProps} />);
    expect(screen.getByText('Get a push notification instead.')).toBeInTheDocument();
  });

  it('renders sms text', () => {
    const props = { ...defaultProps, fallbackType: 'SMS' };
    render(<FallbackButton {...props} />);
    expect(screen.getByText('Get an SMS instead.')).toBeInTheDocument();
  });

  it('renders email text', () => {
    const props = { ...defaultProps, fallbackType: 'EMAIL' };
    render(<FallbackButton {...props} />);
    expect(screen.getByText('Get an email instead.')).toBeInTheDocument();
  });

  it('renders login text', () => {
    const props = { ...defaultProps, fallbackType: 'LOGIN' };
    render(<FallbackButton {...props} />);
    expect(screen.getByText('Log in for more verification options.')).toBeInTheDocument();
  });

  it('uses a custom sendPushNotification function if available', () => {
    const props = { ...defaultProps, sendPushNotification: jest.fn() };
    render(<FallbackButton {...props} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(props.sendPushNotification).toBeCalled();
    expect(props.sendPushNotification).toBeCalledWith({
      token: props.userInfo.pushToken,
      deeplink: props.presentationRequest.deeplink,
      holderAppUuid: props.presentationRequest.presentationRequest.holderAppUuid,
    });
  });

  it('uses a custom sendSms function if available', () => {
    const props = { ...defaultProps, fallbackType: 'SMS', sendSms: jest.fn() };
    render(<FallbackButton {...props} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(props.sendSms).toBeCalled();
    expect(props.sendSms).toBeCalledWith({
      to: defaultProps.userInfo.phone,
      msg: `Verification Request: ${props.presentationRequest.verifier.name}. Click here to complete: ${props.presentationRequest.deeplink}.`,
    });
  });

  it('uses a custom sendEmail function if available', () => {
    const props = { ...defaultProps, fallbackType: 'EMAIL', sendEmail: jest.fn() };
    render(<FallbackButton {...props} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(props.sendEmail).toBeCalled();
    expect(props.sendEmail).toBeCalledWith({
      to: defaultProps.userInfo.email,
      subject: `Verification Request: ${props.presentationRequest.verifier.name}`,
      htmlBody: `<div>Click <a href=${props.presentationRequest.deeplink}>here</a> to complete.</div>`,
    });
  });

  it('redirects the user to login', () => {
    const props = { ...defaultProps, fallbackType: 'LOGIN', goToLogin: jest.fn() };
    render(<FallbackButton {...props} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(props.goToLogin).toBeCalled();
  });

  it('defaults to sending a push notification via the UnumIDClient', () => {
    render(<FallbackButton {...defaultProps} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(defaultProps.client.sendPushNotification).toBeCalled();
    expect(defaultProps.client.sendPushNotification).toBeCalledWith({
      token: defaultProps.userInfo.pushToken,
      deeplink: defaultProps.presentationRequest.deeplink,
      holderAppUuid: defaultProps.presentationRequest.presentationRequest.holderAppUuid,
    });
  });

  it('sends an sms via the UnumIDClient if no custom function', () => {
    const props = { ...defaultProps, fallbackType: 'SMS' };
    render(<FallbackButton {...props} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(props.client.sendSms).toBeCalled();
    expect(props.client.sendSms).toBeCalledWith({
      to: props.userInfo.phone,
      msg: `Verification Request: ${props.presentationRequest.verifier.name}. Click here to complete: ${props.presentationRequest.deeplink}.`,
    });
  });

  it('sends an email via the UnumIDClient if no custom function', () => {
    const props = { ...defaultProps, fallbackType: 'EMAIL' };
    render(<FallbackButton {...props} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(props.client.sendEmail).toBeCalled();
    expect(props.client.sendEmail).toBeCalledWith({
      to: props.userInfo.email,
      subject: `Verification Request: ${props.presentationRequest.verifier.name}`,
      htmlBody: `<div>Click <a href=${props.presentationRequest.deeplink}>here</a> to complete.</div>`,
    });
  });

  it('sets fallback error if there is an error sending a push notification with the sendPushNotification prop', async () => {
    const props = {
      ...defaultProps,
      sendPushNotification: jest.fn().mockRejectedValueOnce(new Error()),
    };
    render(<FallbackButton {...props} />);
    userEvent.click(screen.getByRole('button'));
    await act(async () => props.sendPushNotification());
    expect(props.setFallbackError).toBeCalledWith('Error sending push notification.');
  });

  it('sets fallback error if there is an error sending a push notification with client.sendPushNotification', async () => {
    defaultProps.client.sendPushNotification.mockRejectedValueOnce(new Error());
    render(<FallbackButton {...defaultProps} />);
    userEvent.click(screen.getByRole('button'));
    await act(async () => defaultProps.client.sendPushNotification());
    expect(defaultProps.setFallbackError).toBeCalledWith('Error sending push notification.');
  });

  it('sets fallback error if there is an error sending an sms with the sendSms prop', async () => {
    const props = {
      ...defaultProps,
      fallbackType: 'SMS',
      sendSms: jest.fn().mockRejectedValueOnce(new Error()),
    };

    render(<FallbackButton {...props} />);
    userEvent.click(screen.getByRole('button'));
    await act(async () => props.sendSms());

    expect(props.setFallbackError).toBeCalledWith(`Error sending sms to ${props.userInfo.phone}.`);
  });

  it('sets fallback error if there is an error sending an sms with client.sendSms', async () => {
    const props = {
      ...defaultProps,
      fallbackType: 'SMS',
    };
    props.client.sendSms.mockRejectedValueOnce(new Error());
    render(<FallbackButton {...props} />);
    userEvent.click(screen.getByRole('button'));
    await act(async () => props.client.sendSms());
    expect(props.setFallbackError).toBeCalledWith(`Error sending sms to ${props.userInfo.phone}.`);
  });

  it('sets fallback error if there is an error sending an email with the sendEmail prop', async () => {
    const props = {
      ...defaultProps,
      fallbackType: 'EMAIL',
      sendEmail: jest.fn().mockRejectedValueOnce(new Error()),
    };
    render(<FallbackButton {...props} />);
    userEvent.click(screen.getByRole('button'));
    await act(async () => props.sendEmail());

    expect(props.setFallbackError).toBeCalledWith(`Error sending email to ${props.userInfo.email}.`);
  });

  it('sets fallback error if there is an error sending an email with client.sendEmail', async () => {
    const props = {
      ...defaultProps,
      fallbackType: 'EMAIL',
    };
    props.client.sendEmail.mockRejectedValueOnce(new Error());
    render(<FallbackButton {...props} />);
    userEvent.click(screen.getByRole('button'));
    await act(async () => props.client.sendEmail());
    expect(props.setFallbackError).toBeCalledWith(`Error sending email to ${props.userInfo.email}.`);
  });
});
