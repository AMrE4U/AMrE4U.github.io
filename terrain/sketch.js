var cols, rows, w, h;
var camX = 0;
var camY = 0;
var camZ = 0;
var scl = 20;
var flying = 0;

function setup() {
    //createCanvas(600,600, WEBGL);
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    fill(200);
    w = width;
    h = height;
    cols = w / scl;
    rows = h / scl;
}

// function keyPressed() {
//   switch (keyCode) {
//     case UP_ARROW:
//       camY += 1;
//       break;
//     case DOWN_ARROW:
//         camY -=1;
//         break;
//     case LEFT_ARROW:
//         camX -= 1;
//         break;
//     case RIGHT_ARROW:
//         camX += 1;
//         break;
//     case ALT:
//         camZ -= 1;
//         break;
//     case 32:
//         camZ += 1;
//         break;
//     default:
//
//   }
//   return false;
// }


function draw() {
    background(0);

    orbitControl();

    if(keyIsDown(UP_ARROW)) { camY += 1;}
    if(keyIsDown(DOWN_ARROW)) { camY -= 1;}
    if(keyIsDown(LEFT_ARROW)) { camX -= 1;}
    if(keyIsDown(RIGHT_ARROW)) { camX += 1;}
    if(keyIsDown(ALT)) { camZ -= 1;}
    if(keyIsDown(32)) { camZ += 1;}
    camera(camX,camY,camZ);

    ambientLight(100);
    //var dirY = (mouseY / height - 0.5) * 4;
    //var dirX = (mouseX / width - 0.5) * 4;
    directionalLight(150, 150, 150, 1, 1, 1);
    //noLoop();

    rotateX(radians(-60));
    translate(-w / 2, -h / 2, 0);

    // for(var y = 0; y < rows; y++){
    //   beginShape(TRIANGLE_STRIP);
    //   for(var x = 0; x < cols; x++){
    //     var xOff = x * .1;
    //     var yOff = y * .1;
    //     vertex(x * scl, y * scl, map(noise(xOff,yOff), 0, 1, -50, 50));
    //     vertex(x * scl, (y + 1) * scl, map(noise(xOff,(y + 1) * .1), 0, 1, -50, 50));
    //   }
    //   endShape();
    // }

    for(var y = 0; y < rows; y++){
      for(var x = 0; x < cols; x++){
        var xOff = x * .1;
        var yOff = (y + flying) * .1;
        push();
        translate(x * scl, y * scl, map(noise(xOff,yOff), 0, 1, -100, 100));
        box(scl,scl,scl);
        pop();
      }
    }

    //flying -= 0.1;
}
