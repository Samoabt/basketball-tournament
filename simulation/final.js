
const simulateMatch = require('./match');
const getTeamRanking = require('./teamRanking');

function simulateFinal(semiFinalResults) {
  const winners = semiFinalResults
    .filter(result => result.winner) 
    .map(result => result.winner);

  if (winners.length !== 2) {
    console.error("Nemoguce odrediti timove za finale!");
    return null;
  }

  const [teamA, teamB] = winners;

  const teamARanking = getTeamRanking(teamA);
  const teamBRanking = getTeamRanking(teamB);

  console.log("Finale:");

  const result = simulateMatch(
    { Team: teamA, FIBARanking: teamARanking },
    { Team: teamB, FIBARanking: teamBRanking }
  );

  console.log(`    ${teamA} vs ${teamB} - ${result.scoreA}:${result.scoreB}`);
  console.log('\n');
 
  return result;
}

module.exports = simulateFinal;
