// module aliases
let Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
let engine = Engine.create();
let world  = engine.world;

let particles = [];
let boundries = [];

function setup() {
  createCanvas(600, 600);
  fr = createP('');
  boundries.push(new Boundary(width / 2, height, width, 60, 0));
  boundries.push(new Boundary(40,500,200,30,45));
  boundries.push(new Boundary(560, 500, 200, 30, -45));
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle(random(width), random(0, height - 300), 2));
  }
  Engine.run(engine);
}

function draw() {
  background(51);
  //Engine.update(engine);
  for(let j = boundries.length - 1; j >= 0; j--) {
    boundries[j].show();
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].show();
    if(particles[i].isOffScreen()) {
      particles[i].removeFromWorld();
      particles.splice(i, 1);
    }
  }
  fr.html(floor(frameRate()));
}
