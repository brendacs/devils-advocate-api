'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestGetSheetsData = exports.results = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

var _integrations = require('../integrations.js');

var _calcScore = require('../calcScore.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let results = exports.results = null;

const getSheetsData = (err, data, body) => {
  let response = JSON.parse(body);
  let results = response.values;

  if (_integrations.callType == 'score') {
    (0, _calcScore.calcScore)(results);
  } else {
    console.log(results);
  }
};

const requestGetSheetsData = exports.requestGetSheetsData = () => {
  (0, _request2.default)(_settings.getSheetsSettings, getSheetsData);
};