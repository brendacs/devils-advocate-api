'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestGetSheetsData = exports.rowNum = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let rowNum = exports.rowNum = 2;

const getSheetsData = (err, data, body) => {
  let response = JSON.parse(body);
  let values = response.values;
  console.log(values);
  while (values != undefined) {
    exports.rowNum = rowNum += 1;
    requestGetSheetsData();
  }
};

const requestGetSheetsData = exports.requestGetSheetsData = () => {
  (0, _request2.default)(_settings.getSheetsSettings, getSheetsData);
};