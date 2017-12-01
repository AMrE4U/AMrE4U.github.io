// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/BjoM9oKOAKY

function Particle(x, y, r) {
  this.r = r;

  var options = {
    friction: 0,
    restitution: .95
  }
  this.body = Bodies.circle(x, y, r, options);
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    //var angle = this.body.angle;

    // push();
    // translate(pos.x, pos.y);
    // //rotate(angle);
    // stroke(255);
    // //ellipse(0, 0, this.r * 2);
    // point(0,0);
    // pop();
    stroke(255);
    //point(pos.x, pos.y);
    ellipse(pos.x, pos.y, this.r * 2);
  }

  this.isOffScreen = function() {
    var pos = this.body.position;
    return (pos.y > height + 100);
  }

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }

}
