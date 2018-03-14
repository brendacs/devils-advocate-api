import express from 'express';
import { requestFormResponse } from './typeform/getFormResponses.js';
import { calcScore } from './calcScore.js';
import { requestGetListResponse } from './mailchimp/getLists.js';
import { requestGetGroupResponse } from './mailchimp/getGroups.js';
import { requestAddListMemberWithGroups } from './mailchimp/addListMembersWithGroups.js';
import { requestGetSheetsData } from './gsheets/getSheetData.js';

const app = express();

app.listen(3000, () => {
  console.log('Server started');
});

export let callType = null;

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

export const postListMemberWithGroups = () => {
  getScore();
  setTimeout(function() {
    requestAddListMemberWithGroups();
  }, 5000);
}

// function to run
const defaultToRun = () => {
  getGroupData();
  postListMemberWithGroups();
}

// runs function every 1 hour
setInterval(function(){ defaultToRun(); }, 1000*60*60*1);

// run on server start
defaultToRun();
