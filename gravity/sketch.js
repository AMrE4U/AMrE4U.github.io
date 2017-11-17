let world = [];
let visualPaths = true;

function setup() {
    let canvas = createCanvas(windowWidth - 30, windowHeight - 50);
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

    let visualPathsButton = createButton('Show Vectors');
    visualPathsButton.mousePressed(() => {updateVisualPaths(visualPathsButton);});
    divElem.child(visualPathsButton);

    let grid = createButton('Generate Grid');
    grid.mousePressed(generateGrid);
    divElem.child(grid);

    let frameCount = createP();
    frameCount.id('frameCount');
    frameCount.attribute('style', 'display:inline');
    divElem.child(frameCount);
}

function draw() {
    if(visualPaths) {
      background(0,0,0,10);
    } else {
      background(0);
    }

    //Calculate the acceleration applied to all particles in a static state
    //for(let i = world.length - 1; i >= 0; i--) {
    // for(let i = 0; i < world.length; i++) {
    //     world[i].calcGravity(world);
    // }
    for(let i = 0; i < world.length - 1; i++) {
        world[i].efficientCalcGravity(world, i + 1);
    }

    //Then update all the particles to their new positions
    for(let i = world.length - 1; i >= 0; i--) {
        world[i].update();
        world[i].show();
        if(world[i].delete){
          world.splice(i, 1);
        }
    }

    select('#frameCount').html(floor(frameRate()));
    //noLoop();
}

function addParticle() {
  world.push(new Particle(mouseX, mouseY, random(1,10), false));
}

function resetWorld() {
  background(0);
  world = [];
  world.push(new Particle(width/2, height/2, 1000, true));
}

function updateVisualPaths(button) {
  background(0);
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
