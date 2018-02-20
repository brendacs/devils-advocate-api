import dotenv from 'dotenv';
dotenv.load();

import google from 'googleapis';
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
const range = 'A:P';

// typeform get response settings
export const formSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://api.typeform.com/forms/xqCi7y/responses?key=${FORM_API_KEY}`,
  'method': 'GET',
  'headers': {
    'Authorization': `bearer ${FORM_ACCESS_TOKEN}`
  }
};

// mailchimp get list settings
export const getListSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://${DC}.api.mailchimp.com/3.0/lists?count=100`,
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `apikey ${MAIL_API_KEY}`
  }
};

// mailchimp get group settings
export const getGroupSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://${DC}.api.mailchimp.com/3.0/lists/${MASTER_LIST_ID}/interest-categories/${MAIN_CATEGORY_ID}/interests?count=20`,
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `apikey ${MAIL_API_KEY}`
  }
};

// google get sheets settings
export const getSheetsSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${SHEETS_API_KEY}`,
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `apikey ${SHEETS_API_KEY}`
  }
};
