var balls = [];
var count = 10;

function setup() {
    createCanvas(400,400);
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