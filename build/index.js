'use strict';

var React = require('react');
var http = require('http');
var https = require('https');
var url = require('url');
var require$$0 = require('stream');
var assert = require('assert');
var tty = require('tty');
var util = require('util');
var os = require('os');
var zlib = require('zlib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
var tty__default = /*#__PURE__*/_interopDefaultLegacy(tty);
var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$7 = ".link-button {\n  font-family: inherit;\n  font-weight: 300;\n  color: #007bff;\n  text-decoration: none;\n  text-align: center;\n  vertical-align: middle;\n  background-color: transparent;\n  font-size: 1rem;\n  line-height: 1.5;\n  padding: .375rem .75rem;\n  cursor: pointer;\n  border: none;\n}\n\n.link-button:focus {\n  outline: none;\n}\n";
styleInject(css_248z$7);

/**
 * Component that renders a button styled as a link.
 */
var LinkButton = function (_a) {
    var onClick = _a.onClick, children = _a.children;
    return (React__default["default"].createElement("button", { type: "button", className: "link-button", onClick: onClick }, children));
};

var css_248z$6 = ".spinner {\n  border: 8px solid #f5f5f5;\n  border-top: 8px solid #dddddd;\n  border-radius: 50%;\n  width: 80px;\n  height: 80px;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n";
styleInject(css_248z$6);

/**
 * Component responsible for rendering an animated spinner,
 * to be displayed while waiting for data bo be loaded.
 */
var Spinner = function () { return (React__default["default"].createElement("div", { className: "spinner", "aria-label": "spinner" })); };

var img = "data:image/png;base64,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";

var css_248z$5 = ".branding {\n  margin-top: -15px;\n}\n\n.branding img {\n  max-width: 130px;\n}\n";
styleInject(css_248z$5);

/**
 * Component responsible for displaying Unum ID branding.
 */
var Branding = function () { return (React__default["default"].createElement("a", { className: "branding", target: "_blank", rel: "noopener noreferrer", href: "https://unumid.org" },
    React__default["default"].createElement("img", { alt: "Powered by Unum ID", src: img }))); };

var css_248z$4 = ".qr-code {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n}\n\n.qr-code .help {\n  margin-bottom: 6px;\n}\n\n.qr-code .help-item {\n  text-align: left;\n  font-size: 12px;\n}\n\n.qrcode-img-wrapper {\n  height: 196px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.qr-code .bold {\n  font-weight: 700;\n}\n\n.qr-code .light {\n  font-weight: 300;\n}\n\n.qr-code .btn.focus, .btn:focus {\n  box-shadow: none;\n}\n\n.qr-code .image-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.qr-code .qr-code-img {\n  width: 220px;\n}\n\n@media screen and (max-width: 600px) {\n  .qrcode-content {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .description {\n    margin-left: 0;\n    margin-top: 24px;\n  }\n}\n";
styleInject(css_248z$4);

/**
 * Component responsible for rendering a QR code
 */
var QRCode = function (_a) {
    var qrCode = _a.qrCode, holderAppName = _a.holderAppName;
    var _b = React.useState(false), showNeedHelp = _b[0], setShowNeedHelp = _b[1];
    var handleLinkButtonClick = function () {
        setShowNeedHelp(!showNeedHelp);
    };
    var renderQrCode = function () { return (React__default["default"].createElement("div", { className: "image-wrapper" },
        React__default["default"].createElement("img", { className: "qr-code-img", alt: "qr code", src: qrCode }),
        React__default["default"].createElement(Branding, null))); };
    return (React__default["default"].createElement("div", { className: "qr-code" },
        React__default["default"].createElement("div", { className: "bold" }, "To continue, scan this QR code"),
        React__default["default"].createElement("div", { className: "light" },
            "with your phone camera or ",
            holderAppName,
            " app:"),
        React__default["default"].createElement(LinkButton, { onClick: handleLinkButtonClick }, "Need help scanning?"),
        showNeedHelp && (React__default["default"].createElement("div", { className: "help" },
            React__default["default"].createElement("div", { className: "help-item" },
                "1. Install the ",
                holderAppName,
                " app from the app store."),
            React__default["default"].createElement("div", { className: "help-item" },
                "2. Open the ",
                holderAppName,
                " app and click \"Scan a QR code\"."),
            React__default["default"].createElement("div", { className: "help-item" }, "3. Hover over the QR code."))),
        React__default["default"].createElement("div", { className: "qrcode-img-wrapper" }, qrCode ? renderQrCode() : React__default["default"].createElement(Spinner, null))));
};

var isArray$1 = Array.isArray;

function cc(obj) {
  var out = "";

  if (typeof obj === "string" || typeof obj === "number") return obj || ""

  if (isArray$1(obj))
    for (var k = 0, tmp; k < obj.length; k++) {
      if ((tmp = cc(obj[k])) !== "") {
        out += (out && " ") + tmp;
      }
    }
  else
    for (var k in obj) {
      if (obj.hasOwnProperty(k) && obj[k]) out += (out && " ") + k;
    }

  return out
}

var css_248z$3 = ".deeplink-button {\n  cursor: pointer;\n  margin-bottom: 20px;\n  max-width: 250px;\n  max-height: 50px;\n}\n\n.deeplink-button img {\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css_248z$3);

/**
 * Component responsible for displaying a deep link as a clickable button.
 * Primarily intended for use in mobile browsers.
 */
var DeeplinkButton = function (_a) {
    var target = _a.target, href = _a.href, className = _a.className, children = _a.children;
    return (React__default["default"].createElement("a", { className: cc(['deeplink-button', className]), href: href, target: target }, children));
};

var css_248z$2 = ".deeplink-widget {\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  display: flex;\n}\n\n.deeplink-widget .error {\n  font-weight: 700;\n  color: #ff0000;\n}\n\n.deeplink-widget .deeplink-button-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n";
styleInject(css_248z$2);

/**
 * Component responsible for rendering a deep link referencing a PresentationRequest,
 * either as a QR code (default on desktop) or a button (default on mobile).
 */
var DeeplinkWidget = function (_a) {
    var holderApp = _a.holderApp, qrCode = _a.qrCode, deeplink = _a.deeplink, canScan = _a.canScan;
    var renderQrCode = function () { return React__default["default"].createElement(QRCode, { qrCode: qrCode, holderAppName: holderApp.name }); };
    var renderDeeplinkButton = function () { return (React__default["default"].createElement("div", { className: "deeplink-button-wrapper" },
        React__default["default"].createElement(DeeplinkButton, { target: "_blank", href: deeplink },
            React__default["default"].createElement("img", { src: holderApp.deeplinkButtonImg, alt: "Verify with ".concat(holderApp.name) })),
        React__default["default"].createElement(Branding, null))); };
    return (React__default["default"].createElement("div", { className: "deeplink-widget" },
        canScan && renderQrCode(),
        !canScan && renderDeeplinkButton()));
};

/**
 * Component responsible for rendering a button to trigger the current fallback method.
 */
var FallbackButton = function (_a) {
    var client = _a.client, fallbackType = _a.fallbackType, nextFallback = _a.nextFallback, setFallbackError = _a.setFallbackError, userInfo = _a.userInfo, presentationRequest = _a.presentationRequest, sendEmail = _a.sendEmail, sendSms = _a.sendSms, sendPushNotification = _a.sendPushNotification, goToLogin = _a.goToLogin;
    if (!fallbackType) {
        return null;
    }
    var handleClick = function () {
        switch (fallbackType) {
            case 'EMAIL':
                actuallySendEmail();
                break;
            case 'SMS':
                actuallySendSms();
                break;
            case 'PUSH':
                actuallySendPush();
                break;
            case 'LOGIN': {
                if (goToLogin) {
                    goToLogin();
                }
                break;
            }
            default:
                console.log('invalid fallback type');
                break;
        }
        nextFallback();
    };
    // Button text for each fallback type.
    var loginText = React__default["default"].createElement(React__default["default"].Fragment, null, "Log in for more verification options.");
    var emailText = React__default["default"].createElement(React__default["default"].Fragment, null, "Get an email instead.");
    var smsText = React__default["default"].createElement(React__default["default"].Fragment, null, "Get an SMS instead.");
    var pushText = React__default["default"].createElement(React__default["default"].Fragment, null, "Get a push notification instead.");
    /**
     * Returns the correct button text depending on the fallback type.
     */
    var renderFallbackText = function () {
        switch (fallbackType) {
            case 'EMAIL':
                return emailText;
            case 'SMS':
                return smsText;
            case 'PUSH':
                return pushText;
            case 'LOGIN': {
                return loginText;
            }
            default:
                console.log('invalid fallback type');
                return null;
        }
    };
    /**
     * Sends a deeplink via email.
     * Uses a custom sendEmail function if availiable
     * Otherwise uses the default provided by the UnumIDClient.
     */
    var actuallySendEmail = function () { return __awaiter(void 0, void 0, void 0, function () {
        var deeplink, options, e_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Clear any previous fallback error message.
                    setFallbackError(undefined);
                    if (!userInfo || !userInfo.email) {
                        // We can't send the user an email if we don't have the user's email address.
                        console.log('email fallback not available');
                        return [2 /*return*/];
                    }
                    deeplink = presentationRequest.deeplink;
                    options = {
                        to: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email,
                        deeplink: deeplink,
                    };
                    if (!sendEmail) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sendEmail(options)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log('error sending email', e_1);
                    setFallbackError("Error sending email to ".concat(userInfo.email, "."));
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!client) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, client.sendEmail(options)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _a.sent();
                    console.log('error sending email', e_2);
                    setFallbackError("Error sending email to ".concat(userInfo.email, "."));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    /**
   * Sends a deeplink via sms.
   * Uses a custom sendSMS function if availiable
   * Otherwise uses the default provided by the UnumIDClient.
   */
    var actuallySendSms = function () { return __awaiter(void 0, void 0, void 0, function () {
        var deeplink, options, e_3, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Clear any previous fallback error message.
                    setFallbackError(undefined);
                    if (!userInfo || !userInfo.phone) {
                        // We can't send the user an SMS if we don't have their mobile phone number.
                        console.log('sms fallback not available');
                        return [2 /*return*/];
                    }
                    deeplink = presentationRequest.deeplink;
                    options = {
                        to: userInfo.phone,
                        deeplink: deeplink,
                    };
                    if (!sendSms) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sendSms(options)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log('error sending sms', e_3);
                    setFallbackError("Error sending sms to ".concat(userInfo.phone, "."));
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!client) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, client.sendSms(options)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _a.sent();
                    console.log('error sending sms', e_4);
                    setFallbackError("Error sending sms to ".concat(userInfo.phone, "."));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    /**
   * Sends a deeplink via push notification (APNS or FCM).
   * Uses a custom sendPushNotification function if availiable
   * Otherwise uses the default provided by the UnumIDClient.
   */
    var actuallySendPush = function () { return __awaiter(void 0, void 0, void 0, function () {
        var pushToken, deeplink, holderAppUuid, options, e_5, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Clear any previous fallback error message.
                    setFallbackError(undefined);
                    if (!userInfo) {
                        // we can't send the user a push notification if we don't know who they are
                        console.log('push fallback not available.');
                        return [2 /*return*/];
                    }
                    pushToken = userInfo.pushToken;
                    if (!pushToken) {
                        // we can't send the user a push notification if we don't have their device token.
                        console.log('push fallback not available.');
                        return [2 /*return*/];
                    }
                    if (Array.isArray(pushToken) && pushToken.length === 0) {
                        // we can't send a push notification to an empty array
                        console.log('push fallback not available.');
                        return [2 /*return*/];
                    }
                    deeplink = presentationRequest.deeplink, holderAppUuid = presentationRequest.presentationRequest.holderAppUuid;
                    options = {
                        token: pushToken,
                        deeplink: deeplink,
                        holderAppUuid: holderAppUuid,
                    };
                    if (!sendPushNotification) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sendPushNotification(options)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    console.log('error sending push notification', e_5);
                    setFallbackError('Error sending push notification.');
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!client) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, client.sendPushNotification(options)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_6 = _a.sent();
                    console.log('error sending push notification', e_6);
                    setFallbackError('Error sending push notification.');
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return (React__default["default"].createElement("div", { className: "fallback-button" },
        React__default["default"].createElement(LinkButton, { onClick: handleClick }, renderFallbackText())));
};

var saasUrls = {
    development: 'https://api.dev-unum.id',
    sandbox: 'https://api.sandbox-unum.id',
    production: 'https://api.unum.id',
};

var useTimeout = function (callback) {
    var _a = React.useState(false), isActive = _a[0], setIsActive = _a[1];
    var timeout;
    var start = function (delay) {
        if (!isActive) {
            setIsActive(true);
            setTimeout(callback, delay);
        }
    };
    var stop = function () {
        if (isActive) {
            clearTimeout(timeout);
            setIsActive(false);
        }
    };
    return [start, stop];
};

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = ms;
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

var common = setup;

var browser$1 = createCommonjsModule(function (module, exports) {
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = common(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};
});

var hasFlag = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os__default["default"].release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

var supportsColor_1 = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty__default["default"].isatty(1))),
	stderr: translateLevel(supportsColor(true, tty__default["default"].isatty(2)))
};

var node = createCommonjsModule(function (module, exports) {
/**
 * Module dependencies.
 */




/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util__default["default"].deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = supportsColor_1;

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty__default["default"].isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util__default["default"].format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = common(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util__default["default"].inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util__default["default"].inspect(v, this.inspectOpts);
};
});

var src = createCommonjsModule(function (module) {
/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = browser$1;
} else {
	module.exports = node;
}
});

var debug;

var debug_1 = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = src("follow-redirects");
    }
    catch (error) { /* */ }
    if (typeof debug !== "function") {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};

var URL = url__default["default"].URL;


var Writable = require$$0__default["default"].Writable;



// Create handlers that pass events from native requests
var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;

  // Destroys the socket on timeout
  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  }

  // Sets up a timer to trigger a timeout event
  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }
    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  }

  // Stops a timeout from triggering
  function clearTimer() {
    // Clear the timeout
    if (self._timeout) {
      clearTimeout(self._timeout);
      self._timeout = null;
    }

    // Clean up all attached listeners
    self.removeListener("abort", clearTimer);
    self.removeListener("error", clearTimer);
    self.removeListener("response", clearTimer);
    if (callback) {
      self.removeListener("timeout", callback);
    }
    if (!self.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  }

  // Attach callback if passed
  if (callback) {
    this.on("timeout", callback);
  }

  // Start the timer if or when the socket is opened
  if (this.socket) {
    startTimer(this.socket);
  }
  else {
    this._currentRequest.once("socket", startTimer);
  }

  // Clean up on events
  this.on("socket", destroyOnTimeout);
  this.on("abort", clearTimer);
  this.on("error", clearTimer);
  this.on("response", clearTimer);

  return this;
};

