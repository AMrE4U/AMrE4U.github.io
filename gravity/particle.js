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
    this.vecLines = [];
    this.delete = false;
  }

  calcGravity(world) {
    //Find the total acceleration felt by the particle from all objects in the system
    //F = G * ((m1 * m2)/(r * r))
    //for(let i = world.length - 1; i >= 0; i--) {
    for(let i = 0; i < world.length; i++) {
      if(world[i] != this) {
        let grav = createVector(world[i].pos.x - this.pos.x, world[i].pos.y - this.pos.y);
        let r = max(10,grav.mag());
        grav.normalize();

        let F = G * ((world[i].mass * this.mass) / (r * r));

        this.applyForce(F, grav);
        // grav.mult(F/this.mass);
        // this.acc.add(grav);
        // this.vecLines.push(grav);
      }
    }
  }

  efficientCalcGravity(world, startIndex) {
    //Find the total acceleration felt by the particle from all objects in the system
    //F = G * ((m1 * m2)/(r * r))
    for(let i = startIndex; i < world.length; i++) {
      let grav = createVector(world[i].pos.x - this.pos.x, world[i].pos.y - this.pos.y);
      let r = max(10,grav.mag());
      grav.normalize();

      let F = G * ((world[i].mass * this.mass) / (r * r));

      world[i].applyForce(F, p5.Vector.mult(grav, -1));
      this.applyForce(F, grav);
    }
  }

  applyForce(force, direction) {
    direction.mult(force/this.mass);
    this.acc.add(direction);
    this.vecLines.push(direction);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.checkEdges();
  }

  checkEdges() {
    if(this.pos.x < -width || this.pos.x > 2 * width) {
      this.delete = true;
    } else if(this.pos.y < -height || this.pos.y > 2 * height) {
      this.delete = true;
    }
  }

  show() {
    strokeWeight(4);
    stroke(255);
    point(this.pos.x, this.pos.y);

    if(!visualPaths) {
      strokeWeight(1);
      stroke(255, 0, 0);
      for (let v of this.vecLines) {
        v.mult(1000);
        line(this.pos.x, this.pos.y, this.pos.x + v.x, this.pos.y + v.y);
      }

      stroke(0,255,0);
      line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 50, this.pos.y + this.vel.y * 50);
    }
    this.vecLines = [];
  }
}
