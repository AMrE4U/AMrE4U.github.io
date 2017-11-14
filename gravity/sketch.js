var particles = [];

function setup() {
    createCanvas(700, 600);
    background(0);
    for ( var i = 0; i < 3; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
    
}

function draw() {
    background(0,0,0,10);
    for(var i = particles.length - 1; i >= 0; i--) {
        particles[i].applyGravity();
        particles[i].update();
        particles[i].show();
    }
    
    //push();
    //fill(255)
    //textSize(24);
    //text(particles.length, 10, 30);
    //text(floor(frameRate()), 10, 60);
    //pop();
}