import { httpHlpr } from 'util/ruiHttpHlpr';
import { objUtil } from 'util/ruiObjectUtils';
import { SmsData, SmsResponse, SmsTemplate } from 'types';
import template from 'config/templates/smsTemplate.json';

const sendSms = async (phoneNo: string, deepLink: string): Promise<boolean> => {
  const smsTmpl: SmsTemplate = (template as SmsTemplate) || { templateText: '' };
  let smsTmplStr = '';

  if (smsTmpl.templateText) {
    smsTmplStr = smsTmpl.templateText.replace(/\{\{\s*link\s*\}\}/, deepLink);
  } else {
    smsTmplStr = deepLink;
  }

  const smsData: SmsData = {
    to: phoneNo,
    msg: smsTmplStr,
  };

  try {
    const response: SmsResponse = <SmsResponse>(await httpHlpr.post(objUtil.getEnvValue('REACT_APP_SMS_END_POINT') as string,
      <Record<string, unknown>> (smsData as unknown)) as unknown);
    return (response.success);
  } catch (e) {
    return (false);
  }
};

export { sendSms };
