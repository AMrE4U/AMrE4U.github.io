var lifespan = 400;
var count = 0;
var maxforce = 0.2;
var target;
var gen;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
    createCanvas(400, 300);
    //rocket = new Rocket();
    population = new Population();
    target = createVector(width / 2, 50);

    gen = createP();
    gen.html(0);
}

function draw() {
    background(0);
    population.run();

    count++;
    if (count == lifespan) {
      population.evaluate();
      population.selection();
      gen.html(population.gen);
      //population = new Population();
      count = 0;
      //noLoop();
    }

    rect(rx, ry, rw, rh);
    ellipse(target.x, target.y, 16, 16);
}
