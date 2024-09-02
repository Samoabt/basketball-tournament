function determineTopTeams(groupResults) {
    
    let allTeams = [];
    let groupMemberships = {};

    for (const groupName in groupResults) {
        groupResults[groupName].forEach(team => {
            allTeams.push({ ...team, group: groupName });
            groupMemberships[team.Team] = groupName;
        });
    }

    allTeams.sort((a, b) => b.Wins - a.Wins || b.PointDifference - a.PointDifference);

    console.log("Šeširi:");
    const pots = {
        'Šešir D': [],
        'Šešir E': [],
        'Šešir F': [],
        'Šešir G': []
    };

    if (allTeams.length > 0) pots['Šešir D'].push(allTeams[0].Team);
    if (allTeams.length > 1) pots['Šešir D'].push(allTeams[1].Team);
    if (allTeams.length > 2) pots['Šešir E'].push(allTeams[2].Team);
    if (allTeams.length > 3) pots['Šešir E'].push(allTeams[3].Team);
    if (allTeams.length > 4) pots['Šešir F'].push(allTeams[4].Team);
    if (allTeams.length > 5) pots['Šešir F'].push(allTeams[5].Team);
    if (allTeams.length > 6) pots['Šešir G'].push(allTeams[6].Team);
    if (allTeams.length > 7) pots['Šešir G'].push(allTeams[7].Team);

    for (const [pot, teams] of Object.entries(pots)) {
        console.log(`    ${pot}`);
        teams.forEach(team => console.log(`        ${team}`));
    }

    console.log("\nEliminaciona faza:");
    const draw = [];

    function findValidOpponent(team, potentialOpponents) {
        return potentialOpponents.find(opponent => groupMemberships[opponent] !== groupMemberships[team]);
    }

    const teamsD = [...pots['Šešir D']];
    const teamsG = [...pots['Šešir G']];

    while (teamsD.length > 0 && teamsG.length > 0) {
        const teamD = teamsD.pop();
        const opponentG = findValidOpponent(teamD, teamsG);
        if (opponentG) {
            draw.push({ teamA: teamD, teamB: opponentG });
            teamsG.splice(teamsG.indexOf(opponentG), 1);
        } else {
            teamsD.push(teamD);
            break;
        }
    }

    const teamsE = [...pots['Šešir E']];
    const teamsF = [...pots['Šešir F']];

    while (teamsE.length > 0 && teamsF.length > 0) {
        const teamE = teamsE.pop();
        const opponentF = findValidOpponent(teamE, teamsF);
        if (opponentF) {
            draw.push({ teamA: teamE, teamB: opponentF });
            teamsF.splice(teamsF.indexOf(opponentF), 1);
        } else {
            teamsE.push(teamE);
            break;
        }
    }

    if (teamsD.length > 0 && teamsG.length > 0) {
        const teamD = teamsD.pop();
        const teamG = teamsG.pop();
        draw.push({ teamA: teamD, teamB: teamG });
    }

    if (teamsE.length > 0 && teamsF.length > 0) {
        const teamE = teamsE.pop();
        const teamF = teamsF.pop();
        draw.push({ teamA: teamE, teamB: teamF });
    }

    draw.forEach(match => {
        console.log(`    ${match.teamA} - ${match.teamB}`);
    });
    console.log('\n');
    return draw;
}

module.exports = determineTopTeams;
