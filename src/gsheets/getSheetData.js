import request from 'request';
import { getSheetsSettings } from '../settings.js';
import { callType } from '../integrations.js';
import { calcScore } from '../typeform/calcScore.js';

export let results = null;

const getSheetsData = (err, data, body) => {
  let response = JSON.parse(body);
  let results = response.values;

  if (callType == 'score') {
    calcScore(results);
  } else {
    console.log(results);
  }
}

export const requestGetSheetsData = () => {
  request(getSheetsSettings, getSheetsData);
}