// Proxy all other public ClientRequest methods
[
  "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url__default["default"].format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    abortRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

    // If the redirect is relative, carry over the host of the last request
    var currentUrlParts = url__default["default"].parse(this._currentUrl);
    var currentHost = currentHostHeader || currentUrlParts.host;
    var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
      url__default["default"].format(Object.assign(currentUrlParts, { host: currentHost }));

    // Determine the URL of the redirection
    var redirectUrl;
    try {
      redirectUrl = url__default["default"].resolve(currentUrl, location);
    }
    catch (cause) {
      this.emit("error", new RedirectionError(cause));
      return;
    }

    // Create the redirected request
    debug_1("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url__default["default"].parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the confidential headers when redirecting to another domain
    if (!(redirectUrlParts.host === currentHost || isSubdomainOf(redirectUrlParts.host, currentHost))) {
      removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      this.emit("error", new RedirectionError(cause));
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url__default["default"].parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert__default["default"].equal(options.protocol, protocol, "protocol mismatch");
      debug_1("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return (lastValue === null || typeof lastValue === "undefined") ?
    undefined : String(lastValue).trim();
}

function createErrorType(code, defaultMessage) {
  function CustomError(cause) {
    Error.captureStackTrace(this, this.constructor);
    if (!cause) {
      this.message = defaultMessage;
    }
    else {
      this.message = defaultMessage + ": " + cause.message;
      this.cause = cause;
    }
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var e = 0; e < events.length; e++) {
    request.removeListener(events[e], eventHandlers[events[e]]);
  }
  request.on("error", noop);
  request.abort();
}

function isSubdomainOf(subdomain, domain) {
  const dot = subdomain.length - domain.length - 1;
  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}

// Exports
var followRedirects = wrap({ http: http__default["default"], https: https__default["default"] });
var wrap_1 = wrap;
followRedirects.wrap = wrap_1;

var _args = [
	[
		"axios@0.21.4",
		"/Users/jacobsinger/workspaces/unumid/react-web-sdk"
	]
];
var _from = "axios@0.21.4";
var _id = "axios@0.21.4";
var _inBundle = false;
var _integrity = "sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==";
var _location = "/axios";
var _phantomChildren = {
};
var _requested = {
	type: "version",
	registry: true,
	raw: "axios@0.21.4",
	name: "axios",
	escapedName: "axios",
	rawSpec: "0.21.4",
	saveSpec: null,
	fetchSpec: "0.21.4"
};
var _requiredBy = [
	"/"
];
var _resolved = "https://registry.npmjs.org/axios/-/axios-0.21.4.tgz";
var _spec = "0.21.4";
var _where = "/Users/jacobsinger/workspaces/unumid/react-web-sdk";
var author = {
	name: "Matt Zabriskie"
};
var browser = {
	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
};
var bugs = {
	url: "https://github.com/axios/axios/issues"
};
var bundlesize = [
	{
		path: "./dist/axios.min.js",
		threshold: "5kB"
	}
];
var dependencies = {
	"follow-redirects": "^1.14.0"
};
var description = "Promise based HTTP client for the browser and node.js";
var devDependencies = {
	coveralls: "^3.0.0",
	"es6-promise": "^4.2.4",
	grunt: "^1.3.0",
	"grunt-banner": "^0.6.0",
	"grunt-cli": "^1.2.0",
	"grunt-contrib-clean": "^1.1.0",
	"grunt-contrib-watch": "^1.0.0",
	"grunt-eslint": "^23.0.0",
	"grunt-karma": "^4.0.0",
	"grunt-mocha-test": "^0.13.3",
	"grunt-ts": "^6.0.0-beta.19",
	"grunt-webpack": "^4.0.2",
	"istanbul-instrumenter-loader": "^1.0.0",
	"jasmine-core": "^2.4.1",
	karma: "^6.3.2",
	"karma-chrome-launcher": "^3.1.0",
	"karma-firefox-launcher": "^2.1.0",
	"karma-jasmine": "^1.1.1",
	"karma-jasmine-ajax": "^0.1.13",
	"karma-safari-launcher": "^1.0.0",
	"karma-sauce-launcher": "^4.3.6",
	"karma-sinon": "^1.0.5",
	"karma-sourcemap-loader": "^0.3.8",
	"karma-webpack": "^4.0.2",
	"load-grunt-tasks": "^3.5.2",
	minimist: "^1.2.0",
	mocha: "^8.2.1",
	sinon: "^4.5.0",
	"terser-webpack-plugin": "^4.2.3",
	typescript: "^4.0.5",
	"url-search-params": "^0.10.0",
	webpack: "^4.44.2",
	"webpack-dev-server": "^3.11.0"
};
var homepage = "https://axios-http.com";
var jsdelivr = "dist/axios.min.js";
var keywords = [
	"xhr",
	"http",
	"ajax",
	"promise",
	"node"
];
var license = "MIT";
var main = "index.js";
var name = "axios";
var repository = {
	type: "git",
	url: "git+https://github.com/axios/axios.git"
};
var scripts = {
	build: "NODE_ENV=production grunt build",
	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
	examples: "node ./examples/server.js",
	fix: "eslint --fix lib/**/*.js",
	postversion: "git push && git push --tags",
	preversion: "npm test",
	start: "node ./sandbox/server.js",
	test: "grunt test",
	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"
};
var typings = "./index.d.ts";
var unpkg = "dist/axios.min.js";
var version = "0.21.4";
var pkg = {
	_args: _args,
	_from: _from,
	_id: _id,
	_inBundle: _inBundle,
	_integrity: _integrity,
	_location: _location,
	_phantomChildren: _phantomChildren,
	_requested: _requested,
	_requiredBy: _requiredBy,
	_resolved: _resolved,
	_spec: _spec,
	_where: _where,
	author: author,
	browser: browser,
	bugs: bugs,
	bundlesize: bundlesize,
	dependencies: dependencies,
	description: description,
	devDependencies: devDependencies,
	homepage: homepage,
	jsdelivr: jsdelivr,
	keywords: keywords,
	license: license,
	main: main,
	name: name,
	repository: repository,
	scripts: scripts,
	typings: typings,
	unpkg: unpkg,
	version: version
};

var httpFollow = followRedirects.http;
var httpsFollow = followRedirects.https;






var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
var http_1 = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69
    if ('User-Agent' in headers || 'user-agent' in headers) {
      // User-Agent is specified; handle case where no UA header is desired
      if (!headers['User-Agent'] && !headers['user-agent']) {
        delete headers['User-Agent'];
        delete headers['user-agent'];
      }
      // Otherwise, use specified value
    } else {
      // Only set header if it hasn't been set in config
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url__default["default"].parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url__default["default"].parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https__default["default"] : http__default["default"];
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib__default["default"].createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        var totalResponseBytes = 0;
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      var timeout = parseInt(config.timeout, 10);

      if (isNaN(timeout)) {
        reject(createError(
          'error trying to parse `config.timeout` to int',
          config,
          'ERR_PARSE_TIMEOUT',
          req
        ));

        return;
      }

      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError(
          'timeout of ' + timeout + 'ms exceeded',
          config,
          config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
          req
        ));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = http_1;
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  var context = this || defaults_1;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

var validator = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators$1
};

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios$1 = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios$1.Axios = Axios_1;

// Factory for creating new instances
axios$1.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios$1.Cancel = Cancel_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel;

// Expose all/spread
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;

// Expose isAxiosError
axios$1.isAxiosError = isAxiosError;

var axios_1 = axios$1;

// Allow use of default import syntax in TypeScript
var _default = axios$1;
axios_1.default = _default;

var axios = axios_1;

var UnumIDClient = /** @class */ (function () {
    function UnumIDClient(saasUrl, apiKey) {
        this.axiosInstance = axios.create({
            baseURL: saasUrl,
            headers: { Authorization: "Bearer ".concat(apiKey) },
        });
    }
    UnumIDClient.prototype.makeSaasCall = function (path, method, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.axiosInstance({
                        url: path,
                        method: method,
                        data: data,
                    })];
            });
        });
    };
    UnumIDClient.prototype.sendPushNotification = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.makeSaasCall('/pushNotification', 'POST', options)];
                }
                catch (e) {
                    console.log('Error sending push notification', e);
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    UnumIDClient.prototype.sendEmail = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.makeSaasCall('/email', 'POST', options)];
                }
                catch (e) {
                    console.log('error sending email', e);
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    UnumIDClient.prototype.sendSms = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.makeSaasCall('/sms', 'POST', options)];
                }
                catch (e) {
                    console.log('error sending sms', e);
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    return UnumIDClient;
}());

