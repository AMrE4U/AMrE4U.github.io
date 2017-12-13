let res = 30;
let angle = 0;

function setup() {
  let c = createCanvas(windowWidth, windowHeight, WEBGL);
  //let c = createCanvas(400, 400, WEBGL);
  c.center();
}

function draw() {
  background(0);
  camera(height,height,-height,0,0,0,0,0,1);
  //rotateX(angle * .1);
  rotateZ(-angle * .05);

  normalMaterial();
  let h = 0;
  for(let x = 0; x < width; x += res) {
    for(let y = 0; y < height; y += res) {
      let d = dist(x, y, width / 2, height / 2);
      let offset = map(d, 0, 200, 2, -2);
      let a = angle + offset;
      h = 10 + floor(map(sin(a), -1, 1, 10, 200));
      push();
      translate(x - width / 2, y - height / 2);
      box(res, res, h);
      pop();
    }
  }
  //noLoop();
  angle += .05;
}
