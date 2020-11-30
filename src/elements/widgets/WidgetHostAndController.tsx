import React, { FC, useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { getPresentation } from 'context/presentation';
import { defaultWidgetContextState, widgetStateContext } from 'context/widgetStateContext';
import WidgetContainer from 'elements/containers/WidgetContainer';
import QRCodeWidget from 'elements/widgets/QRCodeWidget';
import SMSWidget from 'elements/widgets/SMSWidget';
import EmailWidget from 'elements/widgets/EmailWidget';
import { CustomerContext, PresentationRequest, WidgetContext } from 'types';
import { widgetTypes } from 'frwk/ruiFrwkConst';
import { frwkHlpr } from 'frwk/ruiFrwkHlpr';

interface Props {
  custContext: CustomerContext;
  presentationRequest: PresentationRequest;
}

const WidgetHostAndController: FC<Props> = (props: Props) => {
  const [widgetState, setWidgetState] = useState(defaultWidgetContextState);

  useEffect(() => {
    (async () => {
      const { presentationRequest, custContext } = props;
      const deepLinkDtl = await getPresentation(presentationRequest);
      const isSameDevice = !!/Mobi|Android|iPhone/i.test(navigator.userAgent);

      const newCustContext = { ...custContext };

      if (newCustContext.canScan === undefined) {
        frwkHlpr.logInfo('WidgetHostAndController::populateCustContextInState', `Can Scan is not passed: ${custContext.canScan}`);
        newCustContext.canScan = !isSameDevice;
      }

      let unAuthenticatedCtx: boolean;

      if (newCustContext.phoneNo || newCustContext.emailId) {
        frwkHlpr.logInfo('WidgetHostAndController::populateCustContextInState', `Object is not empty: ${JSON.stringify(newCustContext)}`);
        unAuthenticatedCtx = false;
      } else {
        unAuthenticatedCtx = true;
      }

      setWidgetState((oldState) => ({
        ...oldState,
        isSameDevice,
        deepLinkDtl,
        custContext: newCustContext,
        currentWidget: widgetTypes.QR_CODE,
        unAuthenticatedCtx,
        setWidgetState: (values: Partial<WidgetContext>) => {
          setWidgetState((w) => ({ ...w, ...values }));
        },
      }));
    })();
  }, [props]);

  const { currentWidget } = widgetState;
  return (
    <widgetStateContext.Provider value={widgetState}>
      <WidgetContainer>
        { (currentWidget === widgetTypes.QR_CODE) && <QRCodeWidget /> }
        { (currentWidget === widgetTypes.SMS) && <SMSWidget /> }
        { (currentWidget === widgetTypes.EMAIL) && <EmailWidget /> }
      </WidgetContainer>
    </widgetStateContext.Provider>
  );
};

export default WidgetHostAndController;
