// Selectors
const board = document.getElementById("game-board");
const newGameButton = document.getElementById("new-game");
const SIZE = 5; // 5x5 grid
let moves = 0; // Track moves
let timer = 0; // Timer in seconds
let timerInterval; // Interval for the timer
let target = 0; // Target for the game
let toggledCells = new Set(); // Track which cells have been toggled
let lastCell = null; // Track the last clicked cell

// Initialize the game board
function initBoard() {
    board.innerHTML = ""; // Clear the board
    moves = 0; // Reset moves
    timer = 0; // Reset timer
    toggledCells.clear(); // Clear toggled cells
    lastCell = null; // Reset last clicked cell
    target = generateRandomTarget(); // Generate random target
    clearInterval(timerInterval); // Stop any existing timer
    updateGameInfo(); // Update stats
    startTimer(); // Start a new timer

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", () => toggleLights(row, col));
            board.appendChild(cell);
        }
    }

    randomizeBoard(); // Randomize the board without affecting moves
}

// Generate a random target for the game
function generateRandomTarget() {
    return Math.floor(Math.random() * 10) + 5; // Random number between 5 and 15
}

// Toggle lights for a cell and its neighbors
function toggleLights(row, col) {
    const directions = [
        [0, 0], // Current cell
        [-1, 0], // Above
        [1, 0], // Below
        [0, -1], // Left
        [0, 1], // Right
    ];

    directions.forEach(([dx, dy]) => {
        const r = row + dx;
        const c = col + dy;
        if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            cell.classList.toggle("is-off");
        }
    });

    const cellKey = `${row},${col}`;
    // Logic for incrementing or decrementing moves
    if (lastCell === cellKey) { // If the same cell is clicked consecutively
        toggledCells.delete(cellKey);
        moves--;
        lastCell = null;
    } else { // If a different cell is clicked
        toggledCells.add(cellKey);
        moves++;
        lastCell = cellKey;
    }

    updateGameInfo(); // Update stats
    checkWin(); // Check win condition
}

// Randomize the board with a solvable configuration (no moves counted)
function randomizeBoard() {
    for (let i = 0; i < SIZE * SIZE; i++) {
        const row = Math.floor(Math.random() * SIZE);
        const col = Math.floor(Math.random() * SIZE);
        // Temporarily disable move tracking for randomization
        toggleLightsWithoutMoveCount(row, col);
    }
}

// Toggle lights without counting moves (used for board randomization)
function toggleLightsWithoutMoveCount(row, col) {
    const directions = [
        [0, 0], // Current cell
        [-1, 0], // Above
        [1, 0], // Below
        [0, -1], // Left
        [0, 1], // Right
    ];

    directions.forEach(([dx, dy]) => {
        const r = row + dx;
        const c = col + dy;
        if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            cell.classList.toggle("is-off");
        }
    });
}

// Check if all lights are off (winning condition)
function checkWin() {
    const cells = document.querySelectorAll(".cell");
    const allOff = Array.from(cells).every(cell => cell.classList.contains("is-off"));
    if (allOff) {
        clearInterval(timerInterval); // Stop the timer
        setTimeout(() => {
            alert(`You win! Moves: ${moves}, Time: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`);
        }, 100);
    }
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer++; // Increment the timer
        updateGameInfo(); // Update stats
    }, 1000); // Update every second
}

// Update the game statistics
function updateGameInfo() {
    document.getElementById("target").textContent = target; // Update target
    document.getElementById("moves").textContent = moves; // Update moves
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById("time").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`; // Format time as mm:ss
}

// New game setup
newGameButton.addEventListener("click", () => {
    initBoard();
});

// Initialize the game on page load
window.onload = initBoard;