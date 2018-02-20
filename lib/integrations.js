'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postGroupedListMember = exports.postListMemberWithGroups = exports.getGroupData = exports.postListMember = exports.getListData = exports.getScore = exports.getSheetsData = exports.getFormData = exports.callType = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getFormResponses = require('./typeform/getFormResponses.js');

var _calcScore = require('./typeform/calcScore.js');

var _getLists = require('./mailchimp/getLists.js');

var _addListMembers = require('./mailchimp/addListMembers.js');

var _getGroups = require('./mailchimp/getGroups.js');

var _addGroupsToMembers = require('./mailchimp/addGroupsToMembers.js');

var _getSheetData = require('./gsheets/getSheetData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.listen(3000, () => {
  console.log('Server started');
});

let callType = exports.callType = null;

const getFormData = exports.getFormData = () => {
  exports.callType = callType = 'data';
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

const postListMember = exports.postListMember = (getScore, requestAddListMember) => {
  getScore();
  setTimeout(function () {
    requestAddListMember();
  }, 5000);
};

const getGroupData = exports.getGroupData = () => {
  (0, _getGroups.requestGetGroupResponse)();
};

// @deprecated due to TypeForm v2.0
const postListMemberWithGroups = exports.postListMemberWithGroups = (getScore, requestAddListMemberWithGroups) => {
  console.log('This function is deprecated since TypeForm v2.0');
  getScore();
  setTimeout(function () {
    requestAddListMemberWithGroups();
  }, 5000);
};

const postGroupedListMember = exports.postGroupedListMember = (getScoreUsingSheets, requestAddListMemberWithGroups) => {
  console.log('called poster');
};

// function to run
const defaultToRun = () => {
  getScore();
};

// runs function every 24 hours
setInterval(function () {
  defaultToRun();
}, 1000 * 60 * 60 * 24);

// run on server start
defaultToRun();