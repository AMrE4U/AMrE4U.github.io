var lifespan = 200;
var count = 0;
var target;

function setup() {
    createCanvas(400, 300);
    //rocket = new Rocket();
    population = new Population();
    target = createVector(width / 2, 50);
}

function draw() {
    background(0);
    population.run();

    count++;
    if (count == lifespan) {
      population.evaluate();
      population.selection();
      //population = new Population();
      count = 0;
    }

    ellipse(target.x, target.y, 16, 16);
}
