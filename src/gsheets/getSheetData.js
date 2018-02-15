import request from 'request';
import { getSheetsSettings } from '../settings.js';

export let rowNum = 2;

let values = 0;

const getSheetsData = (err, data, body) => {
  let response = JSON.parse(body);
  values = response.values;
}

export const requestGetSheetsData = () => {
  request(getSheetsSettings, getSheetsData);
}

export const loopSheetRows = () => {
  while (values !== undefined) {
    requestGetSheetsData();
    rowNum += 1;
  }
}
