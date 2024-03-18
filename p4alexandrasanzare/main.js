$(function () {
//game variables
    var squares = [], 
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",

    wins = [7, 56, 448, 73, 146, 292, 273, 84],

//updates the messages
    updateMessage = function (message) {
        $("#message").text(message);
    },

   //game over message
    gameOver = function (message) {
        updateMessage(message);
        // disables anymore clicks on squares
        squares.forEach(function (square) {
            square.off('click');
        });
    },
//starts new game
    startNewGame = function () {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
//attach click event handler to each square
        squares.forEach(function (square) {
            square.html(EMPTY);
            square.click(set);
        });
        updateMessage("It's X's turn");
    },
//function that checks to see if the player has won
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    set = function () {
//sees if the square is empty
        if ($(this).html() !== EMPTY) {
            return;
        }
        $(this).html(turn);
        moves += 1;
        score[turn] += $(this)[0].indicator;
//checks to see if the player has won or if it is a draw
        if (win(score[turn])) {
            gameOver(turn + " wins, good game!");
        } else if (moves === SIZE * SIZE) {
            gameOver("It's a draw, play again!");
        } else {
//changes the turn
            turn = turn === "X" ? "O" : "X";
            updateMessage("It's " + turn + "'s turn");
        }
    },
//initializes the board
    play = function () {
        var board = $("<table id='game-board' cellspacing=0>");
        var indicator = 1;
//creates the board
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td></td>");
                cell[0].indicator = indicator;
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }
//appends the board to the page
        $("#board").append(board);
//starts a new game
        startNewGame();
    };

  //restarts the game
    $("#restart-button").click(function () {
        startNewGame();
    });

    play();
});
