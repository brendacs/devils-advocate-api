import request from 'request';
import getSheetSettings from '../settings.js';

const getSheetData = (err, data, body) => {
  console.log(body);
}

export const requestGetSheetData = () => {
  console.log('called');
  request(getSheetSettings, getSheetData);
}
