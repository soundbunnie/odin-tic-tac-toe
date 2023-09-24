        var cells = document.getElementsByClassName("cell");
        var activePlayerMessage = document.getElementById("active-player");
        var winMessage = document.getElementById("win-message")

        var isWin = false;

        document.getElementById("reset-button").addEventListener("click", function () {
            gameController.resetBoard();
        });    

        var gameBoard = (function (){
            var board = [];
            const rows = 3;
            const columns = 3;

            for (let i = 0; i < rows; i++) {
                board[i] = new Array(columns).fill(0);
            }
            return {board, rows, columns};
        })();

        const Player = (name, token) => {
            const getName = () => name;
            const getToken = () => token;

            function placeToken(row, column) {
                if (gameBoard.board[row][column] === 0) {
                    gameBoard.board[row][column] = token;
                    gameController.switchTurn();
                } else {
                    console.log("Invalid placement");
                }
            }
            return{getName, getToken, placeToken};
        }

        var gameController = (function (){
            const player1 = Player("Player One", 1);
            const player2 = Player("Player Two", 2);
            const _players = [player1, player2];

            var activePlayer = player1;

            var handleTurn = (function (desiredRow, desiredColumn){
                if (!isWin){
                    activePlayer.placeToken(desiredRow, desiredColumn, activePlayer.getToken());
                }
            })

            var switchTurn = (function (){
                activePlayer = activePlayer === player1 ? player2 : player1;
                activePlayerMessage.textContent = `${activePlayer.getName()}'s turn.`;
                printBoard();
                checkWin();
            })

            var updateWin = (function (sum){
                if (sum === 3){
                    winMessage.textContent = "Player One Wins";
                    isWin = true;
                    return;
                }
                else if (sum === 6){
                    winMessage.textContent = "Player Two Wins";
                    isWin = true;
                    return;
                }
            });

            var checkWin = (function (){
                let board = gameBoard.board;
                let rows = gameBoard.rows;
                let columns = gameBoard.columns;
                const allEqual = arr => arr.every(val => val === arr[0]); // Check if every value in the array matches the first element
            
                // Check rows for a win
                for (let i = 0; i < rows; i++) {
                    if (allEqual(board[i])){ // Check if every all tokens in row is the same
                        let sum = board[i].reduce((a, b) => a + b, 0); // Calculate the sum of the current row
                        updateWin(sum);
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
                            updateWin(verticalSum);
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
                        updateWin(diagonalSum);
                    }
                }
            
                // Check diagonal from top-right to bottom-left
                diagonalSum = 0;
                diagonalBoard = [];
                for (let i = 0; i < rows; i++) {
                    diagonalBoard.push(board[i][rows - 1 - i])
                    if (allEqual(diagonalBoard)){
                        diagonalSum = diagonalBoard.reduce((a, b) => a + b, 0);
                        updateWin(diagonalSum);
                    }
                }
            });

            var printBoard = (function () {
                for (let i = 0; i < cells.length; i++) {
                    const rowIndex = Math.floor(i / 3); // Divide by 3 because it's a 3x3 grid (6, 7, 8 are all 2 when floored, so they're the 2nd row)
                    const colIndex = i % 3; 
                    // Use modulo because the column index has to wrap around when reaching the end of a row, which is why I get 
                    // the remainder of i after dividing it by the number of columns
                    const content = gameBoard.board[rowIndex][colIndex];
                    cells[i].textContent = content === 1 ? 'X' : content === 2 ? 'O' : '';
                }
            });        
    
            var resetBoard = (function () {
                let board = gameBoard.board;
                isWin = false;
                for (let i = 0; i < gameBoard.rows; i++) {
                    for (let j = 0; j < gameBoard.columns; j++) {
                        board[i][j] = 0;
                    }
                }
                activePlayer = player1;
                activePlayerMessage.textContent = `${gameController.activePlayer.getName()}'s turn.`; // Update active player message
                winMessage.textContent = "";
                printBoard();
            });
            return{_players, player1, player2, activePlayer, switchTurn, handleTurn, resetBoard, printBoard};
        })();
        
