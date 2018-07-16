import request from 'request';
import { DEBUG } from '../utils/constants';
import { getListByIdSettings } from '../utils/settings';

/**
 * Get list members count
 */
export let memberCount;

const getMemberCount = (error, data, body) => {
  let response = JSON.parse(body);
  if (DEBUG) console.log("Member count:", response.stats.member_count);
  memberCount = response.stats.member_count;
}

export const requestMemberCount = () => {
  request(getListByIdSettings, getMemberCount);
}
