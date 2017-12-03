var balls = [];
var count = 30;

function setup() {
    createCanvas(windowWidth,windowHeight);
    for (var i = 0; i < count; i++) {
        balls[i] = new Ball();
    }
}


function draw() {
    //noLoop();
    //frameRate(1);
    background(0);
    for (var i = 0; i < count; i++) {
        balls[i].update();
        balls[i].collide();
        balls[i].show();
    }
}