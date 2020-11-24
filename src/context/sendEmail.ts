import { httpHlpr } from 'util/ruiHttpHlpr';
import { objUtil } from 'util/ruiObjectUtils';
import { frwkHlpr } from 'frwk/ruiFrwkHlpr';
import { EmailData, EmailResponse, EmailTemplate } from 'types';
import template from 'config/templates/emailTemplate.json';

const sendEmail = async (emailId: string, deepLink: string): Promise<boolean> => {
  const emailTmpl: EmailTemplate = (template as EmailTemplate);
  let emailBodyStr = '';

  if (emailTmpl.htmlTemplateText) {
    let linkStr: string = (emailTmpl.htmlTemplateText.match(/\{\{\s*.*\s*\}\}/) || [''])[0];
    linkStr = linkStr.replace(/[\s{}]/g, '');
    emailBodyStr = emailTmpl.htmlTemplateText.replace(/\{\{\s*.*\s*\}\}/, `<a href='${deepLink}'>${linkStr}</a>`);
    frwkHlpr.logInfo('sendEmail', `emailBodyStr: ${emailBodyStr}`);
  } else {
    emailBodyStr = `<a href='${deepLink}'>Click here</a>`;
  }

  const emailData: EmailData = {
    to: emailId,
    subject: emailTmpl.subjectText,
    htmlBody: emailBodyStr,
  };

  try {
    const response: EmailResponse = <EmailResponse>(await httpHlpr.post(objUtil.getEnvValue('REACT_APP_EMAIL_END_POINT') as string,
      <Record<string, unknown>> (emailData as unknown)) as unknown);
    return (response.success);
  } catch (e) {
    return (false);
  }
};

export { sendEmail };
