const p5 = require('p5');

new p5(p => {
  let img_scale, scale_factor, particles;

  p.preload = function() {
    //img_scale = p.loadImage('https://farm9.staticflickr.com/8695/28568124855_d4fb57c3c5_b.jpg');
    //img_scale = p.loadImage('http://i.imgur.com/ucfN3bl.jpg');
    //img_scale = p.loadImage('http://i.imgur.com/YY3bLP7.jpg');
    img_scale = p.loadImage('http://i.imgur.com/nWQOCjB.jpg');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noStroke();
    scale_factor = 12;
    img_scale.resize(600 / scale_factor, 600 / scale_factor);
    img_scale.loadPixels();
    particles = [];

    for(let i = 0; i < img_scale.width; i++) {
      for(let j = 0; j < img_scale.height; j++) {
        let index = (i * 4) + (j * img_scale.width * 4);
        particles[index] = new Particle(p, p.createVector(i * scale_factor, j * scale_factor), {
        })
      }
    }

    p.background(250);
    
  }

  p.draw = function() {
    //p.background(250);
    img_scale.loadPixels();

    
    p.translate(100, 100);

    //p.ellipse((p.sin(p.frameCount * 0.02) * 100) + 300, (p.cos(p.frameCount * 0.02) * 100) + 200, 5, 5);

    for(let i = 0; i < img_scale.width; i++) {
      for(let j = 0; j < img_scale.height; j++) {
        let index = (i * 4) + (j * img_scale.width * 4);

        //particles[index].follow_noise(0.03, 100);
        //particles[index].follow_noise(0.07, 1000);
        particles[index].follow_noise(0.04, 50);

        let size = 1;
        particles[index].display([img_scale.pixels[index], img_scale.pixels[index+1], img_scale.pixels[index+2], 100], size)
      }
    }
    //p.save(p.frameCount + '.jpg');
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
