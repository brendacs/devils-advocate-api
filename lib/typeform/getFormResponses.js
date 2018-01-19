'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestFormResponse = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

var _calcScore = require('./calcScore.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFormResponses = (err, data, body) => {
  let response = JSON.parse(body);
  getLatest(response);
};

const getLatest = response => {
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

  console.log(`Total items: ${response.page_count} \n*Answered items: ${answeredItems.length} \n*Latest items: ${latestAnsweredItems.length}`);
  console.log(latestAnsweredItems[0].answers);

  //calcScore(latestAnsweredItems);
};

const requestFormResponse = exports.requestFormResponse = () => {
  (0, _request2.default)(_settings.formSettings, getFormResponses);
};