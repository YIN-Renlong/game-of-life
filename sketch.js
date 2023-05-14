// Define the characters as 5x7 bitmaps
const letter_Y = [
  "10001",
  "01010",
  "00100",
  "00100",
  "00100",
  "00100",
  "00100"
];

const letter_I = [
  "11111",
  "00100",
  "00100",
  "00100",
  "00100",
  "00100",
  "11111"
];

const letter_N = [
  "10001",
  "11001",
  "10101",
  "10011",
  "10001",
  "10001",
  "10001"
];

const letter_R = [
  "11110",
  "10001",
  "10001",
  "11110",
  "11000",
  "10100",
  "10010"
];

const letter_E = [
  "11111",
  "10000",
  "10000",
  "11110",
  "10000",
  "10000",
  "11111"
];

const letter_L = [
  "10000",
  "10000",
  "10000",
  "10000",
  "10000",
  "10000",
  "11111"
];

const letter_O = [
  "01110",
  "10001",
  "10001",
  "10001",
  "10001",
  "10001",
  "01110"
];

const letter_G = [
  "01110",
  "10001",
  "10000",
  "10011",
  "10001",
  "10001",
  "01110"
];

const cellSize = 10;
let numRows, numCols;

function calculateGridSize() {
  numRows = Math.floor(window.innerHeight / cellSize);
  numCols = Math.floor(window.innerWidth / cellSize);
}

calculateGridSize(); // Call this function initially to set numRows and numCols

const updateInterval = 50;

// Define the spacing between characters
const space_between_characters = 2;

// Calculate the total width of the text
const text_width =
  10 * 5 + // 10 characters, each 5 pixels wide
  9 * space_between_characters + // 9 spaces between characters, each 2 pixels wide
  4; // extra space between 'N' and 'R'

// Calculate the starting positions on the matrix
const start_x = Math.floor((numCols * cellSize - text_width * cellSize) / 2 / cellSize);
const start_y = Math.floor((numRows * cellSize - 7 * cellSize) / 2 / cellSize); // Center vertically, 7 is the height of characters

const RED_CELL = 2;
const PURPLE_CELL = 3;

function windowResized() {
  calculateGridSize();
  resizeCanvas(window.innerWidth, window.innerHeight);
}


// Create a function to draw a character on the matrix, given the character's bitmap, starting position, and LED matrix
function draw_character(bitmap, start_x, start_y, matrix) {
  for (let y = 0; y < bitmap.length; y++) {
    for (let x = 0; x < bitmap[y].length; x++) {
      if (bitmap[y][x] === "1") {
        matrix[start_y + y][start_x + x] = 1;
      }
    }
  }
  return matrix;
}

// Initialize an empty 100x100 matrix
const led_matrix = Array.from({ length: numRows }, () => Array(numCols).fill(0));

// Draw the characters on the matrix
draw_character(letter_Y, start_x, start_y, led_matrix);
draw_character(letter_I, start_x + 5 + space_between_characters, start_y, led_matrix);
draw_character(letter_N, start_x + 10 + 2 * space_between_characters, start_y, led_matrix);

// Add extra spaces between 'N' and 'R'
const extra_space = 4;

draw_character(letter_R, start_x + 15 + 3 * space_between_characters + extra_space, start_y, led_matrix);
draw_character(letter_E, start_x + 20 + 4 * space_between_characters + extra_space, start_y, led_matrix);
draw_character(letter_N, start_x + 25 + 5 * space_between_characters + extra_space, start_y, led_matrix);

draw_character(letter_L, start_x + 30 + 6 * space_between_characters + extra_space, start_y, led_matrix);
draw_character(letter_O, start_x + 35 + 7 * space_between_characters + extra_space, start_y, led_matrix);
draw_character(letter_N, start_x + 40 + 8 * space_between_characters + extra_space, start_y, led_matrix);
draw_character(letter_G, start_x + 45 + 9 * space_between_characters + extra_space, start_y, led_matrix);


let grid;


// Add a variable to track the elapsed time
let elapsedTime = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight); // Updated to cover the entire browser window
  grid = JSON.parse(JSON.stringify(led_matrix)); // Use the led_matrix as the initial grid
  frameRate(1000 / updateInterval);
}

function draw() {
  background(255);
  displayGrid(grid);
  grid = gameOfLifeUpdate(grid);
  // Increment the elapsed time by updateInterval (50 milliseconds)
  elapsedTime += updateInterval;
}

