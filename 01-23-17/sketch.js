const p5 = require('p5');

new p5(p => {
  let particles, particlesB;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    particles = [];
    p.noStroke();
    p.background(253);
  }

  p.draw = function() {
    let radius = 100;
    p.translate(p.width/2, p.height/2);

    if(true) {
      for(let i = 0; i < 5; i++) {
        let x = p.sin(p.frameCount * 0.01) * radius + p.random(p.noise(p.sin(p.frameCount * 0.01) * radius * 0.05) * -5, p.noise(p.sin(p.frameCount * 0.01) * radius* 0.05) * 5);
        let y = p.cos(p.frameCount * 0.01) * radius + p.random(p.noise(p.cos(p.frameCount * 0.01) * radius * 0.05) * -5, p.noise(p.cos(p.frameCount * 0.01) * radius * 0.05) * 5);
        //particles.push(new Particle(p, p.createVector(x + y, x + y), p.map(x + y, -2 * radius, 2 * radius, 5, 20), p.random(0.05, p.map(x + y, -2 * radius, 2 * radius, 0.05, 0.1)), {
          //lifespan: Math.floor(p.random(10, 250))
        //}));
        particles.push(new Particle(p, p.createVector(x, y), 30, p.random(0.05, p.map(x + y, -2 * radius, 2 * radius, 0.01, 0.2)), {
          lifespan: Math.floor(p.random(10, 300))
        }));
      }
    }

    particles.forEach( particle => {
      particle.follow_noise();
      particle.display(0, 1);
    });

    particles = particles.filter( particle => {
      return !particle.cleanup;
    })

  }
});

var Particle = function(renderer, loc, strength, scale, params) {
  this.params = params || {}
  this.renderer = renderer;
  this.loc = loc;
  this.acc = this.params.acc || this.renderer.createVector(0, 0);
  this.vel = this.params.vel || this.renderer.createVector(0, 0);
  this.out_of_bounds = false;
  this.cleanup = false;
  this.lifespan = this.params.lifespan;
  this.life = this.params.lifespan;

  this.strength = strength;
  this.scale = scale;
  
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

  this.follow_noise = function(params) {
    this.params = Object.assign({}, this.params, params);

    if(this.params.reset_out_of_bounds) {
      if((this.loc.x > this.renderer.width) ||
        (this.loc.x < 0) ||
        (this.loc.y > this.renderer.height) ||
        (this.loc.y < 0)) {
        //TODO this name is dumb, just call it p
        this.loc = this.renderer.createVector(this.renderer.random(this.renderer.width),
                                              this.renderer.random(this.renderer.height));
      } else {
        this.out_of_bounds = true; 
      }
    }
    // don't calculate if off screen or dead
    if((!this.out_of_bounds) && (this.life > 0)) {
      if(this.params.noise) {
        let angle = this.params.noise(loc.x, loc.y) * this.strength;
      } else {
        let angle = this.renderer.noise(this.loc.x * this.scale, this.loc.y * this.scale) * this.strength;
      }

      let angle = this.renderer.noise(this.loc.x * this.scale, this.loc.y * this.scale) * this.strength;
      this.acc = this.renderer.createVector(this.renderer.cos(angle), this.renderer.sin(angle));
      this.acc.mult(this.params.acc_scale || 0.2);
      this.vel.add(this.acc)
      this.vel.limit(this.params.vel_limit || 1);
      this.loc.add(this.vel)
      this.life -= 1;
    } else {
      this.cleanup = true; 
    }
  }

  this.display = function(fill, size) {
    if(this.life > 0) {
      //this.renderer.fill(fill, this.renderer.map(this.life, this.lifespan, 0, 255, 0));
      this.renderer.fill(fill, 25);
      if(Math.floor(this.life % (this.lifespan/20)) == 0) {
        this.renderer.ellipse(this.loc.x, this.loc.y, size, size);
      }
      //this.renderer.ellipse(this.loc.x, this.loc.y, size, size);
    }
  };
}

