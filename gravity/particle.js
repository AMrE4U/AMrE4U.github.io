'use strict';

class Particle {
  
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
  }

  applyGravity() {
    var grav = createVector(350 - this.pos.x, 300 - this.pos.y);
    grav.normalize();
    this.applyForce(grav);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    strokeWeight(4);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
}