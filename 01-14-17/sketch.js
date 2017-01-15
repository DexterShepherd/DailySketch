const p5 = require('p5');

new p5(p => {
  let palettes, particles;

  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    particles = [];

    for(let i = 0; i < 40; i++) {
      for(let j = 0; j < 40; j++) {
        particles.push(new Particle(p, p.createVector(i * 20, j * 20)));
      }
    }
    p.noStroke();
  }

  p.draw = function() {
    p.background(10, 50);
    for(let i = 0; i < particles.length - 1; i++) {
      particles[i].attract(p.createVector(p.width/2, p.height/2), {
        vel_limit: p.noise(i * 0.1) * 10,
        acc_scale: 0.1
      });
      particles[i].display([240, 
        p.map(particles[i].loc.dist(p.createVector(p.width/2, p.height/2)) * 10,
        0, 1000, 0, 50)], 1);
    }
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
      this.acc.mult(this.params.acc_scale || 0.7);

      this.acc.mult(-1);
      this.vel.add(this.acc)
      this.vel.limit(this.params.vel_limit || 1);
      this.loc.add(this.vel);
    }
    return this.loc;
  };

  this.display = function(fill, size) {
    this.renderer.fill(fill);
    this.renderer.rect(this.loc.x, this.loc.y, size, size);
  };
}

