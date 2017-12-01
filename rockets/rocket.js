function Population() {
  this.rockets = [];
  this.popsize = 25;
  this.matingpool = [];
  this.gen = 0;

  for(var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {
    var maxfit = 0;
    for(var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    for(var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    //console.log(this.rockets);

    this.matingpool = [];
    for(var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;

      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
    this.gen++;
  }

  this.run = function() {
    for(var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxforce);
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    // var mid = floor(random(this.genes.length));
    // for (var i = 0; i < this.genes.length; i++) {
    //   if(i > mid) {
    //     newgenes[i] = this.genes[i];
    //   } else {
    //     newgenes[i] = partner.genes[i];
    //   }
    // }

    // for (var i = 0; i < this.genes.length; i++) {
    //   newgenes[i] = p5.Vector.add(this.genes[i], partner.genes[i]);
    //   newgenes[i].setMag(maxforce);
    // }

    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.5){
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }

    return new DNA(newgenes);
  }

  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if(random(1) < .001) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
}

function Rocket(dna) {
  this.pos = createVector(width/2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.complete = false;
  this.crashed = false;
  if(dna){
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {

    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if(!this.complete && d < 10){
      this.complete = true;
      this.pos = target.copy();
      this.fitness = count;
    }

    if (!this.crashed && this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
      this.crashed = true;
      this.fitness = count;
    }
    if (!this.crashed && this.pos.x < 0 || this.pos.x > width || this.pos.y < 0) {// || this.pos.y > height){
      this.crashed = true;
      this.fitness = count;
    }

    this.applyForce(this.dna.genes[count]);
    if(!this.complete && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    var adjDist = map(d, 0, width + height, width + height, 0);

    if(this.complete){
      this.fitness = adjDist * (lifespan/this.fitness);
    } else if(this.crashed) {
      this.fitness = adjDist * (this.fitness / lifespan);
    } else {
      this.fitness = adjDist;
    }
  }

  this.show = function() {

    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}
