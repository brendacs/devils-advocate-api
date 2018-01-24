'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSheetsSettings = exports.getGroupSettings = exports.getListSettings = exports.formSettings = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _googleapis = require('googleapis');

var _googleapis2 = _interopRequireDefault(_googleapis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

// import gooogleAuth from 'google-auth-library';

const FORM_API_KEY = process.env.FORM_API_KEY;
const FORM_ACCESS_TOKEN = process.env.FORM_ACCESS_TOKEN;

const MAIL_API_KEY = process.env.MAIL_API_KEY;
const DC = process.env.DC;

const MASTER_LIST_ID = '0b760e1837';
const MAIN_CATEGORY_ID = 'e12580bfcb';
const VOTE_CATEGORY_ID = 'f76915c767';

const SHEETS_API_KEY = process.env.SHEETS_API_KEY;
const SHEET_ID = '1JQExqcx6W3ZrcRpn0vAROMY8eTHSWb3qDgl0wNIHCNg';
const rowNum = 2;
const range = `A${rowNum}:P${rowNum}`;

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

  // mailchimp get group settings
};const getGroupSettings = exports.getGroupSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://${DC}.api.mailchimp.com/3.0/lists/${MASTER_LIST_ID}/interest-categories/${VOTE_CATEGORY_ID}/interests?count=20`,
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `apikey ${MAIL_API_KEY}`
  }

  // const googleAuth = new googleAuth();

  // google sheets get settings
};const getSheetsSettings = exports.getSheetsSettings = {
  'async': true,
  'crossDomain': true,
  url: `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}`,
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `apikey ${SHEETS_API_KEY}`
  }
};