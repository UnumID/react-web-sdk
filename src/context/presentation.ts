import { httpHlpr } from 'util/ruiHttpHlpr';
import { objUtil } from 'util/ruiObjectUtils';
import { DeeplinkObject } from 'types';

import presentationInput from 'config/presentationInput.json';

const getPresentation = async (): Promise<DeeplinkObject> => {
  const response: any = await httpHlpr.post(objUtil.getEnvValue('REACT_APP_PRESENTATION_END_POINT') as string,
    presentationInput);

  if (!response.presentationRequest) {
    return ({
      uuid: '',
      verifier: '',
      deeplink: '',
      qrCode: '',
    });
  }

  const deepLinkDtl: DeeplinkObject = {
    uuid: response.presentationRequest.uuid,
    verifier: response.presentationRequest.verifier,
    deeplink: response.deeplink,
    qrCode: response.qrCode,
  };

  return (deepLinkDtl);
};

export { getPresentation };
