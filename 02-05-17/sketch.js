const p5 = require('p5');

new p5(p => {
  let speed, crank1, crank2, pen;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noFill();
    p.rectMode(p.CENTER);
    crank1 = new Crank(p.createVector(p.random(-400, -200), 0), 64, 32)
    crank2 = new Crank(p.createVector(0, p.random(-400, -200)), 16, 48)
    pen = p.createVector(p.random(-200, 200), p.random(-200, 200));
    p.background('#2E0927');
  }

  p.draw = function() {
    p.translate(p.width/2, p.height/2);
    crank1.update();
    // crank1.display();
    crank2.update();
    // crank2.display(); 
    // p.line(crank1.x(), crank1.y(), crank2.x(), crank2.y());
    // p.line(crank2.x(), crank2.y(), pen.x + crank1.theta.x + crank2.theta.x, pen.y + crank1.theta.y + crank2.theta.y);
    p.rotate(speed * 8.1);
    p.push();
    // p.rect(0, 0, 400, 400);
    p.stroke(p.lerpColor(p.color('#04756F'), p.color('#FF2D00'), (pen.y + crank1.theta.y + crank2.theta.y)/(p.height/2)));
    p.point(pen.x + crank1.theta.x + crank2.theta.x, pen.y + crank1.theta.y + crank2.theta.y);
    p.pop();
    speed = p.frameCount * 0.001;
    if(p.frameCount % 20 == 0) {
      // p.save(p.frameCount + '.jpg');
    }
  }

  let Crank = function(loc, r, factor) {
    this.loc = loc.copy();
    this.theta = p.createVector(0, 0);
    this.origin = loc.copy()
    this.r = r;
    this.factor = factor

    this.update = function() {
      this.theta = p.createVector(p.sin(speed * this.factor) * this.r, p.cos(speed * this.factor) * this.r);
    }

    this.display = function() {
      p.push();
      p.translate(this.loc.x, this.loc.y);
      p.translate(this.theta.x, this.theta.y);
      p.ellipse(0, 0, 10, 10);
      p.pop();
    }

    this.x = function() {
      return this.loc.x + this.theta.x; 
    }

    this.y = function() {
      return this.loc.y + this.theta.y; 
    }
  }

  function a(x, y, z) {
    return p.acos((x * x) + (z * z) - (y * y))/(2 * x * z);
  };

  function b(x, y, z) {
    return p.acos((y * y) + (z * z) - (x * x))/(2 * y * z);
  };

  function c(x, y, z) {
    return p.acos(((x * x) + (y * y) - (z * z)))/(2 * x * y);
  };
});

