import React, { FC } from 'react';
interface Props {
    onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
    href?: string;
    children: string;
}
declare const LinkButton: FC<Props>;
export default LinkButton;
