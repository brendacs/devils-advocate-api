import express from 'express';
import { requestFormResponse } from './typeform/getFormResponses.js';
import { requestMailResponse } from './mailchimp/getMailResponses.js';

const app = express();

app.listen(3000, () => {
  console.log('Server started');
});

const getScore = () => {
  requestFormResponse();
}

const getMailData = () => {
  requestMailResponse();
}

getMailData();
