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
    console.log(econScore);
    econScore += minimumWage == 'Agree' ? 0 : 1;
    console.log(econScore);
    econScore += govtPrograms == 'Agree' ? 1 : 0;
    console.log(econScore);

    console.log(freeTrade.indexOf('beneficial') != -1, currResponse[0]);
    console.log(minimumWage == 'Agree', currResponse[9]);
    console.log(govtPrograms == 'Agree', currResponse[4]);

    // dove
    let tortureTerror = currResponse[1];
    let militaryIntervention = currResponse[7];
    let intelAccess = currResponse[11];

    doveScore += tortureTerror == 'Agree' ? 1 : 0;
    doveScore += militaryIntervention == 'Agree' ? 1 : 0;
    doveScore += intelAccess == 'Agree' ? 1 : 0;

    // social
    let hateSpeech = currResponse[2];
    let racismIs = currResponse[8];
    let businessRefuse = currResponse[10];
    let payGap = currResponse[12];
    let univStudents = currResponse[6];

    socScore += hateSpeech == 'Agree' ? 1 : 0;
    socScore += racismIs.indexOf('embedded') != -1 ? 1 : 0;
    socScore += businessRefuse == 'Agree' ? 0 : 1;
    socScore += payGap == 'Agree' ? 0 : 1;
    socScore += univStudents == 'Agree' ? 1 : 0;

    // nation
    let raiseTaxes = currResponse[3];
    let immigrantAssim = currResponse[5];
    let citizenObligation = currResponse[13];

    nationScore += raiseTaxes == 'Agree' ? 1 : 0;
    nationScore += immigrantAssim == 'Agree' ? 1 : 0;
    nationScore += citizenObligation == 'Agree' ? 1 : 0;

    // action
    let action = currResponse[14];

    autonomy = action.indexOf('external') == -1 ? true : false;

    // part
    let disappoint = currResponse[15];

    partisan = disappoint == 'Agree' ? true : false;

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