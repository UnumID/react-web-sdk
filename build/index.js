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

var css_248z = ".link-button {\n  font-family: inherit;\n  font-weight: 300;\n  color: #007bff;\n  text-decoration: none;\n  text-align: center;\n  vertical-align: middle;\n  background-color: transparent;\n  font-size: 1rem;\n  line-height: 1.5;\n  padding: .375rem .75rem;\n  cursor: pointer;\n  border: none;\n}\n";
styleInject(css_248z);

var LinkButton = function (_a) {
    var onClick = _a.onClick, children = _a.children;
    return (React__default['default'].createElement("button", { type: "button", className: "link-button", onClick: onClick }, children));
};

var css_248z$1 = ".spinner {\n  border: 8px solid #f5f5f5;\n  border-top: 8px solid #dddddd;\n  border-radius: 50%;\n  width: 80px;\n  height: 80px;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n";
styleInject(css_248z$1);

var Spinner = function () { return (React__default['default'].createElement("div", { className: "spinner", "aria-label": "spinner" })); };

var img = "data:image/png;base64,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";

var css_248z$2 = ".branding {\n  width: 130px;\n  margin-top: -15px;\n}\n";
styleInject(css_248z$2);

var Branding = function () { return (React__default['default'].createElement("a", { className: "branding", target: "_blank", rel: "noopener noreferrer", href: "https://unumid.org" },
    React__default['default'].createElement("img", { alt: "Powered by Unum ID", src: img }))); };

var css_248z$3 = ".qr-code {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n}\n\n.qr-code .help-item {\n  text-align: left;\n  font-size: 12px;\n}\n\n.qrcode-img-wrapper {\n  height: 196px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.qr-code .bold {\n  font-weight: 700;\n}\n\n.qr-code .light {\n  font-weight: 300;\n}\n\n.qr-code .btn.focus, .btn:focus {\n  box-shadow: none;\n}\n\n.qr-code .image-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.qr-code .qr-code-img {\n  width: 220px;\n}\n\n@media screen and (max-width: 600px) {\n  .qrcode-content {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .description {\n    margin-left: 0;\n    margin-top: 24px;\n  }\n}\n";
styleInject(css_248z$3);

var QRCode = function (_a) {
    var qrCode = _a.qrCode, _b = _a.applicationTitle, applicationTitle = _b === void 0 ? 'ACME' : _b;
    var _c = React.useState(false), showNeedHelp = _c[0], setShowNeedHelp = _c[1];
    var handleLinkButtonClick = function () {
        setShowNeedHelp(!showNeedHelp);
    };
    var renderQrCode = function () { return (React__default['default'].createElement("div", { className: "image-wrapper" },
        React__default['default'].createElement("img", { className: "qr-code-img", alt: "qr code", src: qrCode }),
        React__default['default'].createElement(Branding, null))); };
    return (React__default['default'].createElement("div", { className: "qr-code" },
        React__default['default'].createElement("div", { className: "bold" }, "To continue, scan this QR code"),
        React__default['default'].createElement("div", { className: "light" },
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
        React__default['default'].createElement("div", { className: "qrcode-img-wrapper" }, qrCode ? renderQrCode() : React__default['default'].createElement(Spinner, null))));
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

var css_248z$4 = ".action-button {\n  display: inline-block;\n  text-align: center;\n  vertical-align: middle;\n  border: 1px solid transparent;\n  padding: .375rem .75rem;\n  line-height: 1.5;\n  border-radius: .25rem;\n  font-size: 1rem;\n  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;\n  color: #ffffff;\n  background-color: #1f61cc;\n  cursor: pointer;\n  margin-bottom: 20px;\n  width: 200px;\n  text-decoration: none;\n}\n";
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

var css_248z$5 = ".qrcode-widget-content {\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  display: flex;\n}\n\n.qrcode-widget-content .bold-label {\n  font-weight: 700;\n  background-color: #1f61cc\n}\n\n.qrcode-widget-content .error {\n  font-weight: 700;\n  color: #ff0000;\n}\n\n.qrcode-widget-content .deeplink-button-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n";
styleInject(css_248z$5);

var QRCodeWidget = function (_a) {
    var qrCode = _a.qrCode, setCurrentWidget = _a.setCurrentWidget, applicationTitle = _a.applicationTitle, canScan = _a.canScan, deeplink = _a.deeplink, goToLogin = _a.goToLogin, shouldShowEmailLink = _a.shouldShowEmailLink, shouldShowSmsLink = _a.shouldShowSmsLink, shouldShowLoginLink = _a.shouldShowLoginLink;
    var handleSMSLinkClick = function () {
        setCurrentWidget(widgetTypes.SMS);
    };
    var handleEmailLinkClick = function () {
        setCurrentWidget(widgetTypes.EMAIL);
    };
    var btnLbl = "Verify with " + applicationTitle;
    var renderQrCode = function () { return React__default['default'].createElement(QRCode, { qrCode: qrCode, applicationTitle: applicationTitle }); };
    var renderDeeplinkButton = function () { return (React__default['default'].createElement("div", { className: "deeplink-button-wrapper" },
        React__default['default'].createElement(ActionButton, { className: "bold-label", target: "_blank", href: deeplink }, btnLbl),
        React__default['default'].createElement(Branding, null))); };
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
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        (currentWidget === widgetTypes.QR_CODE) && (React__default['default'].createElement(QRCodeWidget, { qrCode: qrCode, setCurrentWidget: setCurrentWidget, applicationTitle: applicationTitle, canScan: canScan, deeplink: deeplink, goToLogin: goToLogin, shouldShowEmailLink: shouldShowEmailLink, shouldShowSmsLink: shouldShowSmsLink, shouldShowLoginLink: shouldShowLoginLink })),
        (currentWidget === widgetTypes.SMS) && sendSms && (React__default['default'].createElement(SMSWidget, { userInfo: userInfo, sendSms: sendSms, canScan: canScan, setCurrentWidget: setCurrentWidget, deeplink: deeplink })),
        (currentWidget === widgetTypes.EMAIL) && sendEmail && (React__default['default'].createElement(EmailWidget, { email: userInfo.email, sendEmail: sendEmail, canScan: canScan, goToLogin: goToLogin, deeplink: deeplink, setCurrentWidget: setCurrentWidget }))));
};

module.exports = WidgetHostAndController;
//# sourceMappingURL=index.js.map
