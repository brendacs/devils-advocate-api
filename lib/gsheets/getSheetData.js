'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestGetSheetsData = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let results = null;

const getSheetsData = (err, data, body) => {
  let response = JSON.parse(body);
  let results = response.values;
  console.log(results);
};

const requestGetSheetsData = exports.requestGetSheetsData = () => {
  (0, _request2.default)(_settings.getSheetsSettings, getSheetsData);
};