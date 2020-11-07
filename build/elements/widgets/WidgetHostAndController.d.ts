import { Component, ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WidgetContext } from 'types';
declare class WidgetHostAndController extends Component<{}, WidgetContext> {
    constructor(props: any);
    componentDidMount(): Promise<void>;
    loadStateWithCustContext(): void;
    render(): ReactNode;
}
export default WidgetHostAndController;
