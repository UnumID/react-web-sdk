# Web SDK
The Unum ID Web SDK is a library for adding Unum ID functionality and UI to a React application. It helps you create PresentationRequests and share them with an Unum ID-powered mobile app.

## Installation
The Web SDK is currently only available via GitHub, but will be available via the npm/yarn registries soon.

Using npm:
```
npm install @unumid/web-sdk@https://github.com/UnumID/Verifier-Client-SDK.git
```

Using yarn:
```
yarn add @unumid/web-sdk@https://github.com/UnumID/Verifier-Client-SDK.git
```

or add the following to your `package.json` and run `npm/yarn install`
```
"@unumid/web-sdk": "https://github.com/UnumID/Verifier-Client-SDK.git"
```

## Functionality
### Creating PresentationRequests
By default, the Web SDK will create a PresentationRequest as soon as it is rendered, and will periodically regenerate the PresentationRequest (to ensure that it does not expire) until the user shares data or declines the request, or the widget is unmounted. You can use different combinations of props (see below) to choose how much control over PresentationRequest creation you want to have.

### Displaying deeplinks
PresentationRequests are shared to an Unum ID-powered mobile app a user's device via deep links. The Web SDK determines how it displays them based on the browser's userAgent.

#### Button
On mobile browsers, the Web SDK will default to displaying the deep link as a button, which can be tapped to open the deeplink in the mobile app.

#### QR Code
On non-mobile browsers, the Web SDK will default to displaying the deep link as a QR code that users can scan with their mobile device.


#### Fallback options
In some situations, neither a QR code nor a button is convenient. The Web SDK offers the following fallback options for sending the deep link to the user's device.

**push notification** (coming soon): sends a push notification to the user's device. The user must have push notifications enabled for an Unum ID-powered mobile app in order to use this option.

**sms**: Sends the user an sms containing the deeplink, which they can open on their device. You must provide the user's mobile phone number in order to use this option.

**email**: Sends the user an email containing the deeplink, which they can open on their device. You must providetThe user's email address in order to use this option.

**login**: If your client application doesn't have the information required to use the desired fallback options, we can redirect them to your existing login page.

## API
### WidgetHostAndController Component
The Web SDK exports a single component, `WidgetHostAndController` (TODO: rename to something better)
This component encapsulates all of the Web SDK's functionality.


#### Props
**applicationTitle** (string) _required_: The name of your Unum ID powered mobile app

**userInfo** (`UserInfo`) _required_: Information about a logged in user of your application. The Web SDK will use this to determine which fallback options are available. (TODO: this should not be required)

