'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSheetData = (err, data, body) => {
  console.log(body);
};

const requestGetSheetData = () => {
  console.log('called');
  (0, _request2.default)(_settings2.default, getSheetData);
};

exports.default = getSheetData;