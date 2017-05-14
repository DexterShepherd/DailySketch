const p5 = require('p5');

new p5(p => {
  let walker;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    walker = new Particle(p, p.createVector(0, 0));
    p.background(240);
    p.stroke(0, 10);
    p.noFill();
  }

  p.draw = function() {
    p.translate(p.width/2, p.height/2);
    walker.follow_noise(0.1, 10);
    for(let i = 0; i < 100; i++) {
      p.rotate(p.map(i, 0, 200, 0, p.PI));
      p.ellipse(walker.loc.x, walker.loc.y, 2, 2);
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

    // if(loc.dist(this.renderer.createVector(0, 0)) > 500) {
    //   this.loc = this.renderer.createVector(0, 0);
    // }

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
