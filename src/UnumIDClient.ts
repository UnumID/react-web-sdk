import { PushNotificationOptions, ExternalChannelMessageInput } from '@unumid/types';
import axios, { AxiosInstance, Method } from 'axios';
import { SuccessResponse } from 'types';

export class UnumIDClient {
  axiosInstance: AxiosInstance;

  constructor(saasUrl: string, apiKey: string) {
    this.axiosInstance = axios.create({
      baseURL: saasUrl,
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  }

  async makeSaasCall(path: string, method: Method, data: any): Promise<any> {
    return this.axiosInstance({
      url: path,
      method,
      data,
    });
  }

  async sendPushNotification(options: PushNotificationOptions): Promise<SuccessResponse> {
    try {
      return this.makeSaasCall('/pushNotification', 'POST', options);
    } catch (e) {
      console.log('Error sending push notification', e);
      throw e;
    }
  }

  async sendEmail(options: ExternalChannelMessageInput): Promise<SuccessResponse> {
    try {
      return this.makeSaasCall('/email', 'POST', options);
    } catch (e) {
      console.log('error sending email', e);
      throw e;
    }
  }

  async sendSms(options: ExternalChannelMessageInput): Promise<SuccessResponse> {
    try {
      return this.makeSaasCall('/sms', 'POST', options);
    } catch (e) {
      console.log('error sending sms', e);
      throw e;
    }
  }
}
