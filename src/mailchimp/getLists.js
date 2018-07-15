import request from 'request';
import { DEBUG } from '../constants';
import { getListSettings } from '../settings';

/**
 * Get list IDs and information
 */
const getListResponses = (error, data, body) => {
  let response = JSON.parse(body);
  if (DEBUG) console.log(response);
}

export const requestGetListResponse = () => {
  request(getListSettings, getListResponses);
}
