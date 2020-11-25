# Verifier-Client-SDK
SDK which helps the client to manage how deeplink can be presented to holder

## Installation
This library is available in Github and written using react framework. This library uses `react-bootstrap` node module for basic components and styling.  To add it to any react application, run `yarn add verifier-client-sdk@https://github.com/UnumID/Verifier-Client-SDK.git` or add the following to the `dependencies` section of the `package.json` and run `yarn install`.

```
"verifier-client-sdk": "https://github.com/UnumID/Verifier-Client-SDK.git"
```

## Exposed Library Contents
### WidgetHostAndController
Primary widget internally manages different ways to send the deeplink to the holder based on the given customer context.

This widget accepts two parameters of type CustomerContext and PresentationRequest.
CustomerContext will be used to understand the context of the customer such as phone number, email id, and also whether the client 
application will be able to scan the QR Code.

PresentationRequest contains details required to get the deeplink from Verifier Application

```typescript
CustomerContext {
  emailId?: string;
  phoneNo?: string;
  canScan?: boolean;
}

PresentationRequest {
  credentialRequests: [
    {
      type: string;
      issuers: string[];
    }
  ],
  holderAppUuid: string;
}
```

The SDK depends on 3 REST end points which are expected to be implemented by the Client.  Server reference application is available at Git 
and can be cloned using `git clone https://github.com/UnumID/Verifier-Client-SDK-Server-Reference-App.git`. 

`/api/requestPresentation` - To get deeplink, QR code details from the Verifier Application
`/api/sendSMS` - To send SMS to the customer mobile number registered
`/api/sendEmail` - To send Email to the email id registered 

#### Usage
```typescript
import React, { Component, ReactNode } from 'react';

import WidgetHostAndController from 'verifier-client-sdk';

class App extends Component {
  render(): ReactNode {
    const presentationInput = {
      credentialRequests: [
        {
          type: "DummyCredential",
          issuers: [
            "did:unum:042b9089-9ee9-4217-844f-b01965cf569a"
          ]
        }
      ],
      holderAppUuid: "a91a5574-e338-46bd-9405-3a72acbd1b6a"	
	}
	
    return (
      <div>
        <h1>Reference Client Application</h1>
        <WidgetHostAndController
          custContext={emailId: 'test@abc.com'}
          presentationRequest={presentationInput}
        />
      </div>
    );
  }
}

export default App;
```

SDK expects the following env's to be defined as part of the main application.

REACT_APP_PRESENTATION_END_POINT - API REST end point to get the deeplink and QrCode detail
REACT_APP_SMS_END_POINT - API REST end point to send SMS to the registered phone number
REACT_APP_EMAIL_END_POINT - API REST end point to send email to the registered email id
REACT_APP_LOGIN_PAGE - URL to redirect to login page of the customer
REACT_APP_APPLICATION_TITLE - Title of the Client application
REACT_APP_ENABLE_LOG - Parameter to enable / disable console log

#### .env sample
REACT_APP_PRESENTATION_END_POINT=http://localhost:8082/api/requestPresentation
REACT_APP_SMS_END_POINT=http://localhost:8082/api/sendSMS
REACT_APP_EMAIL_END_POINT=http://localhost:8082/api/sendEmail
REACT_APP_LOGIN_PAGE=https://demo.unumid.org/login
REACT_APP_APPLICATION_TITLE=ACME
REACT_APP_ENABLE_LOG=true
