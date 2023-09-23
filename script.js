    /*
    Functions: 
    gameBoard() will build the gameboard by creating an array based on a number of columns and rows (3x3)
        * This function will be an IIFE
    gameController() will handle the game state, changing turns, check for win states, and playing the round
    updateGameBoard() will update the gameboard with new information as the turns are played
    gameBoard()
        Create private variables storing the amount of rows and columns
        Initialize array containing the game board
        Create a nested loop that begins by iterating over the arrays' index of the current row, making sure that it's empty before continuing
        Next, the loop will iterate over the amount of columns, pushing a cell to corresponding row in the array for each column before moving on to the ne"x"t row

    */
    var cells = document.getElementsByClassName("cell");
    var activePlayerMessage = document.getElementById("active-player");
    var winMessage = document.getElementById("win-message")

    var gameBoard = (function (){
        var board = [];
        const rows = 3;
        const columns = 3;

        for(let i = 0; i < rows; i++){
            board[i] = [];
            for (let j = 0; j < columns; j++){
                board[i].push(0);
            }
        }
        return {board, rows, columns};
    })();

    const Player = (name, token) => {
        const getName = () => name;
        const getToken = () => token;

        const placeToken = (row, column, token) => {
            if (row >= 0 && row < gameBoard.rows && column >= 0 && column < gameBoard.columns) {
                if (gameBoard.board[row][column] === 0) {
                    gameBoard.board[row][column] = token;
                    gameController.switchTurn();
                } else {
                    console.log("Invalid placement");
                }
            } else {
                console.log("Invalid row or column values.");
            }
        }
        return{getName, getToken, placeToken};
    }

    var gameController = (function (){
        const player1 = Player("Player One", 1);
        const player2 = Player("Player Two", 2);
        const _players = [player1, player2];

        let activePlayer = _players[0];

        var handleTurn = (function (desiredRow, desiredColumn){
            console.log(`${activePlayer.getName()}'s turn.`)
            console.log(gameBoard.board);
            activePlayer.placeToken(desiredRow, desiredColumn, activePlayer.getToken());
        })

        var switchTurn = (function (){
            activePlayer = activePlayer === _players[0] ? _players[1] : _players[0];
            activePlayerMessage.textContent = `${activePlayer.getName()}'s turn.`;
            printBoard();
            checkWin();
        })

        var checkWin = (function (){
            let board = gameBoard.board;
            let rows = gameBoard.rows;
            let columns = gameBoard.columns;
            const allEqual = arr => arr.every(val => val === arr[0]); // Check if every value in the array matches the first element
        
            // Check rows for a win
            for (let i = 0; i < rows; i++) {
                if (allEqual(board[i])){ // Check if every all tokens in row is the same
                    let sum = board[i].reduce((a, b) => a + b, 0); // Calculate the sum of the current row
                    if (sum === 3) {
                        winMessage.textContent = "Player One Wins";
                        return;
                    } else if (sum === 6) {
                        winMessage.textContent = "Player Two Wins";
                        return;
                    }
                }
            }
        
            // Check columns for a win
            for (let j = 0; j < columns; j++) { // Loop through each column, represented by j
                let verticalSum = 0;
                let verticalBoard = [];
                for (let i = 0; i < rows; i++) {
                    verticalBoard.push(board[i][j]);
                    if (allEqual(verticalBoard)){
                        verticalSum = verticalBoard.reduce((a, b) => a + b, 0);
                        if (verticalSum === 3) {
                            winMessage.textContent = "Player One Wins";
                            return;
                        } else if (verticalSum === 6) {
                            winMessage.textContent = "Player Two Wins";
                            return;
                        }
                    }
                }
            }
        
            // Check diagonal from top-left to bottom-right
            let diagonalSum = 0;
            let diagonalBoard = [];
            for (let i = 0; i < rows; i++) {
                diagonalBoard.push(board[i][i]);
                if (allEqual(diagonalBoard)){
                    diagonalSum = diagonalBoard.reduce((a, b) => a + b, 0);
                    if (diagonalSum === 3) {
                        winMessage.textContent = "Player One Wins";
                        return;
                    } else if (diagonalSum === 6) {
                        winMessage.textContent = "Player Two Wins";
                        return;
                    }
                }
            }
        
            // Check diagonal from top-right to bottom-left
            diagonalSum = 0;
            diagonalBoard = [];
            for (let i = 0; i < rows; i++) {
                diagonalBoard.push(board[i][rows - 1 - i])
                if (allEqual(diagonalBoard)){
                    diagonalSum = diagonalBoard.reduce((a, b) => a + b, 0);
                    if (diagonalSum === 3) {
                        winMessage.textContent = "Player One Wins";
                    } else if (diagonalSum === 6) {
                        winMessage.textContent = "Player Two Wins";
                    }
                }
            }
        });

        return{player1, player2, activePlayer, switchTurn, handleTurn};
    })();

    var printBoard = (function (){
        for (let i = 0; i < cells.length; i++){ // Reset board
            if (cells[i].textContent.trim() !== ''){
                cells[i].textContent = '';
            }
        }
        for (let i = 0; i < cells.length; i++){
            let content;
            if (i <= 2){
                switch(gameBoard.board[0][i]){
                    case 0:
                        content = document.createTextNode("");
                        cells[i].appendChild(content);
                        break;
                    case 1:
                        content = document.createTextNode("X");
                        cells[i].append(content);
                        break;
                    case 2:
                        content = document.createTextNode("O");
                        cells[i].append(content);
                        break; 
                }
            }
            else if (i <= 5 && i > 2){
                switch(gameBoard.board[1][i - 3]){
                    case 0:
                        content = document.createTextNode("");
                        cells[i].appendChild(content);
                        break;
                    case 1:
                        content = document.createTextNode("X");
                        cells[i].append(content);
                        break;
                    case 2:
                        content = document.createTextNode("O");
                        cells[i].append(content);
                        break; 
                }
            }
            else if (i <= 8 && i > 5){
                switch(gameBoard.board[2][i - 6]){
                    case 0:
                        content = document.createTextNode("");
                        cells[i].appendChild(content);
                        break;
                    case 1:
                        content = document.createTextNode("X");
                        cells[i].append(content);
                        break;
                    case 2:
                        content = document.createTextNode("O");
                        cells[i].append(content);
                        break; 
                }
            }
        }
    })
