import { Component, ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomerContext, WidgetContext, PresentationRequest } from 'types';
declare class WidgetHostAndController extends Component<{
    custContext: CustomerContext;
    presentationRequest: PresentationRequest;
}, WidgetContext> {
    constructor(props: any);
    componentDidMount(): Promise<void>;
    populateCustContextInState(): void;
    render(): ReactNode;
}
export default WidgetHostAndController;