**presentationRequest** (`PresentationRequestResponse`) _optional_: a `PresentationRequestResponse` object, created on your server via the [Server SDK](https://github.com/UnumID/Server-SDK-TypeScript). You may provide this prop in combination with setting `createInitialPresentationRequest` (below) to `false` for more control over when the widget should display a PresentationRequest to the user.

**deeplinkImgSrc** (string) _optional_: path to the image to display as a Deeplink button(TODO: this should be required)

**createInitialPresentationRequest** (boolean) _optional_: Whether the widget should immediately call `createPresentationRequest` on load. You can combine this with the `presentationRequest` prop to gain control over when the initial PresentationRequest is created. By default, it is `false` if you provide the `presentationRequest` prop and `true` if you do not.

**createPresentationRequest** (`() => Promise<PresentationRequestResponse> | void`) _optional_: A function which should call your Server SDK powered backend to create a PresentationRequest. If it returns a value, it is assumed that that value is a `PresentationRequestResponse`. If it does not return a value, you must provide the response via the `presentationRequest` prop in order for the widget to display the PresentationRequest. (As in a redux application, where `createPresentationRequest` will probably be an async action creator of some sort.) The widget will call this function on an interval in order to ensure that it never displays an expired PresentationRequest (TODO: this should be required)

**sendEmail** (`(options: EmailOptions) => Promise<SuccessResponse>`) _optional_: A function which takes an `EmailOptions` object and calls your backend to send a deeplink via email. You may use the `sendEmail` function from the Server SDK to send the email, or your own email provider. If this prop is not provided, the Email fallback option  will not be available.

**sendSms** (`(options: SmsOptions) => Promise<SuccessResponse>`) _optional_: A function which takes an `SmsOptions` object and calls your backend to send a deeplink via sms. You may use the `sendSMS` function from the Server SDK to send the SMS, or your own SMS provider. If this prop is not provided, the SMS fallback option will not be available.

**goToLogin** (`() => void`) _optional_: A function which redirects the user to your existing login page. You should provide this if you are using Unum ID as an additional authentication factor on top of your existing login. If this prop is not provided, the login fallback option will not be available.



## Examples
The simplest possible use case. It allows the SDK to handle all PresentationRequest creation, and does not provide any additional fallback options.
```jsx
import WidgetHostAndController from '@unumid/web-sdk';

// Import an image to use for the (mobile) deeplink button.
// In this example, images are stored in an 'assets' directory. Your application may be different.
import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App = () => {

  const createPresentationRequest = async () => {
    // Call your backend to create a PresentationRequest and return the response.
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

THe simplest use case (above), using TypeScript
```tsx
import { FC } from 'react';

import WidgetHostAndController, { PresentationRequestResponse } from '@unumid/web-sdk';

// Import an image to use for the (mobile) deeplink button
// In this example, images are stored in an 'assets' directory. Your application may be different.
import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App: FC = () => {

  const createPresentationRequest = async (): Promise<PresentationRequestResponse> => {
    // Call your backend to create a PresentationRequest and return the response.
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

A slightly more complex use case which allows the SDK to handle PresentationRequest creation, but enables fallback options.
```jsx
import WidgetHostAndController from '@unumid/web-sdk';

// Import an image to use for the (mobile) deeplink button.
// In this example, images are stored in an 'assets' directory. Your application may be different.
import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App = () => {
  const createPresentationRequest = async () => {
    // Call your backend to create a PresentationRequest and return the response.
  };

  const sendEmail = async (options) => {
    // Call your backend to send a deeplink via email and return the response.
  }

  const sendSms = async (options) => {
    // Nall your backend to send a deeplink via sms and return the response.
  }

  const goToLogin = async () => {
    // Navigate to your login page.
  }

  return (
    <WidgetHostAndController
      applicationTitle="My Application"
      userInfo={{
        email: 'mrplow@gmail.com', // The user's email is required to enable the email fallback.
        phone: 'KL5-5555' // The user's mobile phone number is required to enable the sms fallback.
      }}
      createPresentationRequest={createPresentationRequest}
      deeplinkImgSrc={deeplinkImgSrc}
      sendEmail={sendEmail}
      sendSms={sendSms}
      goToLogin={goToLogin}
    />
  );
}
```

Allows your application more control over when the initial PresentationRequest is created. Enables fallback options.
```jsx
import { useState } from 'react';

import WidgetHostAndController from '@unumid/web-sdk';

// Import an image to use for the (mobile) deeplink button.
// In this example, images are stored in an 'assets' directory. Your application may be different.
import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App = () => {
  // Save the PresentationRequest in local component state.
  const [presentationRequest, setPresentationRequest] = useState();

  const createPresentationRequest = async () => {
    const options = {
      // Customizable PresentationRequest options.
    }
    // Call your backend to create a PresentationRequest and save in the component state.
    const response = await callBackend(options);
    setPresentationRequest(response)
  };

  const sendEmail = async (options) => {
    // Call your backend to send a deeplink via email and return the response.
  }

  const sendSms = async (options) => {
    // Call your backend to send a deeplink via sms and return the response.
  }

  const goToLogin = async () => {
    // Navigate to your login page.
  }

  return (
    <WidgetHostAndController
      applicationTitle="My Application"
      userInfo={{
        email: 'mrplow@gmail.com', // The user's email is required to enable the email fallback.
        phone: 'KL5-5555' // The user's mobile phone number is required to enable the sms fallback.
      }}
      presentationRequest={presentationRequest} // Provide the Web SDK with an already-created PresentationRequest.
      createInitialPresentationRequest={false} // Prevent the Web SDK from immediately creating a new PresentationRequest on load.
      createPresentationRequest={createPresentationRequest} // We still need to provide the Web SDK with a createPresentationRequest function so that it can create a new PresentationRequest before the current one expires.
      deeplinkImgSrc={deeplinkImgSrc}
      sendEmail={sendEmail}
      sendSms={sendSms}
      goToLogin={goToLogin}
    />
  );
}
```

Applications using Redux and other similar state management libraries have some unique challenges, as side effects such as creating resources usually happen in action creator functions, which dispatch actions to the store rather than returning values. In this example, we're providing the Web SDK with our `createPresentationRequest` action creator to call, then selecting the created PresentationRequest from the store to provide separately.
```jsx
import { useSelector } from 'react-redux';

import WidgetHostAndController from '@unumid/web-sdk';

// Import your action creators. They have been wrapped in React hooks in this example, but your application may be different.
import { useActionCreators } from './hooks/actionCreators';

// Import an image to use for the (mobile) deeplink button.
// In this example, images are stored in an 'assets' directory. Your application may be different.
import deeplinkImgSrc from '../assets/deeplink-button-image.png';

const App = () => {
  // These functions can be defined as async action creators using redux-thunk, redux-saga, or other libraries.
  const { createPresentationRequest, sendSms, sendEmail } = useActionCreators();

  // Select a previously created PresentationRequest from state.
  const presentationRequest = useSelector(state => state.presentationRequest);

  // Select the logged in user from state.
  const loggedInUser = useSelector(state => state.loggedInUser);

  const goToLogin = async () => {
    // Navigate to your login page.
  }

  return (
    <WidgetHostAndController
      applicationTitle="My Application"
      userInfo={{
        email: loggedInUser.email, // The user's email is required to enable the email fallback.
        phone: loggedInUser.mobilePhoneNumber // The user's mobile phone number is required to enable the sms fallback.
      }}
      presentationRequest={presentationRequest} // Provide the Web SDK with an already-created PresentationRequest.
      createInitialPresentationRequest={true} // The Web SDK should immediately create a PresentationRequest on load.
      createPresentationRequest={createPresentationRequest} // We still need to provide the Web SDK with a createPresentationRequest function so that it can create a new PresentationRequest before the current one expires.
      deeplinkImgSrc={deeplinkImgSrc}
      sendEmail={sendEmail}
      sendSms={sendSms}
      goToLogin={goToLogin}
    />
  );
}
```

## Minimum Requirements
The minimum supported version of React is v16.8.0. If you are using an older version of React, you will need to upgrade it to at least v16.8.0 in order to use the Web SDK.

## TypeScript support
The Web SDK is written in TypeScript and exports relevant types. Some types are also pulled from our shared types library, [`@unumid/types`](https://github.com/UnumID/types). We recommend adding `@unumid/types` as a dependency to ensure full type support between the Web SDK and [Server SDK](https://github.com/UnumID/Server-SDK-TypeScript).

**Client reference application** is available at Git and can be cloned using 
`git clone https://github.com/UnumID/Verifier-Client-SDK-Client-Reference-App.git`. 
