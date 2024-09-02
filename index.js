const fs = require('fs');
const  simulateGroupStage  = require('./simulation/groupStage'); 
const  determineTopTeams  = require('./simulation/knockoutStageGroups');
const  simulateQuarterFinals  = require('./simulation/quarterFinals');
const  simulateSemiFinals  = require('./simulation/semiFinals');
const  simulateThirdPlace  = require('./simulation/thirdPlaceGame');
const  simulateFinals  = require('./simulation/final');


function main() {

    const groups = JSON.parse(fs.readFileSync('data/groups.json', 'utf-8'));

    const groupResults = simulateGroupStage(groups);
    
    const draw = determineTopTeams(groupResults);

    const quarterFinalResults = simulateQuarterFinals(draw);

    const semiFinalResults = simulateSemiFinals(quarterFinalResults);

    const thirdPlaceResult = simulateThirdPlace(semiFinalResults);

    const finalResult = simulateFinals(semiFinalResults);
    
    const winnerFinal = finalResult.winner;
    const loserFinal = finalResult.loser;
    const winnerThirdPlace = thirdPlaceResult.winner;
    
    console.log("Medalje:");
    console.log(`    1. ${winnerFinal}`);          
    console.log(`    2. ${loserFinal}`);           
    console.log(`    3. ${winnerThirdPlace}`);     
    
}

main();