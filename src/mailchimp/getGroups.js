import request from 'request';
import { DEBUG } from '../constants';
import { getGroupSettings } from '../settings';

/**
 * Get group IDs and information
 */
const getGroupResponses = (error, data, body) => {
  let response = JSON.parse(body);
  if (DEBUG) console.log(response);
}

export const requestGetGroupResponse = () => {
  request(getGroupSettings, getGroupResponses);
}
