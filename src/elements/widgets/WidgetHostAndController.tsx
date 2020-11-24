import React, { Component, ReactNode } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { getPresentation } from 'context/presentation';
import { defaultWidgetContextState, widgetStateContext } from 'context/widgetStateContext';
import WidgetContainer from 'elements/containers/WidgetContainer';
import QRCodeWidget from 'elements/widgets/QRCodeWidget';
import SMSWidget from 'elements/widgets/SMSWidget';
import EmailWidget from 'elements/widgets/EmailWidget';
import { CustomerContext, WidgetContext, PresentationRequest } from 'types';
import { widgetTypes } from 'frwk/ruiFrwkConst';
import { frwkHlpr } from 'frwk/ruiFrwkHlpr';

interface Props {
  custContext: CustomerContext;
  presentationRequest: PresentationRequest;
}

class WidgetHostAndController extends Component<Props, WidgetContext> {
  constructor(props: Props) {
    super(props);
    this.state = defaultWidgetContextState;
  }

  async componentDidMount(): Promise<void> {
    const { presentationRequest } = this.props;
    this.setState({ deepLinkDtl: await getPresentation(presentationRequest) });
    this.setState({ isSameDevice: (!!/Mobi|Android|iPhone/i.test(navigator.userAgent)) });
    this.populateCustContextInState();
    frwkHlpr.logInfo('WidgetHostAndController::componentDidMount', `Data is: ${JSON.stringify(this.state)}`);
  }

  populateCustContextInState(): void {
    const { custContext } = this.props;
    const newCustContext: CustomerContext = custContext;

    if (newCustContext.canScan === undefined) {
      frwkHlpr.logInfo('WidgetHostAndController::populateCustContextInState', `Can Scan is not passed: ${newCustContext.canScan}`);
      const { isSameDevice } = this.state;
      newCustContext.canScan = !isSameDevice;
    }
    this.setState({ custContext: newCustContext });
    this.setState({ currentWidget: widgetTypes.QR_CODE });

    if (newCustContext.phoneNo || newCustContext.emailId) {
      frwkHlpr.logInfo('WidgetHostAndController::populateCustContextInState', `Object is not empty: ${JSON.stringify(newCustContext)}`);
      this.setState({ unAuthenticatedCtx: false });
      frwkHlpr.logInfo('WidgetHostAndController::populateCustContextInState', `New state is: ${JSON.stringify(this.state)}`);
    } else {
      this.setState({ unAuthenticatedCtx: true });
    }
  }

  render(): ReactNode {
    const wState: WidgetContext = this.state;
    wState.setWidgetState = (value: any): void => { this.setState(value); };

    const { currentWidget } = this.state;
    return (
      <widgetStateContext.Provider value={wState}>
        <WidgetContainer>
          { (currentWidget === widgetTypes.QR_CODE) && <QRCodeWidget /> }
          { (currentWidget === widgetTypes.SMS) && <SMSWidget /> }
          { (currentWidget === widgetTypes.EMAIL) && <EmailWidget /> }
        </WidgetContainer>
      </widgetStateContext.Provider>
    );
  }
}

export default WidgetHostAndController;
