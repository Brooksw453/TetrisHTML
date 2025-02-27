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


