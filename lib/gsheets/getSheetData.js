'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestGetSheetsData = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSheetsData = (err, data, body) => {
  console.log(body);
};

const requestGetSheetsData = exports.requestGetSheetsData = () => {
  console.log('called');
  (0, _request2.default)(_settings.getSheetsSettings, getSheetsData);
};