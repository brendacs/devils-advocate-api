import request from 'request';
import { formSettings } from '../settings.js';
import { calcScore } from './calcScore.js';
import { callType } from '../integrations.js';

const getFormResponses = (err, data, body) => {
  let response = JSON.parse(body);
  getLatest(response);
}

const getLatest = (response) => {
  console.log(response);
  let items = response.items;
  let answeredItems = [];
  let latestAnsweredItems = [];

  if (!items) {
    console.log('No items');
    return;
  }

  let today = new Date();
  let yesterDate = today.getDate() - 1;
  console.log('yesterday: ', yesterDate);

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    // get all answered items
    if (item.answers !== null) {
      answeredItems[i] = item;

      // get latest answered items
      let dateSubmittedRaw = item.submitted_at;
      let dateSubmitted = new Date(dateSubmittedRaw);
      let daySubmitted = dateSubmitted.getDate();

      if (daySubmitted >= yesterDate) {
        latestAnsweredItems[i] = item;
      }
    }
  }

  // @deprecated due to TypeForm v2.0
  if (callType === 'score')  {
    calcScore(latestAnsweredItems);
  } else {
    console.log(`Total items: ${response.page_count} \n*Answered items: ${answeredItems.length} \n*Latest items: ${latestAnsweredItems.length}`);
    console.log(latestAnsweredItems);
  }
}

export const requestFormResponse = () => {
  request(formSettings, getFormResponses);
}
