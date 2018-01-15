'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postListMember = exports.getListData = exports.getScore = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getFormResponses = require('./typeform/getFormResponses.js');

var _getLists = require('./mailchimp/getLists.js');

var _addListMembers = require('./mailchimp/addListMembers.js');

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

// function to run
const defaultToRun = () => {
  postListMember(getScore, _addListMembers.requestAddListMember);
};

// runs function every 24 hours
setInterval(function () {
  defaultToRun();
}, 1000 * 30);

// run on server start
defaultToRun();