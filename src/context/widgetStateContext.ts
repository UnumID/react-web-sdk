import { createContext } from 'react';

import { WidgetContext } from 'types';

export const defaultWidgetContextState: WidgetContext = {
  deepLinkDtl: {
    uuid: '',
    verifier: '',
    deeplink: '',
    qrCode: '',
  },
  isSameDevice: false,
  custContext: {
    canScan: true,
  },
  unAuthenticatedCtx: true,
};

export const widgetStateContext = createContext<WidgetContext>(defaultWidgetContextState);
