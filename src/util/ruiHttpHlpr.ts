import { objUtil } from 'util/ruiObjectUtils';
import { frwkHlpr } from 'frwk/ruiFrwkHlpr';
import { reqResConst } from 'frwk/ruiFrwkConst';

const doXHRReq = (requestType: string, data: Record<string, unknown>, aSynchronous: boolean,
  requestURL: string): Promise<Record<string, unknown>> => new Promise((resolve, reject) => {
  if (objUtil.isNullOrEmpty(data)) {
    frwkHlpr.logError('doXHRReq', 'there is no data to be sent to the server');
    resolve(undefined);
  }

  if (objUtil.isNullOrEmpty(requestURL)) {
    frwkHlpr.logError('doXHRReq', 'requestURL is empty');
    resolve(undefined);
  }

  const xhrReq: XMLHttpRequest = new XMLHttpRequest();

  xhrReq.onload = (): void => {
    if (xhrReq.status >= 200 && xhrReq.status < 300) {
      resolve(JSON.parse(xhrReq.response));
    } else {
      reject(xhrReq.statusText);
    }
  };
  xhrReq.onerror = (): void => reject(xhrReq.statusText);
  xhrReq.open(requestType, requestURL, aSynchronous);

  xhrReq.setRequestHeader('Content-Type', reqResConst.CONTENT_TYPE);
  xhrReq.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhrReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  const lData: string = JSON.stringify(data);
  frwkHlpr.logNote('doXHRReq', lData);
  xhrReq.send(lData);
});

class HttpHlpr {
  async post(requestURL: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    try {
      return (await doXHRReq('POST', data, true, requestURL));
    } catch (e) {
      return (e);
    }
  }

  async get(requestURL: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    try {
      return (await doXHRReq('GET', data, true, requestURL));
    } catch (e) {
      return (e);
    }
  }
}

export const httpHlpr = new HttpHlpr();
