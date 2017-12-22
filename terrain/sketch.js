var cols, rows, w, h;
var camX, camY, camZ;
var scl = 40;
var flyingX = 0;
let flyingY = 0;

let followMouse = false;
let lookAngleTheta = 8;
let lookAnglePhi = 98;

function setup() {
    //createCanvas(600,600, WEBGL);
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    fill(200);
    w = 4000;//width;
    h = 4000;//height;
    cols = w / scl;
    rows = h / scl;

    camX = w/2;
    camY = h/2;
}

function mouseClicked() {
  followMouse = !followMouse;
  if(followMouse){
    document.getElementsByTagName("body")[0].style.cursor = "none";
  } else {
    document.getElementsByTagName("body")[0].style.cursor = "crosshair";
  }
}

function mouseMoved(event) {
  //console.log(event.movementX, event.movementY);
  if(followMouse){
    lookAngleTheta += event.movementX;
    lookAnglePhi += event.movementY;
  }
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

    //orbitControl();

    //Get the direction we are looking
    let lookAt = createVector(
      100*sin(radians(lookAnglePhi))*cos(radians(lookAngleTheta)),
      100*sin(radians(lookAnglePhi))*sin(radians(lookAngleTheta)),
      100*cos(radians(lookAnglePhi))
    );
    lookAt.normalize();


    // if(keyIsDown(UP_ARROW)) { camY += 1;}
    // if(keyIsDown(DOWN_ARROW)) { camY -= 1;}
    // if(keyIsDown(LEFT_ARROW)) { camX -= 1;}
    // if(keyIsDown(RIGHT_ARROW)) { camX += 1;}
    // if(keyIsDown(ALT)) { camZ -= 1;}
    // if(keyIsDown(32)) { camZ += 1;}

    //asdw controls, want to move in the direction we are looking
    //move forward "w"
    if(keyIsDown(87)) {
      flyingX += lookAt.x;
      flyingY += lookAt.y;
    }
    //move backward "s"
    if(keyIsDown(83)) {
      flyingX -= lookAt.x;
      flyingY -= lookAt.y;
    }
    //strafe left "a"
    if(keyIsDown(65)) {
      flyingX += lookAt.y;
      flyingY -= lookAt.x;
    }
    //strafe right "d"
    if(keyIsDown(68)) {
      flyingX -= lookAt.y;
      flyingY += lookAt.x;
    }

    ambientLight(100);
    //var dirY = (mouseY / height - 0.5) * 4;
    //var dirX = (mouseX / width - 0.5) * 4;
    directionalLight(150, 150, 150, -1, -1, 0);
    //noLoop();

    //rotateX(radians(60));
    //translate(-w / 2, -h / 2, 0);

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

    // push();
    // translate(0,100,0);
    // fill(255,0,0);
    // cylinder(2,200);
    // pop();
    // push();
    // translate(0,0,100);
    // rotateX(radians(90));
    // fill(0,255,0);
    // cylinder(2,200);
    // pop();
    // push();
    // translate(100,0,0);
    // rotateZ(radians(90));
    // fill(0,0,255);
    // cylinder(2,200);
    // pop();


    //normalMaterial();

    // push();
    // translate(w/2, h/2, 200);
    // sphere(scl);
    // pop();

    for(var y = 0; y < rows; y++){
      for(var x = 0; x < cols; x++){
        var xOff = (x + floor(flyingX)) * .1;
        var yOff = (y + floor(flyingY)) * .1;
        push();
        let h = floor(map(noise(xOff,yOff), 0, 1, 1, 10));
        translate(x * scl, y * scl, 0);
        box(scl, scl, scl * h);
        pop();
        if(y == rows / 2 && x == cols / 2){
          camZ = (scl * (h + 1));
        }
      }
    }

    //Place the camera and look in the correct direction
    camera(camX,camY,camZ,
           camX + lookAt.x, camY + lookAt.y,camZ + lookAt.z,
           0,0,-1);
}
