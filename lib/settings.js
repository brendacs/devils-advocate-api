'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListSettings = exports.formSettings = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

const FORM_API_KEY = process.env.FORM_API_KEY;
const FORM_ACCESS_TOKEN = process.env.FORM_ACCESS_TOKEN;

const MAIL_API_KEY = process.env.MAIL_API_KEY;
const DC = process.env.DC;

// typeform get response settings
const formSettings = exports.formSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://api.typeform.com/forms/xqCi7y/responses?key=${FORM_API_KEY}`,
  'method': 'GET',
  'headers': {
    'Authorization': `bearer ${FORM_ACCESS_TOKEN}`
  }

  // mailchimp get list settings
};const getListSettings = exports.getListSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://${DC}.api.mailchimp.com/3.0/lists?count=100`,
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `apikey ${MAIL_API_KEY}`
  }
};