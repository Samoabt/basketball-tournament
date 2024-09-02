
const simulateMatch = require('./match');
const getTeamRanking = require('./teamRanking');

function simulateThirdPlace(semiFinalResults) {
 
  const losers = semiFinalResults
    .filter(result => result.loser)
    .map(result => result.loser);

  if (losers.length !== 2) {
    console.error("Nemoguce odrediti timove za trece mesto!");
    return null;
  }

  const [teamA, teamB] = losers;

  const teamARanking = getTeamRanking(teamA);
  const teamBRanking = getTeamRanking(teamB);

  console.log("Utakmica za trece mesto:");

  const result = simulateMatch(
    { Team: teamA, FIBARanking: teamARanking },
    { Team: teamB, FIBARanking: teamBRanking }
  );

  console.log(`    ${teamA} vs ${teamB} - ${result.scoreA}:${result.scoreB}`);

  console.log('\n');
  return result;
}

module.exports = simulateThirdPlace;
