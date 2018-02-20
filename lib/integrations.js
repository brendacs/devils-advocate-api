'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postGroupedListMember = exports.postListMemberWithGroups = exports.getGroupData = exports.getListData = exports.getScore = exports.getSheetsData = exports.getFormData = exports.callType = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getFormResponses = require('./typeform/getFormResponses.js');

var _calcScore = require('./calcScore.js');

var _getLists = require('./mailchimp/getLists.js');

var _addListMembers = require('./mailchimp/addListMembers.js');

var _getGroups = require('./mailchimp/getGroups.js');

var _addListMembersWithGroups = require('./mailchimp/addListMembersWithGroups.js');

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

const getGroupData = exports.getGroupData = () => {
  (0, _getGroups.requestGetGroupResponse)();
};

const postListMemberWithGroups = exports.postListMemberWithGroups = () => {
  getScore();
  setTimeout(function () {
    (0, _addListMembersWithGroups.requestAddListMemberWithGroups)();
  }, 5000);
};

const postGroupedListMember = exports.postGroupedListMember = (getScore, requestAddListMemberWithGroups) => {
  console.log('called poster');
};

// function to run
const defaultToRun = () => {
  postListMemberWithGroups();
};

// runs function every 24 hours
setInterval(function () {
  defaultToRun();
}, 1000 * 60 * 60 * 24);

// run on server start
defaultToRun();