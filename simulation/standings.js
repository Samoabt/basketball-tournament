function updateStandings(standings, result) {
    const winner = standings.find(team => team.Team === result.winner);
    const loser = standings.find(team => team.Team === result.loser);

    winner.Wins += 1;
    winner.Points += 2;
    winner.PointsScored += result.scoreA;
    winner.PointsAgainst += result.scoreB;
    winner.PointDifference += Math.abs(result.scoreA - result.scoreB);

    loser.Losses += 1;
    loser.Points += 1;
    loser.PointsScored += result.scoreB;
    loser.PointsAgainst += result.scoreA;
    loser.PointDifference -= Math.abs(result.scoreB - result.scoreA);
}

module.exports =  updateStandings;
