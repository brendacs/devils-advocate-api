import request from 'request';
import { DEBUG } from '../utils/constants';
import { getSheetsSettings } from '../utils/settings';
import { callType } from '../integrations';
import { calcScore } from '../utils/calcScore';

export let results = null;

const getSheetsData = (err, data, body) => {
  let response = JSON.parse(body);
  let results = response.values;

  if (callType == 'score') {
    calcScore(results);
  } else {
    if (DEBUG) console.log(results);
  }
}

export const requestGetSheetsData = () => {
  request(getSheetsSettings, getSheetsData);
}
