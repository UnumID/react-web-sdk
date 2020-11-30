import React, { Component, ReactNode } from 'react';
interface Props {
    onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
    href?: string;
    children: string;
}
declare class LinkButton extends Component<Props> {
    render(): ReactNode;
}
export default LinkButton;
