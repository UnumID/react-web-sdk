import { httpHlpr } from 'util/ruiHttpHlpr';
import { objUtil } from 'util/ruiObjectUtils';
import { PresentationRequest, DeeplinkObject } from 'types';

const getPresentation = async (presentationInput: PresentationRequest): Promise<DeeplinkObject> => {
  const response: any = await httpHlpr.post(objUtil.getEnvValue('REACT_APP_PRESENTATION_END_POINT') as string,
    <Record<string, unknown>> (presentationInput as unknown));

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
