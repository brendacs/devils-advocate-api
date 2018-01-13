import request from 'request';
import { getListSettings } from '../settings.js';

const getListResponses = (error, data, body) => {
  let response = JSON.parse(body);
  console.log(response);
}

export const requestGetListResponse = () => {
  request(getListSettings, getListResponses);
}
