'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

var _calcScore = require('../typeform/calcScore.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

mapEmailToGroupIds = currSubber => {
  let scores = _calcScore.results[currSubber];

  let econScore = scores[0];
  let doveScore = scores[1];
  let socScore = scores[2];
  let nationScore = scores[3];
  let action = scores[4];
  let part = scores[5];
  let vote = scores[6];

  // Econ Left : Econ Right
  econGroupId = econScore < 2 ? 'f5c4215995' : 'e2377f7d73';
  // Doves Group : Hawks Group
  doveGroupId = doveScore < 2 ? '32f34f9dfe' : '501a04b50f';
  // Classical Liberals : Identitarian Left
  socGroupId = socScore < 2 ? 'e1a126285a' : '471f6db897';
  // Internationalist : Nationalist
  nationGroupId = nationScore < 2 ? 'bbe81cd4be' : '7400ba857b';
  // Partisans : Not Partisans
  partGroupId = part === 'partisan' ? 'fc09a37253' : 'cb78faf9a8';
  // Victimhood : Autonomy
  actionGroupId = action === 'victimhood' ? '0f3383f76e' : 'd12f8a09758';
  // Voting preferences
  if (vote === 'Libertarians') {
    voteGroupId = '1796d62eb0';
  } else if (vote === 'Democrats') {
    voteGroupId = 'f471052749';
  } else if (vote === 'Republicans') {
    voteGroupId = 'ba30c5b8c8';
  } else if (vote === 'None') {
    voteGroupId = '4badf9aef7';
  }
};