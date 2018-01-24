import request from 'request';
import { getSheetsSettings } from '../settings.js';

const getSheetsData = (err, data, body) => {
  console.log(body);
}

export const requestGetSheetsData = () => {
  console.log('called');
  request(getSheetsSettings, getSheetsData);
}
