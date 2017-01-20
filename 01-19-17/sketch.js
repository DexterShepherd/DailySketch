const p5 = require('p5');

new p5(p => {
  let particles, particles2, particles3, particles4;


  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    particles = [];
    particles2 = [];
    particles3 = [];
    particles4 = [];
    for(let i = 0; i < 100; i++) {
      particles[i] = new Particle(p, p.createVector(p.random(300, 500), p.random(300, 500)));
      particles2[i] = new Particle(p, p.createVector(p.random(300, 500), p.random(300, 500)));
      particles3[i] = new Particle(p, p.createVector(p.random(300, 500), p.random(300, 500)));
      particles4[i] = new Particle(p, p.createVector(p.random(300, 500), p.random(300, 500)));
    }
    p.background(235);
  }

  p.draw = function() {
    p.noStroke();
    p.translate(0, p.frameCount* 0.05)
    particles.forEach( (particle) => {
      particle.follow_noise(0.01, 10);
    });
    
    particles2.forEach( (particle) => {
      particle.follow_noise(0.04, 50);
    });

    particles3.forEach( (particle) => {
      particle.follow_noise(0.07, 15);
    });

    particles4.forEach( (particle) => {
      particle.follow_noise(0.01, 15);
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
      p.stroke(10, p.map(dist, 0, 20, 20, 0));
      if(dist < 20) {
        p.line(particleA.loc.x, particleA.loc.y, closest.loc.x, closest.loc.y);
      }
    });

    particles2.forEach( (particleA, i) => {
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

      p.stroke(0, 50, 70, p.map(dist, 0, 20, 10, 0));
      if(dist < 20) {
        p.line(particleA.loc.x, particleA.loc.y, closest.loc.x, closest.loc.y);
      }
    });

    particles3.forEach( (particleA, i) => {
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

      p.stroke(100, 0, 30, p.map(dist, 0, 10, 20, 0));
      if(dist < 10) {
        p.line(particleA.loc.x, particleA.loc.y, closest.loc.x, closest.loc.y);
      }
    });

    particles3.forEach( (particleA, i) => {
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

      p.stroke(255, p.map(dist, 0, 50, 20, 0));
      if(dist < 50) {
        p.line(particleA.loc.x, particleA.loc.y, closest.loc.x, closest.loc.y);
      }
    });

  }
});

var Particle = function(renderer, loc, params) {
  this.params = params || {}
  this.renderer = renderer;
  this.loc = loc;
  this.acc = this.params.acc || this.renderer.createVector(0, 0);
  this.vel = this.params.vel || this.renderer.createVector(0, 0);
  this.flag = false;
  
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

    if((this.loc.x > 600) ||
      (this.loc.x < 200) ||
      (this.loc.y > 600) ||
      (this.loc.y < 200)) {
      //TODO this name is dumb, just call it p
      this.loc = this.renderer.createVector(this.renderer.random(300, 500),
                                            this.renderer.random(300, 500));
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

  this.reset = function() {
    this.loc = this.renderer.createVector(this.renderer.random(this.renderer.width),
                                          this.renderer.random(this.renderer.height));
  }
}
