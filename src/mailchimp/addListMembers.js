import request from 'request';
import { postMemberSettings } from '../settings.js';
import { results } from '../typeform/calcScore.js';

export let econListId;
export let doveListId;
export let socListId;
export let nationListId;
export let partListId;
export let actionListId;
export let voteListId;

const addListMember = () => {
  let subberEmails = Object.keys(results);

  for (let i = 0; i < subberEmails.length; i++) {
    let currSubber = subberEmails[i];
    let scores = results[currSubber];
    let econScore = scores[0];
    let doveScore = scores[1];
    let socScore = scores[2];
    let nationScore = scores[3];
    let actionScore = scores[4];
    let partScore = scores[5];
    let voteScore = scores[6];

    // New Econ Left : New Econ Right
    econListId = econScore < 2 ? '1484d7fe9a' : '40654271eb';
    doveListId = doveScore < 2 ? '0000' : '0000';
    socListId = socScore < 2 ? '0000' : '0000';
    nationListId = nationScore < 2 ? '0000' : '0000';
    partListId = partScore < 2 ? '0000' : '0000';
    actionListId = actionScore < 2 ? '0000' : '0000';
    voteListId = voteScore < 2 ? '0000' : '0000';
  }
}

export const requestAddListMember = () => {
  request(postMemberSettings, addListMember);
}
