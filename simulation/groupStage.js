
const simulateMatch = require('./match');
const updateStandings = require('./standings');

function simulateGroupStage(groups) {
    const groupResults = {};

    for (const groupName in groups) {
        console.log(`Grupa ${groupName}:`);
        const teams = groups[groupName];

        const standings = teams.map(team => ({
            Team: team.Team,
            Wins: 0,
            Losses: 0,
            Points: 0,
            PointsScored: 0,
            PointsAgainst: 0,
            PointDifference: 0
        }));

        for (let round = 1; round < teams.length; round++) {
            console.log(`   ${round}. kolo:`);
            for (let i = 0; i < teams.length; i += 2) {
                const teamA = teams[i];
                const teamB = teams[i + 1];

                const result = simulateMatch(teamA, teamB);
                updateStandings(standings, result);
                console.log(`       ${teamA.Team} - ${teamB.Team} (${result.scoreA}:${result.scoreB})`);
            }
            console.log('\n');
            const lastTeam = teams.pop();
            teams.splice(1, 0, lastTeam);
        }

        standings.sort((a, b) => b.Wins - a.Wins || b.PointDifference - a.PointDifference);

        groupResults[groupName] = standings;
    }

    console.log("Konačan plasman u grupama:");
    for (const groupName in groupResults) {
        console.log(`Grupa ${groupName}:`);
        groupResults[groupName].forEach((team, index) => {
            console.log(
                `${(index + 1).toString().padEnd(1)}. ${team.Team.padEnd(17)} ${team.Wins.toString().padEnd(2)} / ${team.Losses.toString().padEnd(2)} / ${team.Points.toString().padEnd(2)} / ${team.PointsScored.toString().padEnd(4)} / ${team.PointsAgainst.toString().padEnd(4)} / ${team.PointDifference.toString().padEnd(4)}`
            );
        });
        console.log('\n');
    }

    return groupResults;
}

module.exports = simulateGroupStage;