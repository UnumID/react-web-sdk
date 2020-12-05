import { FunctionComponent } from 'react';
import { EmailData, EmailResponse } from 'types';
import './EmailWidget.css';
export interface Props {
    email: string;
    sendEmail: (options: EmailData) => Promise<EmailResponse>;
    canScan: boolean;
    goToLogin: () => void;
    deeplink: string;
    setCurrentWidget: (widget: string) => void;
}
declare const EmailWidget: FunctionComponent<Props>;
export default EmailWidget;
