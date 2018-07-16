import express from 'express';

// required
import { calcScore } from './utils/calcScore';
import { requestGetSheetsData } from './gsheets/getSheetData';
import { requestMembers } from './mailchimp/getMembers';
import { requestMemberCount } from './mailchimp/getMemberCount';
import { requestBatchAddListMembersWithGroups } from './mailchimp/batchAddListMembersWithGroups';

// unused, but for utility or future use
import { requestFormData } from './typeform/getFormResponses';
import { requestLists } from './mailchimp/getLists';
import { requestGroups } from './mailchimp/getGroups';
import { requestAddListMemberWithGroups } from './mailchimp/addListMembersWithGroups';

const app = express();

app.listen(3001, () => {
  console.log('Server started');
});

export let callType = null;

export const getSheetsData = () => {
  callType = 'data';
  requestGetSheetsData();
}

export const getScore = () => {
  callType = 'score';
  requestGetSheetsData();
}

export const postAllListMembersWithGroups = () => {
  getScore();
  setTimeout(function() {
    requestBatchAddListMembersWithGroups();
  }, 5000);
}

// function to run
const defaultToRun = () => {
  requestMembers();
  setTimeout(function() {
    postAllListMembersWithGroups();
  }, 5000);
}

// runs function every 15 minutes
setInterval(function(){ defaultToRun(); }, 1000*60*15);

// run on server start
defaultToRun();
