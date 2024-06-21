// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('game-status');
    const resetButton = document.getElementById('reset-button');
    let isXTurn = true;
    let gameActive = true;
    let board = Array(9).fill(null);

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const index = e.target.dataset.index;
        if (board[index] !== null || !gameActive) return;
        
        board[index] = isXTurn ? 'X' : 'O';
        e.target.textContent = board[index];
        checkResult();
        isXTurn = !isXTurn;
        gameStatus.textContent = gameActive ? `Player ${isXTurn ? 'X' : 'O'}'s turn` : gameStatus.textContent;
    };

    const checkResult = () => {
        let roundWon = false;
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'} wins!`;
            gameActive = false;
            return;
        }

        if (!board.includes(null)) {
            gameStatus.textContent = 'It\'s a tie!';
            gameActive = false;
            return;
        }
    };

    const resetGame = () => {
        isXTurn = true;
        gameActive = true;
        board = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        gameStatus.textContent = 'Player X\'s turn';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
