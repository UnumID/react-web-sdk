import { PushNotificationOptions, ExternalChannelMessageInput } from '@unumid/types';
import { AxiosInstance, Method } from 'axios';
import { SuccessResponse } from 'types';
export declare class UnumIDClient {
    axiosInstance: AxiosInstance;
    constructor(saasUrl: string, apiKey: string);
    makeSaasCall(path: string, method: Method, data: any): Promise<any>;
    sendPushNotification(options: PushNotificationOptions): Promise<SuccessResponse>;
    sendEmail(options: ExternalChannelMessageInput): Promise<SuccessResponse>;
    sendSms(options: ExternalChannelMessageInput): Promise<SuccessResponse>;
}
//# sourceMappingURL=UnumIDClient.d.ts.map