import request from 'request';
import { getSheetsSettings } from '../settings.js';

export let results = null;

const getSheetsData = (err, data, body) => {
  let response = JSON.parse(body);
  let results = response.values;
  console.log(results);
}

export const requestGetSheetsData = () => {
  request(getSheetsSettings, getSheetsData);
}
