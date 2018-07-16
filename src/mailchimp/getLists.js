import request from 'request';
import { DEBUG } from '../utils/constants';
import { getListSettings } from '../utils/settings';

/**
 * Get list IDs and information
 */
const getLists = (error, data, body) => {
  let response = JSON.parse(body);
  if (DEBUG) console.log(response);
}

export const requestLists = () => {
  request(getListSettings, getLists);
}
