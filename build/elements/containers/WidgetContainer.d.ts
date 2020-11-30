import { Component, ReactNode } from 'react';
import './WidgetContainer.css';
interface Props {
    children: ReactNode;
    className?: string;
}
declare class WidgetContainer extends Component<Props> {
    render(): ReactNode;
}
export default WidgetContainer;