var css_248z$1 = ".unumid-web-sdk-widget {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  line-height: 1.5;\n  min-height: 360px;\n}\n\n@media screen and (max-width: 530px) {\n  .unumid-web-sdk-widget {\n    width: unset;\n    min-height: 150px;\n  }\n}\n";
styleInject(css_248z$1);

var css_248z = ".error-message {\n  font-weight: 700;\n  color: #ff0000\n}\n";
styleInject(css_248z);

/**
 * A simple component for displaying error messages.
 * Applies error styling to its children.
 */
var ErrorMessage = function (_a) {
    var children = _a.children;
    return React__default["default"].createElement("div", { className: "error-message" }, children);
};

/**
 * Component responsible for showing the result of sending a deep link via a fallback method.
 */
var FallbackResult = function (_a) {
    var userInfo = _a.userInfo, fallbackType = _a.fallbackType, error = _a.error;
    // Text for each fallback type.
    var pushText = React__default["default"].createElement(React__default["default"].Fragment, null, "We sent a push notification to your device.");
    var smsText = React__default["default"].createElement(React__default["default"].Fragment, null,
        "We texted a link to ", userInfo === null || userInfo === void 0 ? void 0 :
        userInfo.phone,
        ".");
    var emailText = React__default["default"].createElement(React__default["default"].Fragment, null,
        "We emailed a link to ", userInfo === null || userInfo === void 0 ? void 0 :
        userInfo.email,
        ".");
    // Renders text according to the fallback type.
    var renderFirstLine = function () {
        switch (fallbackType) {
            case 'EMAIL':
                return emailText;
            case 'SMS':
                return smsText;
            case 'PUSH':
                return pushText;
            default:
                console.log('invalid fallback type');
                return null;
        }
    };
    return (React__default["default"].createElement("div", { className: "fallback-result" }, error
        ? (React__default["default"].createElement(ErrorMessage, null, error))
        : (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement("div", null, renderFirstLine()),
            React__default["default"].createElement("div", { style: { fontWeight: 'bold' } }, "Please click it to continue.")))));
};

