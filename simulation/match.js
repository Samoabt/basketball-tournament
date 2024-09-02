const fs = require('fs');

const exhibitions = JSON.parse(fs.readFileSync('./data/exibitions.json', 'utf8'));

function calculateFormFactor(teamISOCode) {
    const results = exhibitions[teamISOCode];
    if (!results) return 0;

    let totalForm = 0;
    results.forEach(match => {
        const [scoreA, scoreB] = match.Result.split('-').map(Number);
        if (scoreA > scoreB) {
            totalForm += 1;
        } else if (scoreA < scoreB) {
            totalForm -= 1;
        }
    });
    return totalForm;
}

function simulateMatch(teamA, teamB) {
    const formFactorA = calculateFormFactor(teamA.ISOCode);
    const formFactorB = calculateFormFactor(teamB.ISOCode);

    const rankingDifference = Math.abs(teamA.FIBARanking - teamB.FIBARanking);
    const rankingFavor = teamA.FIBARanking < teamB.FIBARanking ? 1 : -1;

    const baseScoreA = Math.floor(Math.random() * 30) + 70 + formFactorA*2;
    const baseScoreB = Math.floor(Math.random() * 30) + 70 + formFactorB*2;

    const adjustedScoreA = baseScoreA + rankingFavor * rankingDifference;
    const adjustedScoreB = baseScoreB - rankingFavor * rankingDifference;

    const scoreA = adjustedScoreA === adjustedScoreB ? adjustedScoreA + 1 : adjustedScoreA;
    const scoreB = adjustedScoreB;

    let winner, loser;
    if (scoreA > scoreB) {
        winner = teamA;
        loser = teamB;
    } else {
        winner = teamB;
        loser = teamA;
    }

    return {
        winner: winner.Team,
        loser: loser.Team,
        scoreA: scoreA,
        scoreB: scoreB
    };
}

module.exports = simulateMatch;
