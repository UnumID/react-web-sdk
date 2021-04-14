import { FC } from 'react';
import { FallbackType, UserInfo } from 'types';
interface Props {
    userInfo?: UserInfo;
    error?: string;
    fallbackType: FallbackType;
}
/**
 * Component responsible for showing the result of sending a deep link via a fallback method.
 */
declare const FallbackResult: FC<Props>;
export default FallbackResult;
//# sourceMappingURL=FallbackResult.d.ts.map