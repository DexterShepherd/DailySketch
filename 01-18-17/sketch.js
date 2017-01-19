const p5 = require('p5');

new p5(p => {
  let particles;


  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    particles = [];
    for(let i = 0; i < 200; i++) {
      particles[i] = new Particle(p, p.createVector(p.random(p.height), p.random(p.width)));
    }
    p.background(240);
  }

  p.draw = function() {
    p.noStroke();
    particles.forEach( (particle) => {
      particle.follow_noise(0.01, 100);
      //particle.display([10, 10], 3);
    });
    
    particles.forEach( (particleA, i) => {
      let closest = 0; 
      let dist = 800;

      particles.forEach((particleB, j) => {
        if(i != j) {
          if (particleA.loc.dist(particleB.loc) < dist) {
            closest = particleB;
            dist = particleA.loc.dist(closest.loc);
          }
        }
      });
      p.stroke(10, p.map(dist, 0, 200, 20, 0));
      p.line(particleA.loc.x, particleA.loc.y, closest.loc.x, closest.loc.y);
    });

  }
});

var Particle = function(renderer, loc, params) {
  this.params = params || {}
  this.renderer = renderer;
  this.loc = loc;
  this.acc = this.params.acc || this.renderer.createVector(0, 0);
  this.vel = this.params.vel || this.renderer.createVector(0, 0);
  
  // attract the particle towards a point and
  // returns the new particle location
  //
  // target: p5.Vector
  // params: {
  //   acc_scale: number,
  //   vel_limit: number
  // }
  //
  this.attract = function(target, params) {
    this.params = Object.assign({}, this.params, params);
    this.acc = target.sub(this.loc);
    this.acc.normalize();
    this.acc.mult(this.params.acc_scale || 0.5);

    this.vel.add(this.acc)
    this.vel.limit(this.params.vel_limit || 9);
    this.loc.add(this.vel);
    return this.loc;
  };

  // repels the particle away from a point and
  // return the new particle location
  //
  // target: p5.Vector
  // params: {
  //   acc_scale: number,
  //   vel_limit: number
  // }
  //
  this.repel = function(target, params) {
    this.params = Object.assign({}, this.params, params);
    if ( this.loc.dist(target) < 50 ) {
      this.acc = target.sub(this.loc);
      this.acc.normalize();
      this.acc.mult(this.params.acc_scale || 0.5);

      this.acc.mult(-1);
      this.vel.add(this.acc)
      this.vel.limit(this.params.vel_limit || 9);
      this.loc.add(this.vel);
    }
    return this.loc;
  };

  this.follow_noise = function(scale, strength, params) {
    this.params = Object.assign({}, this.params, params);

    if((this.loc.x > this.renderer.width) ||
      (this.loc.x < 0) ||
      (this.loc.y > this.renderer.height) ||
      (this.loc.y < 0)) {
      //TODO this name is dumb, just call it p
      this.loc = this.renderer.createVector(this.renderer.random(this.renderer.width),
                                            this.renderer.random(this.renderer.height));
    }

    if(this.params.noise) {
      let angle = this.params.noise(loc.x, loc.y) * strength;
    } else {
      let angle = this.renderer.noise(this.loc.x * scale, this.loc.y * scale) * strength;
    }

    let angle = this.renderer.noise(this.loc.x * scale, this.loc.y * scale) * strength;
    this.acc = this.renderer.createVector(this.renderer.cos(angle), this.renderer.sin(angle));
    this.acc.mult(this.params.acc_scale || 0.2);
    this.vel.add(this.acc)
    this.vel.limit(this.params.vel_limit || 1);
    this.loc.add(this.vel)
  }

  this.display = function(fill, size) {
    this.renderer.fill(fill);
    this.renderer.ellipse(this.loc.x, this.loc.y, size, size);
  };
}
