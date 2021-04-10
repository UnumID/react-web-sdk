import { FC } from 'react';
import { HolderApp } from '@unumid/types';
import './DeeplinkWidget.css';
export interface Props {
    holderApp: Pick<HolderApp, 'name' | 'deeplinkButtonImg'>;
    deeplink: string;
    qrCode: string;
    setCurrentWidget: (widget: string) => void;
    canScan: boolean;
    goToLogin?: () => void;
    shouldShowEmailLink: boolean;
    shouldShowSmsLink: boolean;
    shouldShowLoginLink: boolean;
}
declare const DeeplinkWidget: FC<Props>;
export default DeeplinkWidget;
//# sourceMappingURL=DeeplinkWidget.d.ts.map