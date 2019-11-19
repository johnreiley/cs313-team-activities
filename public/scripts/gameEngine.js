function getRandomInt(min, max) {
    return Math.floor(Math.random() * ((max - min + 1) + min));
}

function getCpuChoice() {
    var num = getRandomInt(0, 2);
    switch (num) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function getWinner(player, cpu, username) {
    var winner;

    if (player == cpu) {
        winner = "tie";
    } else if ((player == "rock" && cpu == "scissors") ||
        (player == "paper" && cpu == "rock") ||
        (player == "scissors" && cpu == "paper")) {
        winner = username
    } else {
        winner = "CPU";
    }
    return winner;
}

function playGame(req, res) {
    var player = req.query.player_choice;
    var username = req.query.username;

    var cpu = getCpuChoice();

    var winner = getWinner(player, cpu, username);

    var stuff = {
        player: player,
        cpu: cpu,
        winner: winner
    };
    res.render('pages/results', stuff);


}

module.exports = {
    playGame: playGame
}