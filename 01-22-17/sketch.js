const p5 = require('p5');

new p5(p => {
  let img, particles, count;

  p.preload = function() {
    img = p.loadImage('https://farm9.staticflickr.com/8695/28568124855_d4fb57c3c5_b.jpg');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    img.resize(190, 0);
    img.loadPixels();
    particles = [];
    for(let i = 0; i < img.width; i++) {
      for(let j = 0; j < img.height; j++) {
        let index = (i * 4) + (j * img.width * 4);
        particles[index] = new Particle(p, p.createVector(i * 4, j * 4), p.map(i, 0, img.width, 0, 50), 0.2, [
          img.pixels[index],
          img.pixels[index + 1],
          img.pixels[index + 2],
          20
        ], {
          lifespan: p.random(100, 350)
        });
      }
    }
    count = 0;
    p.noStroke();
    p.background(250);
  }

  p.draw = function() {
    img.loadPixels();
    p.translate(10, 100);
    particles.forEach( particle => {
      particle.follow_noise();
      particle.display(0, 1);
    })

    particles = particles.filter( particle => {
      return !particle.cleanup;
    })

    if (particles.length == 0) {
      particles = [];
      for(let i = 0; i < img.width; i++) {
        for(let j = 0; j < img.height; j++) {
          let index = (i * 4) + (j * img.width * 4);
          particles[index] = new Particle(p, p.createVector(i * 4, j * 4), p.map(img.pixels[index], 0, 255, 50, 0), 0.05, [
            img.pixels[index],
            img.pixels[index + 1],
            img.pixels[index + 2],
            25
          ], {
            lifespan: p.random(50, 250)
          });
        }
      }
    }

    //if(p.frameCount < 12000) {
      //if( p.frameCount % 10 == 0) {
        //p.save(count + '.jpg') 
        //count++;
      //}
    //}
  }
});

var Particle = function(renderer, loc, strength, scale, col, params) {
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
  this.col = col;
  
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
      this.renderer.fill(this.col);
      if(Math.floor(this.life % (this.lifespan/20)) == 0) {
        this.renderer.ellipse(this.loc.x, this.loc.y, size, size);
      }
      //this.renderer.ellipse(this.loc.x, this.loc.y, size, size);
    }
  };
}
