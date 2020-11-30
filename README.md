# Verifier-Client-SDK
SDK which helps the client to manage how deeplink can be presented to holder

## Installation
This library is available in Github, built with react framework. This library uses **react-bootstrap** node module for rendering basic components and styling.  Custom basic components are written with these bootstrap library and used in the library.  

To add it to the react application, run `yarn add verifier-client-sdk@https://github.com/UnumID/Verifier-Client-SDK.git` or add the following to the `dependencies` section of the `package.json` and run `yarn install`.

```
"verifier-client-sdk": "https://github.com/UnumID/Verifier-Client-SDK.git"
```

## Exposed Library Contents
### WidgetHostAndController
Primary widget internally manages different ways to send the deeplink to the holder through self managed widgets based on the given customer context.

This widget accepts two parameters of type `CustomerContext` and `PresentationRequest`.
`CustomerContext` will be used to understand the context of the customer such as phone number, email id, and also whether the client 
application will be able to scan the QR Code.

`PresentationRequest` contains input details required to get the deeplink from Verifier Application

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

The SDK has a dependency with 3 REST end points which are expected to be implemented by the Consumer of this library.  

**Server reference application** is available at Git and can be cloned using 
`git clone https://github.com/UnumID/Verifier-Client-SDK-Server-Reference-App.git`. 

REST End Point | Description
-------------- | -----------
**/api/requestPresentation** | To get deeplink, QR code details from the Verifier Application
**/api/sendSMS** | To send SMS to the customer mobile number registered
**/api/sendEmail** | To send Email to the email id registered 

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

**Client reference application** is available at Git and can be cloned using 
`git clone https://github.com/UnumID/Verifier-Client-SDK-Client-Reference-App.git`. 

#### Templates for sending SMS and Email

Library has a provision to modify the templates used for sending SMS and Email.  Templates are available at **src/config/templates**.
These are availabe as json files and can be modified based on the need.  

**Please note any changes in these templates would require a re-build of this library.**

To re-build this library run `yarn build`.

###### SMS Template

Mustache web templates system is used to provision the links in the text messages.  SMS template text must have **{{link}}** anywhere in the text, and library will replace that with the relevant deeplink.

```
JSON Format
{
  "templateText": "Authentication Request: ACME website. Click here to complete: {{link}}"
}
```

**templateText** element value: **Authentication Request: ACME website. Click here to complete: {{link}}.**
Library formats the text as **Authentication Request: ACME website. Click here to complete: http://unumid.org.**

###### Email Template

Mustache web templates system is used to provision the links in the template text messages.  Email template text must have any text surrounded by the symbol **{{}}**, and library will replace them as anchor tags with the relevant deeplink.

```
JSON Format
{
  "subjectText": "Authentication Request: ACME website",
  "htmlTemplateText": "Click {{here}} to complete."
}
```

**htmlTemplateText** element value: **Click {{here}} to complete.**
Library formats the text as **Click [here](http://unumid.org) to complete.**


## Environment Variables

SDK expects the following env's to be defined as part of the main application.

#### .env List

Name | Description
---- | -----------
REACT_APP_PRESENTATION_END_POINT | API REST end point to get the deeplink and QrCode detail
REACT_APP_SMS_END_POINT | API REST end point to send SMS to the registered phone number
REACT_APP_EMAIL_END_POINT | API REST end point to send email to the registered email id
REACT_APP_LOGIN_PAGE | URL to redirect to login page of the customer
REACT_APP_APPLICATION_TITLE | Title of the Client application
REACT_APP_ENABLE_LOG | Parameter to enable / disable console log

#### .env Example
```
REACT_APP_PRESENTATION_END_POINT=http://localhost:8082/api/requestPresentation
REACT_APP_SMS_END_POINT=http://localhost:8082/api/sendSMS
REACT_APP_EMAIL_END_POINT=http://localhost:8082/api/sendEmail
REACT_APP_LOGIN_PAGE=https://demo.unumid.org/login
REACT_APP_APPLICATION_TITLE=ACME
REACT_APP_ENABLE_LOG=true
```