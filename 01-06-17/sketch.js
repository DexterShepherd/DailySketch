const p5 = require('p5');

new p5(p => {
  let palettes, palette, speed, size, num_circles, radius, particles;

  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    palette = palettes[2].palette;
    p.background(240);
    //p.noStroke();
    num_circles = 30;
    p.frameRate(24);
    radius = 100;
    particles = [];
    for(let i = 0; i < 1000; i++) {
      particles[i] = new Particle(0, 0, i % num_circles);
    }
    p.background(20);
  }

  p.draw = function() {
    p.background(20, 10);
    p.translate(p.width/2, p.height/2);
    for(let i = 0; i < particles.length; i++) {
      particles[i].update();
      p.vertex(particles[i].loc.x, particles[i].loc.y)
      if(i < num_circles) {
        p.stroke(255);
      } else {
        p.stroke(240, p.map(p.frameCount, 0, 800, 255, 0));
      }
      particles[i].display();
    }

    speed = p.frameCount * 0.02;
  }

  const Particle = function(x, y, point_index) {
    this.index = point_index;
    this.loc = p.createVector(x, y);
    this.vel = p.createVector(p.random(-100, 100), p.random(-100, 100));
    this.acc = p.createVector(0, 0);
    this.dest = p.createVector(0, 0);
    this.theta = 0;

    this.update = function() {
      this.theta = p.map(this.index, 0, num_circles, -p.PI, p.PI);
      this.dest = p.createVector(p.sin(speed + (this.theta * p.sin(speed) + p.PI)) * radius,
                                p.cos(speed + (this.theta * p.cos(speed) + p.PI)) * radius);
      this.acc = this.dest.sub(this.loc);
      this.acc.normalize();
      this.acc.mult(p.noise(speed));

      this.vel.add(this.acc);
      this.vel.limit(9);
      this.loc.add(this.vel);
      if (p.random(1000) > 999) {
        this.index = (this.index + 1 % num_circles);
      }
    }

    this.display = function() {
      p.push();
      p.point(this.loc.x, this.loc.y);
      p.pop();
    }
  }
});

