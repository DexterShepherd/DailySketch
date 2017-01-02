const p5 = require('p5');

new p5(p => {
  let walkers = [];
  let col_base;
  let radius;
  let speed;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.background(255);
    col_base = p.random(30, 80);
    for(let i = 0; i < 100; i++) {
      walkers.push(new Walker(p.width/2, p.height/2, i * 0.1, 10));
    }
    p.colorMode(p.HSB, 100);
    p.background(30);
    //p.blendMode(p.BURN);
  }

  p.draw = function() {
    p.beginShape();
    p.noFill();
    p.translate(p.sin(p.frameCount * 0.01) * 100, p.cos(p.frameCount * 0.01) * 100);
    p.stroke((col_base + p.noise(p.frameCount * 0.01) * 50) % 100, 50, 100);
    for(let i = walkers.length - 1; i >= 0; i--) {
      walkers[i].update(); 
      p.vertex(walkers[i].loc.x, walkers[i].loc.y);
    }
    p.endShape(p.CLOSE);

    if(p.frameCount % 500 == 0) {
      reset();
    }
  }

  function reset() {
    walkers = [];
    p.setup();
  }

  const Walker = function(x, y, s, sc){
    this.loc = p.createVector(x, y);
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.scale = sc; 
    this.strength = s;

    this.update = function(){
      this.angle = p.noise(p.map(this.loc.x, 0, p.width, 0, this.scale), p.map(this.loc.y, 0, p.height, 0, this.scale)) * this.strength;
      this.acc = p.createVector(p.cos(this.angle), p.sin(this.angle));
      this.vel.add(this.acc);
      this.loc.add(this.vel);
      this.vel.mult(0.1);
    }
  }
});


