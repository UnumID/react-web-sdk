import { PushNotificationOptions } from '@unumid/types';
import axios from 'axios';
import { saasUrls } from 'constants/saasUrls';

import { UnumIDClient } from '../UnumIDClient';

jest.mock('axios');

describe('UnumIDClient', () => {
  let client: UnumIDClient;
  const apiKey = 'dummy api key';
  const saasUrl = saasUrls.development;
  const mockAxiosInstance = jest.fn();

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValueOnce(mockAxiosInstance);
    client = new UnumIDClient(saasUrl, apiKey);
  });

  describe('constructor', () => {
    it('creates an axios instance with the provided saasUrl and apiKey', () => {
      expect(axios.create).toBeCalledWith({
        baseURL: saasUrl,
        headers: { Authorization: `Bearer ${apiKey}` },
      });
    });
  });

  describe('makeSaasCall', () => {
    it('calls the saas', async () => {
      const path = '/sms';
      const method = 'POST';
      const data = { to: '5555555', msg: 'test' };
      await client.makeSaasCall(path, method, data);

      expect(mockAxiosInstance).toBeCalledWith({
        url: path,
        method,
        data,
      });
    });
  });

  describe('sendEmail', () => {
    it('sends an email via the saas', async () => {
      const options = {
        to: 'test@unum.id',
        htmlBody: '<div>test</div>',
        subject: 'test',
      };

      await client.sendEmail(options);
      expect(mockAxiosInstance).toBeCalledWith({
        method: 'POST',
        url: '/email',
        data: options,
      });
    });
  });

  describe('sendSms', () => {
    it('sends an sms via the saas', async () => {
      const options = {
        to: 'KL5-5555',
        msg: 'test',
      };

      await client.sendSms(options);
      expect(mockAxiosInstance).toBeCalledWith({
        method: 'POST',
        url: '/sms',
        data: options,
      });
    });
  });

  describe('sendPushNotification', () => {
    it('sends an email via the saas', async () => {
      const options: PushNotificationOptions = {
        token: {
          value: 'test token',
          provider: 'FCM',
        },
        deeplink: 'test deep link',
        holderAppUuid: 'test holderApp uuid',
      };

      await client.sendPushNotification(options);
      expect(mockAxiosInstance).toBeCalledWith({
        method: 'POST',
        url: '/pushNotification',
        data: options,
      });
    });
  });
});
