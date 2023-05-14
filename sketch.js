const numRows = 50;
const numCols = 50;
const cellSize = 10;
const updateInterval = 50;

let grid;

function setup() {
  createCanvas(numCols * cellSize, numRows * cellSize);
  grid = createRandomGrid(numRows, numCols);
  frameRate(1000 / updateInterval);
}

function draw() {
  background(255);
  displayGrid(grid);
  grid = gameOfLifeUpdate(grid);
}

function createRandomGrid(rows, cols) {
  let grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      grid[i][j] = random(1) < 0.2 ? 1 : 0;
    }
  }
  return grid;
}

function gameOfLifeUpdate(grid) {
  let nextGrid = JSON.parse(JSON.stringify(grid));
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let numNeighbors = countNeighbors(grid, r, c);

      if (grid[r][c] === 1 && (numNeighbors < 2 || numNeighbors > 3)) {
        nextGrid[r][c] = 0;
      } else if (grid[r][c] === 0 && numNeighbors === 3) {
        nextGrid[r][c] = 1;
      }
    }
  }
  return nextGrid;
}

function countNeighbors(grid, row, col) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr !== 0 || dc !== 0) {
        const r = (row + dr + rows) % rows;
        const c = (col + dc + cols) % cols;
        count += grid[r][c];
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
      if (grid[r][c] === 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(c * cellSize, r * cellSize, cellSize, cellSize);
    }
  }
}

// Add this function to handle mouse clicks
function mousePressed() {
  let row = Math.floor(mouseY / cellSize);
  let col = Math.floor(mouseX / cellSize);

  if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
    grid[row][col] = 1 - grid[row][col];
  }
}
