'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAllListMembersWithGroups = exports.postListMemberWithGroups = exports.getGroupData = exports.getListData = exports.getScore = exports.getSheetsData = exports.getFormData = exports.callType = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getFormResponses = require('./typeform/getFormResponses.js');

var _calcScore = require('./calcScore.js');

var _getLists = require('./mailchimp/getLists.js');

var _getGroups = require('./mailchimp/getGroups.js');

var _addListMembersWithGroups = require('./mailchimp/addListMembersWithGroups.js');

var _batchAddListMembersWithGroups = require('./mailchimp/batchAddListMembersWithGroups.js');

var _getSheetData = require('./gsheets/getSheetData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.listen(3000, () => {
  console.log('Server started');
});

let callType = exports.callType = null;

const getFormData = exports.getFormData = () => {
  (0, _getFormResponses.requestFormResponse)();
};

const getSheetsData = exports.getSheetsData = () => {
  exports.callType = callType = 'data';
  (0, _getSheetData.requestGetSheetsData)();
};

const getScore = exports.getScore = () => {
  exports.callType = callType = 'score';
  (0, _getSheetData.requestGetSheetsData)();
};

const getListData = exports.getListData = () => {
  (0, _getLists.requestGetListResponse)();
};

const getGroupData = exports.getGroupData = () => {
  (0, _getGroups.requestGetGroupResponse)();
};

const postListMemberWithGroups = exports.postListMemberWithGroups = () => {
  getScore();
  setTimeout(function () {
    (0, _addListMembersWithGroups.requestAddListMemberWithGroups)();
  }, 5000);
};

const postAllListMembersWithGroups = exports.postAllListMembersWithGroups = () => {
  getScore();
  setTimeout(function () {
    (0, _batchAddListMembersWithGroups.requestBatchAddListMembersWithGroups)();
  }, 5000);
};

// function to run
const defaultToRun = () => {
  postAllListMembersWithGroups();
};

// runs function every 1 hour
setInterval(function () {
  defaultToRun();
}, 1000 * 60 * 60 * 1);

// run on server start
defaultToRun();