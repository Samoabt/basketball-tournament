
const simulateMatch = require('./match');
const getTeamRanking = require('./teamRanking');

function simulateSemiFinals(quarterFinalResults) {
  const semiFinalResults = [];
  const semiFinalTeams = quarterFinalResults.map(result => result.winner);

  console.log("Polufinale:");

  for (let i = 0; i < semiFinalTeams.length; i += 2) {
    const teamA = semiFinalTeams[i];
    const teamB = semiFinalTeams[i + 1];

    const teamARanking = getTeamRanking(teamA);
    const teamBRanking = getTeamRanking(teamB);

    const result = simulateMatch(
      { Team: teamA, FIBARanking: teamARanking },
      { Team: teamB, FIBARanking: teamBRanking }
    );

    console.log(`   ${teamA} vs ${teamB} - ${result.scoreA}:${result.scoreB}`);

    semiFinalResults.push(result);
  }
  console.log('\n');
  
  return semiFinalResults;
}

module.exports = simulateSemiFinals;
