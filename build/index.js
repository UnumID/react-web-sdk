'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

var css_248z = ".content-box {\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  line-height: 1.5;\n}\n\n@media screen and (max-width: 600px) {\n  .single-widget {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 2%;\n  }\n}\n\n@media screen and (max-width: 530px) {\n  .content-box {\n    width: unset;\n  }\n}\n";
styleInject(css_248z);

var WidgetContainer = function (_a) {
    var children = _a.children, className = _a.className;
    var newClass = 'content-box';
    newClass = className ? className + " " + newClass : newClass;
    return (React__default['default'].createElement("div", { className: newClass }, children));
};

var css_248z$1 = ".link-button {\n  font-family: inherit;\n  font-weight: 300;\n  color: #007bff;\n  text-decoration: none;\n  text-align: center;\n  vertical-align: middle;\n  background-color: transparent;\n  font-size: 1rem;\n  line-height: 1.5;\n  padding: .375rem .75rem;\n  cursor: pointer;\n  border: none;\n}\n";
styleInject(css_248z$1);

var LinkButton = function (_a) {
    var onClick = _a.onClick, children = _a.children;
    return (React__default['default'].createElement("button", { type: "button", className: "link-button", onClick: onClick }, children));
};

var css_248z$2 = ".spinner {\n  border: 8px solid #f5f5f5;\n  border-top: 8px solid #dddddd;\n  border-radius: 50%;\n  width: 80px;\n  height: 80px;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n";
styleInject(css_248z$2);

var Spinner = function () { return (React__default['default'].createElement("div", { className: "spinner", "aria-label": "spinner" })); };

var css_248z$3 = ".qr-code {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n}\n\n.qr-code .help-item {\n  text-align: left;\n  font-size: 12px;\n}\n\n.qrcode-img-wrapper {\n  height: 196px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.qr-code .bold {\n  font-weight: 700;\n}\n\n.qr-code .btn.focus, .btn:focus {\n  box-shadow: none;\n}\n\n@media screen and (max-width: 600px) {\n  .qrcode-content {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .description {\n    margin-left: 0;\n    margin-top: 24px;\n  }\n}\n";
styleInject(css_248z$3);

var QRCode = function (_a) {
    var qrCode = _a.qrCode, _b = _a.applicationTitle, applicationTitle = _b === void 0 ? 'ACME' : _b;
    var _c = React.useState(false), showNeedHelp = _c[0], setShowNeedHelp = _c[1];
    var handleLinkButtonClick = function () {
        setShowNeedHelp(!showNeedHelp);
    };
    return (React__default['default'].createElement("div", { className: "qr-code" },
        React__default['default'].createElement("div", { className: "bold" }, "To continue, scan this QR code"),
        React__default['default'].createElement("div", null,
            "with your phone camera or ",
            applicationTitle,
            " app:"),
        React__default['default'].createElement(LinkButton, { onClick: handleLinkButtonClick }, "Need help scanning?"),
        showNeedHelp && (React__default['default'].createElement("div", { className: "help" },
            React__default['default'].createElement("div", { className: "help-item" },
                "1. Install the ",
                applicationTitle,
                " app from the app store."),
            React__default['default'].createElement("div", { className: "help-item" },
                "2. Open the ",
                applicationTitle,
                " app and click \"Scan a QR code\"."),
            React__default['default'].createElement("div", { className: "help-item" }, "3. Hover over the QR code."))),
        React__default['default'].createElement("div", { className: "qrcode-img-wrapper" }, qrCode ? React__default['default'].createElement("img", { alt: "qr code", src: qrCode }) : React__default['default'].createElement(Spinner, null))));
};

var isArray = Array.isArray;

