import request from 'request';
import {
  DEBUG,
  MAIL_API_KEY,
  DC,
  MASTER_LIST_ID
} from '../utils/constants';
import { scoreMap } from '../utils/calcScore';

let econGroupId;
let doveGroupId;
let socGroupId;
let nationGroupId;
let partGroupId;
let actionGroupId;
let voteGroupId;

let subberGroupIds = {};
let membersWithProps = [];

/**
 * Post up to 500 members at once to list with groups
 */
export const requestBatchAddListMembersWithGroups = () => {
  let subberEmails = Object.keys(scoreMap);

  // for each subber email from score map
  for (let i = 0; i < subberEmails.length; i++) {
    let currSubber = subberEmails[i];

    mapEmailToGroupIds(currSubber);

    if (DEBUG) console.log(subberGroupIds);

    // get group ids for subber
    let groupIds = subberGroupIds[currSubber];
    let groups = {
      [econGroupId]: true,
      [doveGroupId]: true,
      [socGroupId]: true,
      [nationGroupId]: true,
      [partGroupId]: true,
      [actionGroupId]: true,
      [voteGroupId]: true
    }

    membersWithProps.push({
      'email_address': `${currSubber}`,
      'status': 'subscribed',
      'interests': groups
    });
  }

  if (DEBUG) console.log(membersWithProps);

  // post up  to 500 subbers at once as an array of objects
  let postAllMembersWithGroupsSettings = {
    'async': true,
    'crossDomain': true,
    'url': `https://${DC}.api.mailchimp.com/3.0/lists/${MASTER_LIST_ID}`,
    'json': {
      'update_existing': true,
      'members': membersWithProps
    },
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `apikey ${MAIL_API_KEY}`
    }
  }

  // make request to post
  request(postAllMembersWithGroupsSettings, batchAddListMembersWithGroups);
}

const mapEmailToGroupIds = (currSubber) => {
  let scores = scoreMap[currSubber];

  let econScore = scores[0];
  let doveScore = scores[1];
  let socScore = scores[2];
  let nationScore = scores[3];
  let action = scores[4];
  let part = scores[5];
  let vote = scores[6];

  // Econ Left : Econ Right
  econGroupId = econScore < 2 ? 'f5c4215995' : 'e2377f7d73';
  // Doves Group : Hawks Group
  doveGroupId = doveScore < 2 ? '32f34f9dfe' : '501a04b50f';
  // Classical Liberals : Identitarian Left
  socGroupId = socScore < 3 ? 'e1a126285a' : '471f6db897';
  // Internationalist : Nationalist
  nationGroupId = nationScore < 2 ? 'bbe81cd4be' : '7400ba857b';
  // Partisans : Not Partisans
  partGroupId = part ? 'fc09a37253' : 'cb78faf9a8';
  // Autonomy : Victimhood
  actionGroupId = action ? 'd12f8a0975' : '0f3383f76e';
  // Voting preferences
  if (vote === 'Libertarians') {
    voteGroupId = 'd5ec9d261f';
  } else if (vote === 'Democrats') {
    voteGroupId = 'ab1f508c6f';
  } else if (vote === 'Republicans') {
    voteGroupId = 'fe6b551847';
  } else if (vote === 'Neither, Other, or Not Applicable') {
    voteGroupId = '3f59af2f25';
  }

  // map current subber to all group ids associated with scores
  subberGroupIds[currSubber] = [econGroupId, doveGroupId, socGroupId, nationGroupId, partGroupId, actionGroupId, voteGroupId];
}

const batchAddListMembersWithGroups = (err, data, body) => {
  if (DEBUG) console.log(body.new_members, body.total_created, body.total_updated, body, err);

  // reset maps and arrays
  subberGroupIds = {};
  membersWithProps = [];
}
