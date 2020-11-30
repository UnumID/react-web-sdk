import { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomerContext, PresentationRequest } from 'types';
interface Props {
    custContext: CustomerContext;
    presentationRequest: PresentationRequest;
}
declare const WidgetHostAndController: FC<Props>;
export default WidgetHostAndController;
