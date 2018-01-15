import express from 'express';
import { requestFormResponse } from './typeform/getFormResponses.js';
import { requestGetListResponse } from './mailchimp/getLists.js';
import { requestAddListMember } from './mailchimp/addListMembers.js';

const app = express();

app.listen(3000, () => {
  console.log('Server started');
});

export const getScore = () => {
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

// function to run
const defaultToRun = () => {
  postListMember(getScore, requestAddListMember);
}

// runs function every 24 hours
setInterval(function(){ defaultToRun(); }, 1000*30);

// run on server start
defaultToRun();
