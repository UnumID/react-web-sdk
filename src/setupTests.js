// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

process.env.REACT_APP_PRESENTATION_END_POINT='http://localhost:8082/api/requestPresentation'
process.env.REACT_APP_SMS_END_POINT='http://localhost:8082/api/sendSMS'
process.env.REACT_APP_EMAIL_END_POINT='http://localhost:8082/api/sendEmail'
process.env.REACT_APP_LOGIN_PAGE='#login'
process.env.REACT_APP_APPLICATION_TITLE='ACME'