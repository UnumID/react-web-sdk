import { FunctionComponent } from 'react';
import { EmailOptions, SuccessResponse } from 'types';
import './EmailWidget.css';
export interface Props {
    email: string;
    sendEmail: (options: EmailOptions) => Promise<SuccessResponse>;
    canScan: boolean;
    goToLogin?: () => void;
    deeplink: string;
    setCurrentWidget: (widget: string) => void;
}
declare const EmailWidget: FunctionComponent<Props>;
export default EmailWidget;
//# sourceMappingURL=EmailWidget.d.ts.map