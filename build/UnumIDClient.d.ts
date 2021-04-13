import { PushNotificationOptions } from '@unumid/types';
import { AxiosInstance, Method } from 'axios';
import { ExternalMessageInput, SuccessResponse } from 'types';
export declare class UnumIDClient {
    axiosInstance: AxiosInstance;
    constructor(saasUrl: string, apiKey: string);
    makeSaasCall(path: string, method: Method, data: any): Promise<any>;
    sendPushNotification(options: PushNotificationOptions): Promise<any>;
    sendEmail(options: ExternalMessageInput): Promise<SuccessResponse>;
    sendSms(options: ExternalMessageInput): Promise<SuccessResponse>;
}
//# sourceMappingURL=UnumIDClient.d.ts.map