/**
 * Our top-level component exported from this SDK.
 * It manages much of the SDK's state and determines which other components should be rendered.
 */
var UnumIDWidget = function (_a) {
    var _b;
    var apiKey = _a.apiKey, env = _a.env, createPresentationRequest = _a.createPresentationRequest, sendEmail = _a.sendEmail, sendSms = _a.sendSms, sendPushNotification = _a.sendPushNotification, goToLogin = _a.goToLogin, userInfo = _a.userInfo, presentationRequestProp = _a.presentationRequest, _c = _a.createInitialPresentationRequest, createInitialPresentationRequest = _c === void 0 ? !presentationRequestProp : _c;
    // determines whether to initially show a qr code or a button
    var canScan = React.useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent))[0];
    var _d = React.useState('DEEPLINK'), currentWidget = _d[0], setCurrentWidget = _d[1];
    // The PresentationRequest to display
    var _e = React.useState(presentationRequestProp), presentationRequest = _e[0], setPresentationRequest = _e[1];
    var _f = React.useState([]), fallbackOptions = _f[0], setFallbackOptions = _f[1];
    var _g = React.useState(), fallbackResultType = _g[0], setFallbackResultType = _g[1];
    var _h = React.useState(), fallbackError = _h[0], setFallbackError = _h[1];
    var unumIdClient = React.useState((apiKey && env) ? new UnumIDClient(saasUrls[env], apiKey) : undefined)[0];
    // destructure userInfo properties so we can pass them to a useEffect dependency array
    // without worrying about object equality
    var pushToken = userInfo === null || userInfo === void 0 ? void 0 : userInfo.pushToken;
    var email = userInfo === null || userInfo === void 0 ? void 0 : userInfo.email;
    var phone = userInfo === null || userInfo === void 0 ? void 0 : userInfo.phone;
    var isLoggedIn = !!userInfo;
    // Set up our queue of available fallback options
    // based on the information we have about the user.
    React.useEffect(function () {
        var queue = [];
        if (pushToken && (sendPushNotification || unumIdClient)) {
            // it's a single token
            if (!Array.isArray(pushToken)) {
                queue.push('PUSH');
            }
            // it's an array containing at least one token
            if (Array.isArray(pushToken) && pushToken.length > 0) {
                queue.push('PUSH');
            }
        }
        if (phone && (sendSms || unumIdClient)) {
            queue.push('SMS');
        }
        if (email && (sendEmail || unumIdClient)) {
            queue.push('EMAIL');
        }
        if (!isLoggedIn && goToLogin) {
            queue.push('LOGIN');
        }
        setFallbackOptions(queue);
    }, [
        pushToken,
        phone,
        email,
        isLoggedIn,
        goToLogin,
        unumIdClient,
        sendPushNotification,
        sendEmail,
        sendSms,
    ]);
    var nextFallback = function () {
        if (fallbackOptions.length === 0) {
            return;
        }
        setCurrentWidget('FALLBACK_RESULT');
        setFallbackResultType(fallbackOptions[0]);
        var updatedFallbackQueue = fallbackOptions.slice(1);
        setFallbackOptions(updatedFallbackQueue);
    };
    /**
     * Calls the provided createPresentationRequest function.
     * If a value is returned, it will be set as the current presentationRequest to display.
     * If not, an updated presentationRequest prop must be provided when the function completes.
     */
    var triggerPresentationRequestCreation = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // If no createPresentationRequest function was provided, this function effectively does nothing
                    if (!createPresentationRequest)
                        return [2 /*return*/];
                    return [4 /*yield*/, createPresentationRequest()];
                case 1:
                    response = _a.sent();
                    if (response) {
                        setPresentationRequest(response);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // A memoized version of triggerPresentationRequestCreation
    // that will not be redefined when this component re-renders
    // and can be reliably passed to other hooks.
    var memoizedTriggerPresentationRequestCreation = React.useCallback(triggerPresentationRequestCreation, [createPresentationRequest]);
    // Determine the delay after which a new presentationRequest should be created,
    // to ensure that an expired request is never displayed to the user.
    var expiresAt = (_b = presentationRequest === null || presentationRequest === void 0 ? void 0 : presentationRequest.presentationRequest) === null || _b === void 0 ? void 0 : _b.expiresAt;
    var timeUntilExpiration = presentationRequest
        && new Date(expiresAt).getTime() - new Date().getTime();
    var oneMinuteBeforeExpiration = timeUntilExpiration && (timeUntilExpiration - 60 * 1000);
    var nineMinutesFromNow = 9 * 60 * 1000;
    var delay = oneMinuteBeforeExpiration || nineMinutesFromNow;
    var _j = useTimeout(memoizedTriggerPresentationRequestCreation), startTimeout = _j[0], stopTimeout = _j[1];
    React.useEffect(function () {
        if (presentationRequestProp) {
            // When this component is rendered with a new presentationRequest prop,
            // update the presentationRequest state.
            setPresentationRequest(presentationRequestProp);
        }
        else if (createInitialPresentationRequest) {
            // When this component is rendered without a presentationRequest prop,
            // trigger presentationRequest creation if the createInitialPresentationRequest prop is true.
            memoizedTriggerPresentationRequestCreation();
        }
    }, [
        presentationRequestProp,
        memoizedTriggerPresentationRequestCreation,
        createInitialPresentationRequest,
    ]);
    React.useEffect(function () {
        // Stop any previously set timeout.
        stopTimeout();
        // Schedule a new presentationRequest to be created after a delay.
        // (To ensure that the current one is replaced before it expires.)
        startTimeout(delay);
        // Stop the excurrent timeout when this component is unmounted.
        return stopTimeout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [presentationRequest]);
    // This component can't display a presentationRequest if it doesn't have one.
    // Show a spinner instead.
    if (!presentationRequest) {
        return (React__default["default"].createElement("div", { className: "unumid-web-sdk-widget" },
            React__default["default"].createElement(Spinner, null)));
    }
    return (React__default["default"].createElement("div", { className: "unumid-web-sdk-widget" },
        (currentWidget === 'DEEPLINK') && (React__default["default"].createElement(DeeplinkWidget, { holderApp: presentationRequest === null || presentationRequest === void 0 ? void 0 : presentationRequest.holderApp, deeplink: presentationRequest === null || presentationRequest === void 0 ? void 0 : presentationRequest.deeplink, qrCode: presentationRequest === null || presentationRequest === void 0 ? void 0 : presentationRequest.qrCode, canScan: canScan })),
        currentWidget === 'FALLBACK_RESULT' && fallbackResultType && (React__default["default"].createElement(FallbackResult, { userInfo: userInfo, fallbackType: fallbackResultType, error: fallbackError })),
        React__default["default"].createElement(FallbackButton, { client: unumIdClient, fallbackType: fallbackOptions[0], nextFallback: nextFallback, setFallbackError: setFallbackError, userInfo: userInfo, presentationRequest: presentationRequest, sendEmail: sendEmail, sendSms: sendSms, sendPushNotification: sendPushNotification, goToLogin: goToLogin }),
        currentWidget !== 'DEEPLINK' && (React__default["default"].createElement(LinkButton, { onClick: function () { return setCurrentWidget('DEEPLINK'); } },
            "Back to ",
            canScan ? 'QR Code' : 'Verification button',
            "."))));
};

module.exports = UnumIDWidget;
//# sourceMappingURL=index.js.map
