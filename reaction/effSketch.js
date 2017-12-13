var grid, next;

var dA = 1.0;
var dB = 0.5;
var feed = .0367;//0.055;
var k = .0649;//0.062;

function setup() {
    createCanvas(200,200);
    //createCanvas(windowWidth, windowHeight);
    //pixelDensity(1);

    grid = [];
    for(i = 0; i < width * height; i++) {
      grid[i] = { a: 1, b: 0 };
    }

    var mid = (width / 2) + (width * height / 2);
    for(i = mid - 5; i < mid + 5; i++) {
      for(j = -5; j < 5; j++) {
        grid[i + (j * width)].b = 1;
      }
    }

    // for(i = 0; i < 100; i++) {
    //   var seed = random(grid);
    //   seed.b = 1;
    // }
    next = grid;

}

function draw() {
    //background(0);

    var a, na, b, nb;
    loadPixels();
    for (i = 0; i < grid.length; i++) {
      //console.log(i);
      a = grid[i].a;
      b = grid[i].b;
      na = a + (dA * laplaceA(i)) - (a * b * b) + (feed * (1 - a));
      nb = b + (dB * laplaceB(i)) + (a * b * b) - ((k + feed) * b);
      na = constrain(na, 0, 1);
      nb = constrain(nb, 0, 1);

      next[i] = { a: na, b: nb };

      var pix = i * 4;
      pixels[pix + 0] = na * 255;
      pixels[pix + 1] = na * 255;
      pixels[pix + 2] = na * 255;
      pixels[pix + 3] = 255;
    }
    updatePixels();
    grid = next;

    text(floor(frameRate()), 20, 20);
    //noLoop();
}

function laplaceA(i) {
  var sum = 0;
  sum += grid[i].a * -1;
  if(i % width != 0) {
    sum += grid[i-1].a * .2;
    if(i >= width){
      sum += grid[i-width-1].a * .05;
    }
    if(i < (grid.length - width)) {
      sum += grid[i+width-1].a * .05;
    }
  }
  if((i + 1) % width != 0){
    sum += grid[i+1].a * .2;
    if(i >= width){
      sum += grid[i-width+1].a * .05;
    }
    if(i < (grid.length - width)){
      sum += grid[i+width+1].a * .05;
    }
  }
  if(i >= width){
    sum += grid[i-width].a * .2;
  }
  if(i < (grid.length - width)){
    sum += grid[i+width].a * .2;
  }
  return sum;
}

function laplaceB(i) {
  var sum = 0;
  sum += grid[i].b * -1;
  if(i % width != 0) {
    sum += grid[i-1].b * .2;
    if(i >= width){
      sum += grid[i-width-1].b * .05;
    }
    if(i < (grid.length - width)) {
      sum += grid[i+width-1].b * .05;
    }
  }
  if((i + 1) % width != 0){
    sum += grid[i+1].b * .2;
    if(i >= width){
      sum += grid[i-width+1].b * .05;
    }
    if(i < (grid.length - width)){
      sum += grid[i+width+1].b * .05;
    }
  }
  if(i >= width){
    sum += grid[i-width].b * .2;
  }
  if(i < (grid.length - width)){
    sum += grid[i+width].b * .2;
  }
  return sum;
}
