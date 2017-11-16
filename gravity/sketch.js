let world = [];
let visualPaths = false;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.mousePressed(addParticle);
    background(0);

    //Add central body, large mass
    world.push(new Particle(width/2, height/2, 1000, true));

    //Add the smaller orbiting bodies
    for ( let i = 0; i < 3; i++) {
        world.push(new Particle(random(width), random(height), random(1,10)));
    }

    let divElem = select('#controls');
    let reset = createButton('Reset');
    reset.mousePressed(resetWorld);
    divElem.child(reset);

    let visualPathsButton = createButton('Show Paths');
    visualPathsButton.mousePressed(() => {updateVisualPaths(visualPathsButton);});
    divElem.child(visualPathsButton);

    let grid = createButton('Generate Grid');
    grid.mousePressed(generateGrid);
    divElem.child(grid);
}

function draw() {
    if(visualPaths) {
      background(0,0,0,10);
    } else {
      background(0);
    }

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

function addParticle() {
  world.push(new Particle(mouseX, mouseY, random(1,10), false));
}

function resetWorld() {
  world = [];
  world.push(new Particle(width/2, height/2, 1000, true));
}

function updateVisualPaths(button) {
  visualPaths = !visualPaths;
  if(visualPaths){
    button.html("Show Vectors");
  } else {
    button.html("Show Paths");
  }
}

function generateGrid() {
  background(0);
  world = [];
  visualPaths = true;
  let count = 20;
  for (let i = count; i < width; i += width / count){
    for (let j = count; j < height; j += height / count){
      world.push(new Particle(i,j,10,true));
    }
  }
}
