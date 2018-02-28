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
    email = currResponse[15];

    // econ
    let freeTrade = currResponse[0];
    let minimumWage = currResponse[3];
    let govtPrograms = currResponse[1];

    econScore += freeTrade == 'beneficial' ? 1 : 0;
    econScore += minimumWage == 'Disagree' ? 1 : 0;
    econScore += govtPrograms == 'Agree' ? 1 : 0;

    // dove
    let tortureTerror = currResponse[2];
    let militaryIntervention = currResponse[6];
    let supportCreation = currResponse[11];

    doveScore += tortureTerror == 'Agree' ? 1 : 0;
    doveScore += militaryIntervention == 'Agree' ? 1 : 0;
    doveScore += supportCreation == 'Agree' ? 1 : 0;

    // soc
    let hateSpeech = currResponse[4];
    let racismIs = currResponse[5];
    let businessRefuse = currResponse[7];

    socScore += hateSpeech == 'Agree' ? 1 : 0;
    socScore += racismIs.indexOf('embedded') != -1 ? 1 : 0;
    socScore += businessRefuse == 'Agree' ? 1 : 0;

    // nation
    let raiseTaxes = currResponse[8];
    let immigrantAssim = currResponse[9];
    let citizenObligation = currResponse[10];

    nationScore += raiseTaxes == 'Agree' ? 1 : 0;
    nationScore += immigrantAssim == 'Agree' ? 1 : 0;
    nationScore += citizenObligation == 'Agree' ? 1 : 0;

    // action
    let action = currResponse[12];

    autonomy = action.indexOf('external') == -1 ? true : false;

    // part
    let disappoint = currResponse[13];

    partisan = disappoint == 'Agree' ? true : false;

    // vote
    let vote = currResponse[14];

    votePref = vote;

    scores = [econScore, doveScore, socScore, nationScore, autonomy, partisan, votePref];
    scoreMap[email] = scores;
    scoreString += `${email}\nEconomic score: ${econScore}\nHawk/dove score: ${doveScore}\nSocial score: ${socScore}\nNational score: ${nationScore}\nAutonomy: ${autonomy}\nVotes for: ${votePref}\nPartisan: ${partisan}\n\n`;
  }

  console.log(scoreString);
  console.log(scoreMap);
};