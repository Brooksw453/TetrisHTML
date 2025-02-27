const COLS = 10, ROWS = 20;
let board = Array.from({length: ROWS}, () => Array(COLS).fill(0));

// Define tetromino shapes (using matrices or coordinate lists)
const TETROMINOES = {
  I: [ [1,1,1,1] ],             // 4 in a row
  O: [ [2,2],
        [2,2] ],               // 2x2 block
  T: [ [0,3,0],
        [3,3,3] ],
  J: [ [4,0,0],
        [4,4,4] ],
  L: [ [0,0,5],
        [5,5,5] ],
  S: [ [0,6,6],
        [6,6,0] ],
  Z: [ [7,7,0],
        [0,7,7] ]
};
let dropInterval = 1000; // initial drop speed (milliseconds per row)
let lastDropTime = 0;

function gameLoop(timestamp) {
  if (!lastDropTime) lastDropTime = timestamp;
  const delta = timestamp - lastDropTime;
  if (delta > dropInterval) {
    updateGameState();   // move piece down if possible
    lastDropTime = timestamp;
  }
  renderGame();          // draw the current state (board + falling piece)
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
document.addEventListener('keydown', (e) => {
  if (e.code === "ArrowLeft") {
    movePiece(-1);  // move left
  } else if (e.code === "ArrowRight") {
    movePiece(1);   // move right
  } else if (e.code === "ArrowDown") {
    dropPiece();    // soft drop (move down faster)
  } else if (e.code === "ArrowUp") {
    rotatePiece();  // rotate (clockwise)
  }
});
function clearLines() {
  let linesCleared = 0;
  for (let r = board.length - 1; r >= 0; r--) {
    if (board[r].every(cell => cell !== 0)) {
      board.splice(r, 1);               // remove the filled row
      board.unshift(Array(COLS).fill(0)); // add an empty row at top
      linesCleared++;
    }
  }
  if (linesCleared > 0) {
    score += linesCleared;        // award 1 point per line
    linesClearedTotal += linesCleared;
    playSound('line-clear');      // play chime sound
    updateScoreDisplay();
    // Check level up
    if (linesClearedTotal >= 10) {
      levelUp();
    }
  }
}
function levelUp() {
  level++;
  linesClearedTotal = 0;           // reset count towards next level
  // Increase speed by making drop interval shorter (e.g., 20% faster)
  dropInterval = Math.max(100, dropInterval * 0.8); 
  updateLevelDisplay();
  // Optionally, play a level-up sound or visual effect
}
function playSound(name) {
  if (name === 'line-clear') {
    document.getElementById('line-clear-sound').play();
  }
}


