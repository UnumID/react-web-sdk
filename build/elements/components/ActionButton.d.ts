import React, { FC } from 'react';
interface Props {
    onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
    type: 'primary' | 'secondary';
    className?: string;
    target?: string;
    href?: string;
    children: string;
}
declare const ActionButton: FC<Props>;
export default ActionButton;
