# Verifier-Client-SDK
SDK which helps the client to manage how deeplink can be presented to holder

## Installation
This library is available in Github, built with react framework.

To add it to the react application, run `yarn add verifier-client-sdk@https://github.com/UnumID/Verifier-Client-SDK.git` or add the following to the `dependencies` section of the `package.json` and run `yarn install`.

```
"verifier-client-sdk": "https://github.com/UnumID/Verifier-Client-SDK.git"
```

## Usage
```tsx
import React, { FC, useState } from 'react';

import UnumIDVerifier, {
  EmailOptions,
  SmsOptions,
  PresentationRequestResponse,
  SuccessResponse
} from 'verifier-client-sdk';

// an image to use for the deeplink button
// it will be displayed at 250 x 50 pixels, so a width:height ratio of 5:1 should be used
// we suggest using your brand's styling, name, and/or logo in a clear call to action,
// i.e. "Continue with ACME app" alongside the ACME logo
import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App: FC = () => {
  const [presentationRequest, setPresentationRequest] = useState();

  const createPresentationRequest = async (): Promise<PresentationRequestResponse> => {
    // call your api endpoint to create a presentationRequest and return the response
    const response = await callEndpoint();
    // We recommend that you save the created PresentationRequest
    // Passing it as a prop to the Verifier Widget will prevent the SDK from creating another
    // if the widget is rerendered
    setPresentationRequest(response);
  };

  const sendEmail = async (options: EmailOptions): Promise<SuccessResponse> => {
    // call your api endpoint to send an email and return the response
  };

  const sendSms = async (options: SmsOptions): Promise<SuccessResponse> => {
    // call your api endpoint to send an sms and return the response
  };

  const goToLogin = (): void => {
    // navigate to your login page
  };

  return (
    <UnumIDVerifier
      applicationTitle="My Application"
      userInfo={{ email: 'test@test.com', phone: '555-5555' }}
      createPresentationRequest={createPresentationRequest}
      sendEmail={sendEmail}
      sendSMS={sendSms}
      goToLogin={goToLogin}
      // Passing a PresentationRequest will prevent the Verifier Widget from calling createPresentationRequest
      // and creating a new one
      presentationRequest={presentationRequest}
      // Optional. If deeplinkImgSrc is not provided, a default appearance for the deeplink button will be used
      deeplinkImgSrc={deeplinkImgSrc}
    />
  );
}
```

**Client reference application** is available at Git and can be cloned using 
`git clone https://github.com/UnumID/Verifier-Client-SDK-Client-Reference-App.git`. 

