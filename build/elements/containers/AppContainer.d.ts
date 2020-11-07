import { Component, ReactNode } from 'react';
interface Props {
    children: ReactNode;
    className: string;
}
declare class AppContainer extends Component<Props> {
    render(): ReactNode;
}
export default AppContainer;
