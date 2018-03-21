'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestGetListResponse = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _settings = require('../settings.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get list IDs and information
 */
const getListResponses = (error, data, body) => {
  let response = JSON.parse(body);
  console.log(response);
};

const requestGetListResponse = exports.requestGetListResponse = () => {
  (0, _request2.default)(_settings.getListSettings, getListResponses);
};