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
