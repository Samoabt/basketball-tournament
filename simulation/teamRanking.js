
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/groups.json', 'utf-8'));

function getTeamRanking(teamName) {

    const allTeams = Object.values(data).flat();
  
    const team = allTeams.find(t => t.Team === teamName);
  
    if (team) {
        return team.FIBARanking;
    } else {
        throw new Error(`Team ${teamName} nije pronadjen.`);
    }
}

module.exports = getTeamRanking;
