import request from 'request';
import { getGroupSettings } from '../settings.js';

const getGroupResponses = (error, data, body) => {
  let response = JSON.parse(body);
  console.log(response);
}

export const requestGetGroupResponse = () => {
  request(getGroupSettings, getGroupResponses);
}
