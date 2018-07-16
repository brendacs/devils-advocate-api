import express from 'express';
import { requestFormResponse } from './typeform/getFormResponses';
import { calcScore } from './utils/calcScore';
import { requestGetListResponse } from './mailchimp/getLists';
import { requestGetGroupResponse } from './mailchimp/getGroups';
import { requestAddListMemberWithGroups } from './mailchimp/addListMembersWithGroups';
import { requestBatchAddListMembersWithGroups } from './mailchimp/batchAddListMembersWithGroups';
import { requestGetSheetsData } from './gsheets/getSheetData';

const app = express();

app.listen(3000, () => {
  console.log('Server started');
});

export let callType = null;

// @deprecated since Typeform v2.0
export const getFormData = () => {
  requestFormResponse();
}

export const getSheetsData = () => {
  callType = 'data';
  requestGetSheetsData();
}

export const getScore = () => {
  callType = 'score';
  requestGetSheetsData();
}

export const getListData = () => {
  requestGetListResponse();
}

export const getGroupData = () => {
  requestGetGroupResponse();
}

// @deprecated, use batch operation instead
export const postListMemberWithGroups = () => {
  getScore();
  setTimeout(function() {
    requestAddListMemberWithGroups();
  }, 5000);
}

export const postAllListMembersWithGroups = () => {
  getScore();
  setTimeout(function() {
    requestBatchAddListMembersWithGroups();
  }, 5000);
}

// function to run
const defaultToRun = () => {
  postAllListMembersWithGroups();
}

// runs function every 15 minutes
setInterval(function(){ defaultToRun(); }, 1000*60*15);

// run on server start
defaultToRun();
