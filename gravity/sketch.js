let world = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    //Add central body, large mass
    world.push(new Particle(width/2, height/2, 1000, true));

    //Add the smaller orbiting bodies
    for ( let i = 0; i < 3; i++) {
        world.push(new Particle(random(width), random(height), random(1,10)));
    }
}

function draw() {
    background(0,0,0,10);

    //Calculate the acceleration applied to all particles in a static state
    for(let i = world.length - 1; i >= 0; i--) {
        world[i].calcGravity(world);
    }

    //Then update all the particles to their new positions
    for(let i = world.length - 1; i >= 0; i--) {
        world[i].update();
        world[i].show();
    }
}

function mousePressed() {
  world.push(new Particle(mouseX, mouseY, 10, true));
}
