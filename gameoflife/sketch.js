// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Modified by Ronald Henderson - textured the game onto a 3d torus

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let gof; //game of life graphics context
let angle = 0;
let bkcolor;

function setup() {
  //createCanvas(600, 400);
  createCanvas(windowWidth, windowHeight, WEBGL);

  gof = createGraphics(resolution * 80, resolution * 80);
  //frameRate(2);
  cols = floor(gof.width / resolution);
  rows = floor(gof.height / resolution);

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = (random() < .1 ? 1 : 0);
    }
  }

  //Random background color for torus
  bkcolor = color(floor(random(100,256)), floor(random(100,256)), floor(random(100,256)))
}

function draw() {
  background(255);
  gof.background(bkcolor);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        gof.fill(0);
        gof.stroke(255);
        gof.rect(x, y, resolution - 1, resolution - 1);
        //ellipse(x, y, resolution, resolution);
      }
    }
  }

  rotateX(angle);
  rotateY(angle * .2);
  rotateZ(angle * .5);
  angle += .01;

  ambientLight(100);
  directionalLight(200, 200, 200, 0, 1, 0);

  texture(gof);
  torus(200, 100, 48, 32);
  //image(gof, 0, 0);

  let next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }

    }
  }

  grid = next;



}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
