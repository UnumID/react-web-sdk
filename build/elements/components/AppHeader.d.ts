import { Component, ReactNode } from 'react';
import './AppHeader.css';
interface Props {
    appHeading: string;
}
declare class AppHeader extends Component<Props> {
    render(): ReactNode;
}
export default AppHeader;
