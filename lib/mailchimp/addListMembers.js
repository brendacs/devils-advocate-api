'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAddListMember = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

var _calcScore = require('../typeform/calcScore.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

const MAIL_API_KEY = process.env.MAIL_API_KEY;
const DC = process.env.DC;

let econListId;
let doveListId;
let socListId;
let nationListId;
let partListId;
let actionListId;
let voteListId;

let subberListIds = {};

// @deprecated due to add with group functionality
const requestAddListMember = exports.requestAddListMember = () => {
  let subberEmails = Object.keys(_calcScore.results);

  console.log(subberEmails);

  // for each subber email from results
  for (let i = 0; i < subberEmails.length; i++) {
    let currSubber = subberEmails[i];

    mapEmailToListIds(currSubber);

    console.log(subberListIds);

    // for each list the subber must be added to
    let listIds = subberListIds[currSubber];
    for (let j = 0; j < listIds.length; j++) {
      const lists = ['econ', 'dove', 'soc', 'nation', 'part', 'action', 'vote'];
      let curr = lists[j];
      let email = currSubber;

      console.log(email);

      let LIST_ID;

      if (curr === 'econ') LIST_ID = econListId;
      if (curr === 'dove') LIST_ID = doveListId;
      if (curr === 'soc') LIST_ID = socListId;
      if (curr === 'nation') LIST_ID = nationListId;
      if (curr === 'part') LIST_ID = partListId;
      if (curr === 'action') LIST_ID = actionListId;
      if (curr === 'vote') LIST_ID = voteListId;

      let postMemberSettings = {
        'async': true,
        'crossDomain': true,
        'url': `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
        'json': {
          'email_address': `${email}`,
          'status': 'subscribed'
        },
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${MAIL_API_KEY}`
        }

        // make request to post
      };(0, _request2.default)(postMemberSettings, addListMember);
    }
  }
};

const mapEmailToListIds = currSubber => {
  let scores = _calcScore.results[currSubber];

  let econScore = scores[0];
  let doveScore = scores[1];
  let socScore = scores[2];
  let nationScore = scores[3];
  let action = scores[4];
  let part = scores[5];
  let vote = scores[6];

  // New Econ Left : New Econ Right
  econListId = econScore < 2 ? '1484d7fe9a' : '40654271eb';
  // New Doves List : New Hawks List
  doveListId = doveScore < 2 ? '5885f8b2f2' : '17b42670d1';
  // New Classical Liberals : New Identitarian Left
  socListId = socScore < 2 ? 'fe5cc88ff9' : '79820d1bd3';
  // New Internationalists : New Nationalists
  nationListId = nationScore < 2 ? '265fdb1e86' : '3e87d6a0e1';
  // New Partisans : New Not Partisans
  partListId = part === 'partisan' ? '57d8cc78fd' : '7724693fb0';
  // New Victimhood : New Autonomy
  actionListId = action === 'victimhood' ? '1c42e32b15' : 'a4caae71d8';
  // Voting preferences
  if (vote === 'Libertarians') {
    voteListId = '1796d62eb0';
  } else if (vote === 'Democrats') {
    voteListId = 'f471052749';
  } else if (vote === 'Republicans') {
    voteListId = 'ba30c5b8c8';
  } else if (vote === 'None') {
    voteListId = '4badf9aef7';
  }

  // map current subber to all list ids associated with scores
  subberListIds[currSubber] = [econListId, doveListId, socListId, nationListId, partListId, actionListId, voteListId];
};

const addListMember = (err, data, body) => {
  console.log(body.email_address, body.status);
};