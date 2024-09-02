
const simulateMatch = require('./match');
const getTeamRanking = require('./teamRanking');

function simulateQuarterFinals(draw) {
    
    const quarterFinalResults = [];
    console.log("Četvrtfinale:");

    draw.forEach(match => {
        const { teamA, teamB } = match;
        const teamARanking = getTeamRanking(teamA);
        const teamBRanking = getTeamRanking(teamB);

        const result = simulateMatch(
            { Team: teamA, FIBARanking: teamARanking }, 
            { Team: teamB, FIBARanking: teamBRanking }
        );

        console.log(`   ${teamA} vs ${teamB} - ${result.scoreA}:${result.scoreB}`);

        quarterFinalResults.push(result);
    });
    console.log('\n');
    
    return quarterFinalResults;
}

module.exports =  simulateQuarterFinals ;
