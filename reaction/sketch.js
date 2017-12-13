var grid, next;

var dA = 1.0;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

function setup() {
    createCanvas(400,400);
    //createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    grid = [];
    next = [];
    for (x = 0; x < width; x++) {
      grid[x] = [];
      for (y = 0; y < height; y++) {
        grid[x][y] = { a: 1, b: 0 };
      }
    }
    next = grid;

    midX = floor(width / 2);
    midY = floor(height / 2);
    for(var i = -5; i < 5; i++) {
      for(var j = -5; j < 5; j++) {
        grid[midX + i][midY + j].b = 1;
      }
    }
    grid[floor(width / 2)][floor(height / 2)].b = 1;

}

function draw() {
    //background(0);

    for (x = 1; x < width-1; x++) {
      for (y = 1; y < height-1; y++) {
        var a = grid[x][y].a;
        var b = grid[x][y].b;
        next[x][y].a = a + (dA * laplaceA(x, y)) - (a * b * b) + (feed * (1 - a));
        next[x][y].b = b + (dB * laplaceB(x, y)) + (a * b * b) - ((k + feed) * b);

        next[x][y].a = constrain(next[x][y].a, 0, 1);
        next[x][y].b = constrain(next[x][y].b, 0, 1);
      }
    }

    grid = next;

    loadPixels();
    for (x = 0; x < width; x++) {
      for (y = 0; y < height; y++) {
        var pix = (x + y * width) * 4;
        var a = grid[x][y].a;
        var b = grid[x][y].b;
        // var c = floor((a-b)*255);
        // c = constrain(c, 0, 255);
        // pixels[pix + 0] = c;
        // pixels[pix + 1] = c;
        // pixels[pix + 2] = c;
        // pixels[pix + 3] = 255;

        pixels[pix + 0] = a * 255;
        pixels[pix + 1] = a * 255;
        pixels[pix + 2] = a * 255;
        pixels[pix + 3] = 255;
      }
    }
    updatePixels();

    text(floor(frameRate()), 20, 20);
    //noLoop();
}

function laplaceA(x, y) {
  var sumA = 0;

  sumA += grid[x][y].a * -1;
  sumA += grid[x-1][y].a * .2;
  sumA += grid[x+1][y].a * .2;
  sumA += grid[x][y-1].a * .2;
  sumA += grid[x][y+1].a * .2;
  sumA += grid[x-1][y-1].a * .05;
  sumA += grid[x+1][y-1].a * .05;
  sumA += grid[x+1][y+1].a * .05;
  sumA += grid[x-1][y+1].a * .05;

  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;

  sumB += grid[x][y].b * -1;
  sumB += grid[x-1][y].b * .2;
  sumB += grid[x+1][y].b * .2;
  sumB += grid[x][y-1].b * .2;
  sumB += grid[x][y+1].b * .2;
  sumB += grid[x-1][y-1].b * .05;
  sumB += grid[x+1][y-1].b * .05;
  sumB += grid[x+1][y+1].b * .05;
  sumB += grid[x-1][y+1].b * .05;

  return sumB;
}
