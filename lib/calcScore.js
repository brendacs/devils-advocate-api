'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let scoreMap = exports.scoreMap = {};

const calcScore = exports.calcScore = results => {
  let email;
  let scores;
  let scoreString = '';

  for (let i = 1; i < results.length; i++) {
    let econScore = 0;
    let doveScore = 0;
    let socScore = 0;
    let nationScore = 0;
    let partisan;
    let autonomy;
    let votePref;

    let currResponse = results[i];
    email = currResponse[17];

    // econ
    let freeTrade = currResponse[0];
    let minimumWage = currResponse[9];
    let govtPrograms = currResponse[4];

    econScore += freeTrade.indexOf('beneficial') != -1 ? 1 : 0;
    econScore += minimumWage.indexOf('Agree') != -1 ? 0 : 1;
    econScore += govtPrograms.indexOf('Agree') != -1 ? 1 : 0;

    // dove
    let tortureTerror = currResponse[1];
    let militaryIntervention = currResponse[7];
    let intelAccess = currResponse[11];

    doveScore += tortureTerror.indexOf('Agree') != -1 ? 1 : 0;
    doveScore += militaryIntervention.indexOf('Agree') != -1 ? 1 : 0;
    doveScore += intelAccess.indexOf('Agree') != -1 ? 1 : 0;

    // social
    let hateSpeech = currResponse[2];
    let racismIs = currResponse[8];
    let businessRefuse = currResponse[10];
    let payGap = currResponse[12];
    let univStudents = currResponse[6];

    socScore += hateSpeech.indexOf('Agree') != -1 ? 1 : 0;
    socScore += racismIs.indexOf('embedded') != -1 ? 1 : 0;
    socScore += businessRefuse.indexOf('Agree') != -1 ? 0 : 1;
    socScore += payGap.indexOf('Agree') != -1 ? 0 : 1;
    socScore += univStudents.indexOf('Agree') != -1 ? 1 : 0;

    // nation
    let raiseTaxes = currResponse[3];
    let immigrantAssim = currResponse[5];
    let citizenObligation = currResponse[13];

    nationScore += raiseTaxes.indexOf('Agree') != -1 ? 1 : 0;
    nationScore += immigrantAssim.indexOf('Agree') != -1 ? 1 : 0;
    nationScore += citizenObligation.indexOf('Agree') != -1 ? 1 : 0;

    // action
    let action = currResponse[14];

    autonomy = action.indexOf('External') != -1 ? false : true;

    // part
    let disappoint = currResponse[15];

    partisan = disappoint.indexOf('Agree') != -1 ? true : false;

    // vote
    let vote = currResponse[16];

    votePref = vote;

    scores = [econScore, doveScore, socScore, nationScore, autonomy, partisan, votePref];
    scoreMap[email] = scores;
    scoreString += `${email}\nEconomic score: ${econScore}\nHawk/dove score: ${doveScore}\nSocial score: ${socScore}\nNational score: ${nationScore}\nAutonomy: ${autonomy}\nVotes for: ${votePref}\nPartisan: ${partisan}\n\n`;
  }

  console.log(scoreString);
  console.log(scoreMap);
};