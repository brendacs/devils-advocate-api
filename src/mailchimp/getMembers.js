import request from 'request';
import { DEBUG } from '../utils/constants';
import { getMembersSettings } from '../utils/settings';
import { memberCount, requestMemberCount } from './getMemberCount';

/**
 * Get list members and information
 */
export let memberEmails = {};

const getMemberEmails = (error, data, body) => {
  let response = JSON.parse(body);

  let i = 0;
  for (let member of response.members) {
    memberEmails[member.email_address] = i;
    i += 1;
  }

  if (DEBUG) console.log(memberEmails);
}

export const requestMembers = () => {
  requestMemberCount();

  setTimeout(() => {
    const membersSettings = getMembersSettings(0, memberCount);
    request(membersSettings, getMemberEmails);
  }, 1000);
}
