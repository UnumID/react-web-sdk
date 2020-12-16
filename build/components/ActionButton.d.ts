import { FC, PropsWithChildren } from 'react';
import './ActionButton.css';
declare type Props = PropsWithChildren<{
    target?: string;
    href: string;
    className?: string;
}>;
declare const ActionButton: FC<Props>;
export default ActionButton;
