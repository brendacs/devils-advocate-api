import google from 'googleapis';
// import gooogleAuth from 'google-auth-library';
import {
  DEBUG,
  FORM_API_KEY,
  FORM_ACCESS_TOKEN,
  MAIL_API_KEY,
  DC,
  MASTER_LIST_ID,
  MAIN_CATEGORY_ID,
  VOTE_CATEGORY_ID,
  SHEETS_API_KEY,
  SHEET_ID,
  RANGE
} from './constants';

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

// mailchimp get list by list id
export const getListByIdSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://${DC}.api.mailchimp.com/3.0/lists/${MASTER_LIST_ID}`,
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
  'url': `https://${DC}.api.mailchimp.com/3.0/lists/${MASTER_LIST_ID}/interest-categories/${VOTE_CATEGORY_ID}/interests?count=20`,
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `apikey ${MAIL_API_KEY}`
  }
};

// mailchimp get members settings
export const getMembersSettings = (offset, count) => {
  return ({
    'async': true,
    'crossDomain': true,
    'url': `https://${DC}.api.mailchimp.com/3.0/lists/${MASTER_LIST_ID}/members?fields=members.email_address&offset=${offset}&count=${count}`,
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `apikey ${MAIL_API_KEY}`
    }
  });
};

// google get sheets settings
export const getSheetsSettings = {
  'async': true,
  'crossDomain': true,
  'url': `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${SHEETS_API_KEY}`,
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `apikey ${SHEETS_API_KEY}`
  }
};
