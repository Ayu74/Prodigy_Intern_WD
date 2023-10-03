const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(index) {
    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        if (checkWinner()) {
            message.textContent = currentPlayer + ' wins!';
            message.classList.add('winner-message');
        } else if (!gameBoard.includes('')) {
            message.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]           // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return true;
        }
    }

    return false;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    message.textContent = 'Let\'s play!';
    message.classList.remove('winner-message');
    currentPlayer = 'X';
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});