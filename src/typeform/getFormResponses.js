import request from 'request';
import { formSettings } from '../settings.js';
import { calcScore } from './calcScore.js';

const getFormResponses = (err, data, body) => {
  let response = JSON.parse(body);
  getLatest(response);
}

const getLatest = (response) => {
  console.log(response);
  let items = response.items;
  let answeredItems = [];
  let latestAnswered = [];
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    // get all answered items
    if (item.answers !== null) {
      answeredItems[i] = item;

      // get all items submitted in past 24 hours
      if (item.submitted_at) {
        latestAnswered[i] = item;
      }
    }
  }

  console.log(`Total items: ${response.page_count} \n*Answered items: ${answeredItems.length} \n Items within 24hrs: ${latestAnswered.length}`);
  console.log(answeredItems);

  calcScore(latestAnswered);
}

export const requestFormResponse = () => {
  request(formSettings, getFormResponses);
}
