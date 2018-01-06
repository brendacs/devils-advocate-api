import request from 'request';
import { mailSettings } from '../settings.js';

const getMailResponses = (error, data, body) => {
  let response = JSON.parse(body);
  console.log(response);
}

export const requestMailResponse = () => {
  request(mailSettings, getMailResponses);
}
