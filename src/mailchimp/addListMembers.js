import dotenv from 'dotenv';
dotenv.load();

import request from 'request';
import { postMemberSettings } from '../settings.js';
import { results } from '../typeform/calcScore.js';

const MAIL_API_KEY = process.env.MAIL_API_KEY;
const DC = process.env.DC;

export let econListId;
export let doveListId;
export let socListId;
export let nationListId;
export let partListId;
export let actionListId;
export let voteListId;

let subberListIds = {};

const mapEmailToIds = (currSubber) => {
  let scores = results[currSubber];

  let econScore = scores[0];
  let doveScore = scores[1];
  let socScore = scores[2];
  let nationScore = scores[3];
  let action = scores[4];
  let part = scores[5];
  let vote = scores[6];

  // New Econ Left : New Econ Right
  econListId = econScore < 2 ? '1484d7fe9a' : '40654271eb';
  // New Doves List : New Hawks List
  doveListId = doveScore < 2 ? '5885f8b2f2' : '17b42670d1';
  // New Classical Liberals : New Identitarian Left
  socListId = socScore < 2 ? 'fe5cc88ff9' : '79820d1bd3';
  // New Internationalists : New Nationalists
  nationListId = nationScore < 2 ? '265fdb1e86' : '3e87d6a0e1';
  // New Partisans : New Not Partisans
  partListId = part === 'partisan' ? '57d8cc78fd' : '7724693fb0';
  // New Victimhood : New Autonomy
  actionListId = action === 'victimhood' ? '1c42e32b15' : 'a4caae71d8';
  // Voting preferences
  if (vote === 'Libertarians') {
    voteListId = '1796d62eb0';
  } else if (vote === 'Democrats') {
    voteListId = 'f471052749';
  } else if (vote === 'Republicans') {
    voteListId = 'ba30c5b8c8';
  } else if (vote === 'None') {
    voteListId = '4badf9aef7';
  }

  // map current subber to all list ids associated with scores
  subberListIds[currSubber] = [econListId, doveListId, socListId, nationListId, partListId, actionListId, voteListId];
}

const addListMember = (err, data, body) => {
  console.log(body.email_address, body.status);
}

export let curr;
export let email;

export const requestAddListMember = () => {
  let subberEmails = Object.keys(results);
  console.log(subberEmails);

  // for each subber email from results
  for (let i = 0; i < subberEmails.length; i++) {
    let currSubber = subberEmails[i];
    mapEmailToIds(currSubber);

    console.log(subberListIds);

    // for each list the subber must be added to
    let listIds = subberListIds[currSubber];
    for (let j = 0; j < listIds.length; j++) {
      let lists = ['econ', 'dove', 'soc', 'nation', 'part', 'action', 'vote'];
      curr = lists[j];
      email = currSubber;
      console.log(email);

      let LIST_ID;
      if (curr === 'econ') LIST_ID = econListId;
      if (curr === 'dove') LIST_ID = doveListId;
      if (curr === 'soc') LIST_ID = socListId;
      if (curr === 'nation') LIST_ID = nationListId;
      if (curr === 'part') LIST_ID = partListId;
      if (curr === 'action') LIST_ID = actionListId;
      if (curr === 'vote') LIST_ID = voteListId;

      const postMemberSettings = {
        'async': true,
        'crossDomain': true,
        'url': `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
        'json': {
          'email_address': `${email}`,
          'status': 'subscribed'
        },
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${MAIL_API_KEY}`
        }
      }

      // make request to post
      request(postMemberSettings, addListMember);
    }
  }
}