function cc(obj) {
  var out = "";

  if (typeof obj === "string" || typeof obj === "number") return obj || ""

  if (isArray(obj))
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

var css_248z$4 = ".action-button {\n  display: inline-block;\n  text-align: center;\n  vertical-align: middle;\n  border: 1px solid transparent;\n  padding: .375rem .75rem;\n  line-height: 1.5;\n  border-radius: .25rem;\n  font-size: 1rem;\n  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;\n  color: #ffffff;\n  background-color: #1f61cc;\n  cursor: pointer;\n  margin-bottom: 20px;\n}\n";
styleInject(css_248z$4);

var ActionButton = function (_a) {
    var target = _a.target, href = _a.href, className = _a.className, children = _a.children;
    return (React__default['default'].createElement("a", { className: cc(['action-button', className]), href: href, target: target }, children));
};

var widgetTypes = {
    QR_CODE: 'QR_CODE',
    EMAIL: 'EMAIL',
    SMS: 'SMS',
};

var css_248z$5 = ".qrcode-widget-content {\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  display: flex;\n}\n\n.qrcode-widget-content .bold-label {\n  font-weight: 700;\n  background-color: #1f61cc\n}\n\n.qrcode-widget-content .error {\n  font-weight: 700;\n  color: #ff0000;\n}\n";
styleInject(css_248z$5);

var QRCodeWidget = function (_a) {
    var qrCode = _a.qrCode, setCurrentWidget = _a.setCurrentWidget, applicationTitle = _a.applicationTitle, canScan = _a.canScan, deeplink = _a.deeplink, goToLogin = _a.goToLogin, shouldShowEmailLink = _a.shouldShowEmailLink, shouldShowSmsLink = _a.shouldShowSmsLink, shouldShowLoginLink = _a.shouldShowLoginLink;
    var handleSMSLinkClick = function () {
        setCurrentWidget(widgetTypes.SMS);
    };
    var handleEmailLinkClick = function () {
        setCurrentWidget(widgetTypes.EMAIL);
    };
    var btnLbl = "Continue with " + applicationTitle + " App";
    var renderQrCode = function () { return React__default['default'].createElement(QRCode, { qrCode: qrCode, applicationTitle: applicationTitle }); };
    var renderDeeplinkButton = function () { return (React__default['default'].createElement(ActionButton, { className: "bold-label", target: "_blank", href: deeplink }, btnLbl)); };
    var renderLoginButton = function () { return (goToLogin && (React__default['default'].createElement(LinkButton, { onClick: goToLogin }, "Log in with your email address for more authentication options"))); };
    var renderSmsButton = function () { return (React__default['default'].createElement(LinkButton, { onClick: handleSMSLinkClick }, "Get an SMS instead")); };
    var renderEmailButton = function () { return (React__default['default'].createElement(LinkButton, { onClick: handleEmailLinkClick }, "Get an email instead")); };
    return (React__default['default'].createElement("div", { className: "qrcode-widget-content" },
        canScan && renderQrCode(),
        !canScan && renderDeeplinkButton(),
        shouldShowLoginLink && renderLoginButton(),
        shouldShowSmsLink && renderSmsButton(),
        shouldShowEmailLink && renderEmailButton()));
};

var css_248z$6 = ".sms-content {\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  flex-direction: column;\n  display: flex;\n}\n\n.sms-content .bold {\n  font-weight: 700;\n}\n\n.sms-content .error {\n  font-weight: 700;\n  color: #ff0000;\n}\n";
styleInject(css_248z$6);

var SMSWidget = function (_a) {
    var userInfo = _a.userInfo, sendSms = _a.sendSms, canScan = _a.canScan, setCurrentWidget = _a.setCurrentWidget, deeplink = _a.deeplink;
    var _b = React.useState(false), smsResp = _b[0], setSMSResp = _b[1];
    var _c = React.useState(false), smsSent = _c[0], setSMSSent = _c[1];
    var backLinkLiteral = "Back to " + (canScan ? 'QR code' : 'Button');
    React.useEffect(function () {
        function sendSMSMsg() {
            return __awaiter(this, void 0, void 0, function () {
                var options, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = {
                                to: userInfo.phone,
                                msg: "Authentication Request: ACME website. Click here to complete: " + deeplink,
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, sendSms(options)];
                        case 2:
                            _a.sent();
                            setSMSResp(true);
                            setSMSSent(true);
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            setSMSSent(true);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        sendSMSMsg();
    }, [deeplink, userInfo, sendSms]);
    var handleEmailLinkClick = function () {
        setCurrentWidget(widgetTypes.EMAIL);
    };
    var backToQrCode = function () {
        setCurrentWidget(widgetTypes.QR_CODE);
    };
    return (React__default['default'].createElement("div", null, smsSent
        && (React__default['default'].createElement("div", { className: "sms-content" },
            smsResp
                && (React__default['default'].createElement("div", null,
                    React__default['default'].createElement("div", null,
                        "We texted a link to ",
                        userInfo.phone,
                        "."),
                    React__default['default'].createElement("div", { className: "bold" }, "Please click it to continue."))),
            !smsResp
                && React__default['default'].createElement("div", { className: "error" },
                    "Error sending SMS to ",
                    userInfo.phone,
                    "."),
            userInfo.email
                && React__default['default'].createElement(LinkButton, { onClick: handleEmailLinkClick }, "Get an email instead"),
            React__default['default'].createElement(LinkButton, { onClick: backToQrCode }, backLinkLiteral)))));
};

var css_248z$7 = ".email-content {\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  flex-direction: column;\n  display: flex;\n}\n\n.email-content .bold {\n  font-weight: 700;\n}\n\n.email-content .error {\n  font-weight: 700;\n  color: #ff0000;\n}\n";
styleInject(css_248z$7);

var EmailWidget = function (_a) {
    var email = _a.email, sendEmail = _a.sendEmail, canScan = _a.canScan, goToLogin = _a.goToLogin, deeplink = _a.deeplink, setCurrentWidget = _a.setCurrentWidget;
    var _b = React.useState(false), emailResp = _b[0], setEmailResp = _b[1];
    var _c = React.useState(false), emailSent = _c[0], setEmailSent = _c[1];
    var backLinkLiteral = "Back to " + (canScan ? 'QR code' : 'Button');
    React.useEffect(function () {
        function sendEmailData() {
            return __awaiter(this, void 0, void 0, function () {
                var options, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = {
                                to: email,
                                subject: 'Authentication Request: ACME website',
                                htmlBody: "<div>Click <a href=" + deeplink + ">here</a> to complete",
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, sendEmail(options)];
                        case 2:
                            _a.sent();
                            setEmailResp(true);
                            setEmailSent(true);
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            setEmailResp(false);
                            setEmailSent(true);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        sendEmailData();
    }, [email, deeplink, sendEmail]);
    var backToQrCode = function () {
        setCurrentWidget(widgetTypes.QR_CODE);
    };
    return (React__default['default'].createElement("div", null, emailSent
        && (React__default['default'].createElement("div", { className: "email-content" },
            emailResp
                && (React__default['default'].createElement("div", null,
                    React__default['default'].createElement("div", null,
                        "We emailed a link to ",
                        email,
                        "."),
                    React__default['default'].createElement("div", { className: "bold" }, "Please click it to continue."))),
            !emailResp
                && React__default['default'].createElement("div", { className: "error" },
                    "Error sending Email to ",
                    email,
                    "."),
            goToLogin && React__default['default'].createElement(LinkButton, { onClick: goToLogin }, "Use a different email"),
            React__default['default'].createElement(LinkButton, { onClick: backToQrCode }, backLinkLiteral)))));
};

var WidgetHostAndController = function (_a) {
    var applicationTitle = _a.applicationTitle, createPresentationRequest = _a.createPresentationRequest, sendEmail = _a.sendEmail, sendSms = _a.sendSms, goToLogin = _a.goToLogin, userInfo = _a.userInfo, presentationRequest = _a.presentationRequest;
    var _b = React.useState(''), deeplink = _b[0], setDeeplink = _b[1];
    var _c = React.useState(''), qrCode = _c[0], setQrCode = _c[1];
    var _d = React.useState(!!/Mobi|Android|iPhone/i.test(navigator.userAgent)), isSameDevice = _d[0], setIsSameDevice = _d[1];
    var _e = React.useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent)), canScan = _e[0], setCanScan = _e[1];
    var _f = React.useState(widgetTypes.QR_CODE), currentWidget = _f[0], setCurrentWidget = _f[1];
    var isLoggedIn = React.useState(!!userInfo)[0];
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!presentationRequest) return [3 /*break*/, 1];
                        setDeeplink(presentationRequest.deeplink);
                        setQrCode(presentationRequest.qrCode);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!createPresentationRequest) return [3 /*break*/, 3];
                        return [4 /*yield*/, createPresentationRequest()];
                    case 2:
                        response = _a.sent();
                        setDeeplink(response.deeplink);
                        setQrCode(response.qrCode);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    }, [presentationRequest, createPresentationRequest]);
    var shouldShowEmailLink = !!(isLoggedIn && userInfo.email && sendEmail);
    var shouldShowSmsLink = !!(isLoggedIn && userInfo.phone && sendSms);
    var shouldShowLoginLink = !!(!isLoggedIn && goToLogin);
    return (React__default['default'].createElement(WidgetContainer, null,
        (currentWidget === widgetTypes.QR_CODE) && (React__default['default'].createElement(QRCodeWidget, { qrCode: qrCode, setCurrentWidget: setCurrentWidget, applicationTitle: applicationTitle, canScan: canScan, deeplink: deeplink, goToLogin: goToLogin, shouldShowEmailLink: shouldShowEmailLink, shouldShowSmsLink: shouldShowSmsLink, shouldShowLoginLink: shouldShowLoginLink })),
        (currentWidget === widgetTypes.SMS) && sendSms && (React__default['default'].createElement(SMSWidget, { userInfo: userInfo, sendSms: sendSms, canScan: canScan, setCurrentWidget: setCurrentWidget, deeplink: deeplink })),
        (currentWidget === widgetTypes.EMAIL) && sendEmail && (React__default['default'].createElement(EmailWidget, { email: userInfo.email, sendEmail: sendEmail, canScan: canScan, goToLogin: goToLogin, deeplink: deeplink, setCurrentWidget: setCurrentWidget }))));
};

module.exports = WidgetHostAndController;
//# sourceMappingURL=index.js.map
