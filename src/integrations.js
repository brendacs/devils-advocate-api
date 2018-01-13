import express from 'express';
import { requestFormResponse } from './typeform/getFormResponses.js';
import { requestGetListResponse } from './mailchimp/getLists.js';
import { requestAddListMember } from './mailchimp/addListMembers.js';

const app = express();

app.listen(3000, () => {
  console.log('Server started');
});

const getScore = () => {
  requestFormResponse();
}

const getListData = () => {
  requestGetListResponse();
}

const postListMember = () => {
  requestAddListMember();
}

getListData();
