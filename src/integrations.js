import express from 'express';
import { requestFormResponse } from './typeform/getFormResponses.js';
import { requestGetListResponse } from './mailchimp/getLists.js';
import { requestAddListMember } from './mailchimp/addListMembers.js';
import { requestGetGroupResponse } from './mailchimp/getGroups.js';
import { requestAddListMemberWithGroups } from './mailchimp/addGroupsToMembers.js';
import { requestGetSheetsData } from './gsheets/getSheetData.js';

const app = express();

app.listen(3000, () => {
  console.log('Server started');
});

export const callType = null;

export const getFormData = () => {
  callType = 'data';
  requestFormResponse();
}

// @deprecated due to TypeForm v2.0
export const getScore = () => {
  console.log('This function is deprecated since TypeForm v2.0');
  callType = 'score';
  requestFormResponse();
}

export const getListData = () => {
  requestGetListResponse();
}

export const postListMember = (getScore, requestAddListMember) => {
  getScore();
  setTimeout(function() {
    requestAddListMember();
  }, 5000);
}

export const getGroupData = () => {
  requestGetGroupResponse();
}

// @deprecated due to TypeForm v2.0
export const postListMemberWithGroups = (getScore, requestAddListMemberWithGroups) => {
  console.log('This function is deprecated since TypeForm v2.0');
  getScore();
  setTimeout(function() {
    requestAddListMemberWithGroups();
  }, 5000);
}

export const getSheetsData = () => {
  requestGetSheetsData();
}

export const postGroupedListMember = (getScoreUsingSheets, requestAddListMemberWithGroups) => {
  console.log('called poster');
}

// function to run
const defaultToRun = () => {
  requestGetSheetsData();
}

// runs function every 24 hours
setInterval(function(){ defaultToRun(); }, 1000*60*60*24);

// run on server start
defaultToRun();
