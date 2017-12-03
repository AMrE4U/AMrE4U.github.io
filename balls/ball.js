function Ball() {
    this.r = 20;
    this.pos = createVector(random(this.r, width - this.r),
                            random(this.r, height - this.r));
    this.vel = p5.Vector.random2D().mult(2);
    this.c = color(random(100,255), random(100,255), random(100,255));
    
    this.update = function() {
        this.pos.add(this.vel);
        this.checkEdges();
    }
    
    this.collide = function() {
        for (var i = 0; i < count; i++) {
            if(balls[i] !== this) {
                var d = balls[i].pos.dist(this.pos);
                if(d <= (balls[i].r + this.r)) {
                    
                    //I think repositioning the balls to ensure they are not within each others r is a good idea
                    var chgDist = (balls[i].r + this.r) - d;
                    this.pos.add(p5.Vector.mult(this.vel, -1).mult(chgDist));
                    balls[i].pos.add(p5.Vector.mult(balls[i].vel, -1).mult(chgDist));
                    
                    var reflection = p5.Vector.sub(this.pos, balls[i].pos);
                    reflection = reflection.normalize();
                    
                    var dotA = p5.Vector.dot(this.vel, reflection);
                    var dotB = p5.Vector.dot(balls[i].vel, reflection);
                    
                    this.vel.add(p5.Vector.mult(reflection, (dotB - dotA)));
                    balls[i].vel.add(p5.Vector.mult(reflection, (dotA - dotB)));
                }
            }
        }
    }
    
    this.checkEdges = function() {
        if(this.pos.x <= 0 + this.r) {
            this.vel.x *= -1;
            this.pos.x = this.r;
        }
        if (this.pos.x >= width - this.r) {
            this.vel.x *= -1;
            this.pos.x = width - this.r;
        }
        if (this.pos.y <= 0 + this.r) {
            this.vel.y *= -1;
            this.pos.y = this.r;
        }
        if (this.pos.y >= height - this.r) {
            this.vel.y *= -1;
            this.pos.y = height - this.r;
        }
    }
    
    this.show = function() {
        fill(this.c);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}