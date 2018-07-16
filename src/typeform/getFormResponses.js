import request from 'request';
import { DEBUG } from '../utils/constants';
import { formSettings } from '../utils/settings';
import { calcScore } from '../utils/calcScore';
import { callType } from '../integrations';


// @deprecated due to TypeForm v2.0
const getFormData = (err, data, body) => {
  let response = JSON.parse(body);
  getLatest(response);
}

const getLatest = (response) => {
  if (DEBUG) console.log(response);
  let items = response.items;
  let answeredItems = [];
  let latestAnsweredItems = [];

  if (!items) {
    if (DEBUG) console.log('No items');
    return;
  }

  let today = new Date();
  let yesterDate = today.getDate() - 1;
  if (DEBUG) console.log('yesterday: ', yesterDate);

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

  if (DEBUG) console.log(`Total items: ${response.page_count} \n*Answered items: ${answeredItems.length} \n*Latest items: ${latestAnsweredItems.length}`);
  if (DEBUG) console.log(latestAnsweredItems);
}

export const requestFormData = () => {
  request(formSettings, getFormData);
}
