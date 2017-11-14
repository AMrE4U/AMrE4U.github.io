'use strict';

//Define the gravitational constant
let G = 1;

class Particle {

  constructor(x, y, m, center) {
    this.pos = createVector(x, y);
    if(center) {
      this.vel = createVector(0,0);
    } else {
      this.vel = p5.Vector.random2D().normalize();
    }

    this.acc = createVector(0, 0);
    this.mass = m;
  }

  calcGravity(world) {
    //Find the total acceleration felt by the particle from all objects in the system
    //F = G * ((m1 * m2)/(r * r))
    for(let i = world.length - 1; i >= 0; i--) {
      if(world[i] != this) {
        let grav = createVector(world[i].pos.x - this.pos.x, world[i].pos.y - this.pos.y);
        let r = grav.mag();
        grav.normalize();

        let F = G * ((world[i].mass * this.mass) / (r * r));
        grav.mult(F/this.mass);
        this.acc.add(grav);
      }
    }
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