function gameOfLifeUpdate(grid) {
  let nextGrid = JSON.parse(JSON.stringify(grid));
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let numNeighbors = countNeighbors(grid, r, c, 1, RED_CELL, PURPLE_CELL); // Include PURPLE_CELL as a live cell

      if ((grid[r][c] === 1 || grid[r][c] === RED_CELL || grid[r][c] === PURPLE_CELL) && (numNeighbors < 2 || numNeighbors > 3)) {
        nextGrid[r][c] = 0;
      } else if (grid[r][c] === 0 && numNeighbors === 3) {
        // If there is at least one PURPLE_CELL neighbor, the new cell will be a PURPLE_CELL
        nextGrid[r][c] = countNeighbors(grid, r, c, PURPLE_CELL) > 0 ? PURPLE_CELL : 1;
      } else if (grid[r][c] === 0 && Math.random() < 0.0005) {
        nextGrid[r][c] = RED_CELL;
      }

      // Add the condition to create new purple cells after 15 seconds and stop after 17 seconds
      if (elapsedTime >= 15000 && elapsedTime < 17000 && grid[r][c] === 0 && countTextNeighbors(grid, r, c) > 0) {
        nextGrid[r][c] = Math.random() < 0.1 ? PURPLE_CELL : nextGrid[r][c];
      }
    }
  }

  if (elapsedTime >= 15000) {
    return nextGrid;
  } else {
    drawAllCharacters(start_y, nextGrid);
    return nextGrid;
  }
}




// Create a function to draw all the characters on the matrix
function drawAllCharacters(start_y, matrix) {
  draw_character(letter_Y, start_x, start_y, matrix);
  draw_character(letter_I, start_x + 5 + space_between_characters, start_y, matrix);
  draw_character(letter_N, start_x + 10 + 2 * space_between_characters, start_y, matrix);
  draw_character(letter_R, start_x + 15 + 3 * space_between_characters + extra_space, start_y, matrix);
  draw_character(letter_E, start_x + 20 + 4 * space_between_characters + extra_space, start_y, matrix);
  draw_character(letter_N, start_x + 25 + 5 * space_between_characters + extra_space, start_y, matrix);
  draw_character(letter_L, start_x + 30 + 6 * space_between_characters + extra_space, start_y, matrix);
  draw_character(letter_O, start_x + 35 + 7 * space_between_characters + extra_space, start_y, matrix);
  draw_character(letter_N, start_x + 40 + 8 * space_between_characters + extra_space, start_y, matrix);
  draw_character(letter_G, start_x + 45 + 9 * space_between_characters + extra_space, start_y, matrix);
}


function countNeighbors(grid, row, col, ...cellTypes) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr !== 0 || dc !== 0) {
        const r = (row + dr + rows) % rows;
        const c = (col + dc + cols) % cols;
        if (cellTypes.includes(grid[r][c])) {
          count += 1;
        }
      }
    }
  }
  return count;
}


function displayGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isTextCell(r, c)) {
        fill(55, 150, 50);
      } else if (grid[r][c] === RED_CELL) {
        fill(255, 0, 0);
      } else if (grid[r][c] === PURPLE_CELL) {
        fill(128, 0, 128); // Set the purple cell color
      } else if (grid[r][c] === 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(c * cellSize, r * cellSize, cellSize, cellSize);
    }
  }
}



function isTextCell(row, col) {
  const letters = [letter_Y, letter_I, letter_N, letter_R, letter_E, letter_N, letter_L, letter_O, letter_N, letter_G];
  const start_x_values = [
    start_x,
    start_x + 5 + space_between_characters,
    start_x + 10 + 2 * space_between_characters,
    start_x + 15 + 3 * space_between_characters + extra_space,
    start_x + 20 + 4 * space_between_characters + extra_space,
    start_x + 25 + 5 * space_between_characters + extra_space,
    start_x + 30 + 6 * space_between_characters + extra_space,
    start_x + 35 + 7 * space_between_characters + extra_space,
    start_x + 40 + 8 * space_between_characters + extra_space,
    start_x + 45 + 9 * space_between_characters + extra_space,
  ];

  for (let i = 0; i < letters.length; i++) {
    for (let y = 0; y < letters[i].length; y++) {
      for (let x = 0; x < letters[i][y].length; x++) {
        if (letters[i][y][x] === "1" && row === start_y + y && col === start_x_values[i] + x) {
          return true;
        }
      }
    }
  }

  return false;
}

function countTextNeighbors(grid, row, col) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr !== 0 || dc !== 0) {
        const r = (row + dr + rows) % rows;
        const c = (col + dc + cols) % cols;
        if (isTextCell(r, c)) {
          count += 1;
        }
      }
    }
  }
  return count;
}
