import React, { Component, ReactNode } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { getPresentation } from 'context/presentation';
import { defaultWidgetContextState, widgetStateContext } from 'context/widgetStateContext';
import WidgetContainer from 'elements/containers/WidgetContainer';
import QRCodeWidget from 'elements/widgets/QRCodeWidget';
import SMSWidget from 'elements/widgets/SMSWidget';
import { WidgetContext } from 'types';
import { objUtil } from 'util/ruiObjectUtils';
import custContext from 'config/customerContext.json';

class WidgetHostAndController extends Component<{}, WidgetContext> {
  constructor(props: any) {
    super(props);
    this.state = defaultWidgetContextState;
  }

  async componentDidMount(): Promise<void> {
    this.setState({ deepLinkDtl: await getPresentation() });
    this.setState({ isSameDevice: (!!/Mobi|Android|iPhone/i.test(navigator.userAgent)) });
    this.loadStateWithCustContext();
    console.log(`Data is: ${JSON.stringify(this.state)}`);
  }

  loadStateWithCustContext(): void {
    if (custContext.phoneNo || custContext.emailId) {
      console.log(`Object is not empty: ${JSON.stringify(custContext)}`);
      this.setState({ unAuthenticatedCtx: false });
      if (custContext.phoneNo) {
        this.setState({ phoneNo: custContext.phoneNo });
      }
      if (custContext.emailId) {
        this.setState({ emailId: custContext.emailId });
      }
      console.log(`New state is: ${JSON.stringify(this.state)}`);
    } else {
      this.setState({ unAuthenticatedCtx: true });
      this.setState({ canScan: custContext.canScan });
    }

    this.setState({ currentWidget: 'QrCode' });
  }

  render(): ReactNode {
    const wState: WidgetContext = this.state;
    wState.setWidgetState = (value: any): void => { this.setState(value); };

    const { currentWidget } = this.state;
    return (
      <widgetStateContext.Provider value={wState}>
          <WidgetContainer>
            { (currentWidget === 'QrCode') && <QRCodeWidget /> }
            { (currentWidget === 'SMS') && <SMSWidget /> }
          </WidgetContainer>			
      </widgetStateContext.Provider>
    );
  }
}

export default WidgetHostAndController;
