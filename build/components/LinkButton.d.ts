import React, { FC, PropsWithChildren } from 'react';
import './LinkButton.css';
declare type Props = PropsWithChildren<{
    onClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
    children: string;
}>;
declare const LinkButton: FC<Props>;
export default LinkButton;
//# sourceMappingURL=LinkButton.d.ts.map