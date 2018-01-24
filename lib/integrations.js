'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSheetData = exports.postListMemberWithGroups = exports.getGroupData = exports.postListMember = exports.getListData = exports.getScore = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getFormResponses = require('./typeform/getFormResponses.js');

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

const getScore = exports.getScore = () => {
  (0, _getFormResponses.requestFormResponse)();
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

const postListMemberWithGroups = exports.postListMemberWithGroups = (getScore, requestAddListMemberWithGroups) => {
  getScore();
  setTimeout(function () {
    requestAddListMemberWithGroups();
  }, 5000);
};

const getSheetData = exports.getSheetData = () => {
  (0, _getSheetData.requestGetSheetData)();
};

// function to run
const defaultToRun = () => {
  // getScore();
  //postListMemberWithGroups(getScore, requestAddListMemberWithGroups);
  getSheetData();
};

// runs function every 24 hours
setInterval(function () {
  defaultToRun();
}, 1000 * 60 * 60 * 24);

// run on server start
defaultToRun();