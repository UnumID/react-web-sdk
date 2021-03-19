# Web SDK
SDK which helps the client to manage how deeplink can be presented to holder
A React-based SDK which helps manage creating and sending PresentationRequests 

## Installation
This library is available in Github, built with react framework.

To add it to the react application, run `yarn add @unumid/web-sdk@https://github.com/UnumID/Verifier-Client-SDK.git` or add the following to the `dependencies` section of the `package.json` and run `yarn install`.

```
"@unumid/web-sdk": "https://github.com/UnumID/Verifier-Client-SDK.git"
```

Using npm:
```
npm install @unumid/web-sdk@https://github.com/UnumID/Verifier-Client-SDK.git
```

Using yarn:
```
yarn add @unumid/web-sdk@https://github.com/UnumID/Verifier-Client-SDK.git
```

The library will be available via the npm/yarn registries soon, after which the url will not be necessary

## Functionality
### Creating PresentationRequests

## API
### WidgetHostAndController Component
The Web SDK exports a single component, `WidgetHostAndController` (TODO: rename to something better)
This component encapsulates all of the Web SDK's functionality.


#### Props
**applicationTitle** (string) _required_: The name of your Unum ID powered mobile app

**userInfo** (`UserInfo`) _required_: Information about a logged in user of your application. The Web SDK will use this to determine which fallback options are available. (TODO: this should not be required)

