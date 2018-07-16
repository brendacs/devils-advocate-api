import request from 'request';
import { DEBUG } from '../utils/constants';
import { getGroupSettings } from '../utils/settings';

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
