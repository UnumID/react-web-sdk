import { Component, ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomerContext, WidgetContext, PresentationRequest } from 'types';
interface Props {
    custContext: CustomerContext;
    presentationRequest: PresentationRequest;
}
declare class WidgetHostAndController extends Component<Props, WidgetContext> {
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    populateCustContextInState(): void;
    render(): ReactNode;
}
export default WidgetHostAndController;