**presentationRequest** (`PresentationRequestResponse`) _optional_: a `PresentationRequestResponse` object, created on your server via the [Server SDK](https://github.com/UnumID/Server-SDK-TypeScript). You may provide this prop in combination with setting `createInitialPresentationRequest` (below) to `false` for more control over when the widget should display a PresentationRequest to the user.

**deeplinkImgSrc** (string) _optional_: path to the image to display as a Deeplink button(TODO: this should be required)

**createInitialPresentationRequest** (boolean) _optional_: Whether the widget should immediately call `createPresentationRequest` on load. You can combine this with the `presentationRequest` prop to gain control over when the initial presentationRequest is created. By default, it is `false` if you provide the `presentationRequest` prop and `true` if you do not.

**createPresentationRequest** (`() => Promise<PresentationRequestResponse> | void`) _optional_: A function which should call your Server SDK powered backend to create a presentationRequest. If it returns a value, it is assumed that that value is a `PresentationRequestResponse`. If it does not return a value, you must provide the response via the `presentationRequest` prop in order for the widget to display the presentationRequest. (As in a redux application, where `createPresentationRequest` will probably be an async action creator of some sort.) The widget will call this function on an interval in order to ensure that it never displays an expired presentationRequest (TODO: this should be required)

**sendEmail** (`(options: EmailOptions) => Promise<SuccessResponse>`) _optional_: A function which takes an `EmailOptions` object and calls your backend to send a deeplink via email. You may use the `sendEmail` function from the Server SDK to send the email, or your own email provider. If this prop is not provided, the Email fallback option  will not be available.

**sendSms** (`(options: SmsOptions) => Promise<SuccessResponse>`) _optional_: A function which takes an `SmsOptions` object and calls your backend to send a deeplink via sms. You may use the `sendSMS` function from the Server SDK to send the SMS, or your own SMS provider. If this prop is not provided, the SMS fallback option will not be available.

**goToLogin** (`() => void`) _optional_: A function which redirects the user to your existing login page. You should provide this if you are using Unum ID as an additional authentication factor on top of your existing login. If this prop is not provided, the login fallback option will not be available.



## Examples
### Simplest possible use case. Allows the SDK to handle all PresentationRequest creation, and does not provide any additional fallback options.
```tsx
import { FC } from 'react';

import WidgetHostAndController, { PresentationRequestResponse } from '@unumid/web-sdk';

import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App: FC = () => {

  const createPresentationRequest = async (): Promise<PresentationRequestResponse> => {
    // call your backend to create a presentationRequest and return the response
  };

  return (
    <WidgetHostAndController
      applicationTitle="My Application"
      userInfo={{}}
      createPresentationRequest={createPresentationRequest}
      deeplinkImgSrc={deeplinkImgSrc}
    />
  );
}
```

### Allows the SDK to handle PresentationRequest creation and enables fallback options
```tsx
import { FC } from 'react';

import WidgetHostAndController, {
  EmailOptions,
  SmsOptions,
  PresentationRequestResponse,
  SuccessResponse
} from '@unumid/web-sdk';

import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App: FC = () => {

  const createPresentationRequest = async (): Promise<PresentationRequestResponse> => {
    // call your backend to create a presentationRequest and return the response
  };

  const sendEmail = async (options: EmailOptions): Promise<SuccessResponse> => {
    // call your backend to send a deeplink via email and return the response
  }

  const sendSms = async (options: SmsOptions): Promise<SuccessResponse> => {
    // call your backend to send a deeplink via sms and return the response
  }

  const goToLogin = async (options: EmailOptions): Promise<SuccessResponse> => {
    // navigate to your login page
  }

  return (
    <WidgetHostAndController
      applicationTitle="My Application"
      userInfo={{}}
      createPresentationRequest={createPresentationRequest}
      deeplinkImgSrc={deeplinkImgSrc}
      sendEmail={sendEmail}
      sendSms={sendSms}
      goToLogin={goToLogin}
    />
  );
}
```

### Allows your application more control over when the initial PresentationRequest is created. Enables fallback options.
```tsx
import { FC, useState } from 'react';

import WidgetHostAndController, {
  EmailOptions,
  SmsOptions,
  PresentationRequestResponse,
  SuccessResponse
} from '@unumid/web-sdk';
import { PresentationRequestOptions } from '@unumid/types';

import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App: FC = () => {
  const [presentationRequest, setPresentationRequest] = useState();

  const createPresentationRequest = async (): Promise<PresentationRequestResponse> => {
    // call your backend to create a presentationRequest and return the response
    const options: PresentationRequestOptions = {
      // customizable presentationRequest options
    }
    const response = await callBackend(options);
    setPresentationRequest(response)
  };

  const sendEmail = async (options: EmailOptions): Promise<SuccessResponse> => {
    // call your backend to send a deeplink via email and return the response
  }

  const sendSms = async (options: SmsOptions): Promise<SuccessResponse> => {
    // call your backend to send a deeplink via sms and return the response
  }

  const goToLogin = async (options: EmailOptions): Promise<SuccessResponse> => {
    // navigate to your login page
  }

  return (
    <WidgetHostAndController
      applicationTitle="My Application"
      userInfo={{}}
      createPresentationRequest={createPresentationRequest}
      presentationRequest={presentationRequest}
      createInitialPresentationRequest={false}
      deeplinkImgSrc={deeplinkImgSrc}
      sendEmail={sendEmail}
      sendSms={sendSms}
      goToLogin={goToLogin}
    />
  );
}
```

### In an application using Redux or another flux-like state management library
```tsx
import { FC } from 'react';
import { useSelector } from 'react-redux';

import WidgetHostAndController, {
  EmailOptions,
  SmsOptions,
  PresentationRequestResponse,
  SuccessResponse
} from '@unumid/web-sdk';
import { PresentationRequestOptions } from '@unumid/types';

// import your action creators. We're assuming they have been wrapped into hooks in this example, but your application may be different.
import { useActionCreators } from './hooks/actionCreators';

import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App: FC = () => {
  // these functions can be defined as async action creators using redux-thunk, redux-saga, or other libraries
  const { createPresentationRequest, sendSms, sendEmail } = useActionCreators();
  const presentationRequest = useSelector(state => state.presentationRequest);
  const loggedInUser = useSelector(state => state.loggedInUser);

  const goToLogin = async (options: EmailOptions): Promise<SuccessResponse> => {
    // navigate to your login page
  }

  return (
    <WidgetHostAndController
      applicationTitle="My Application"
      userInfo={loggedInUser}
      createPresentationRequest={createPresentationRequest}
      presentationRequest={presentationRequest}
      createInitialPresentationRequest={false}
      deeplinkImgSrc={deeplinkImgSrc}
      sendEmail={sendEmail}
      sendSms={sendSms}
      goToLogin={goToLogin}
    />
  );
}
```

### Minimum Requirements
The minimum supported version of React is v16.8.0. If you are using an older version of React, you will need to upgrade it to at least v16.8.0 in order to use the Web SDK.

### TypeScript support
The Web SDK is written in TypeScript and exports relevant types. Some types are also pulled from our shared types library, [`@unumid/types`](https://github.com/UnumID/types). We recommend adding `@unumid/types` as a dependency to ensure full type support between the Web SDK and [Server SDK](https://github.com/UnumID/Server-SDK-TypeScript).

**Client reference application** is available at Git and can be cloned using 
`git clone https://github.com/UnumID/Verifier-Client-SDK-Client-Reference-App.git`. 
