const p5 = require('p5');

new p5(p => {
  let speed, crankA, crankB, crankC, render;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    crankA = new Crank(100, 100, 10, 2);
    crankB = new Crank(600, 100, 3, 9);
    render = true;
    p.stroke(0, 100);
    p.noFill();
  }

  p.draw = function() {
    p.rect(0, 0, 799, 799);
    if(!render){
      p.background(250);
    }
    crankA.update();
    crankB.update();
    if(!render) {
      crankA.display();
      crankB.display();
    }

    p.translate(p.width/2, p.height/2);
    p.rotate(speed);
    for(let i = 0; i < 1; i++) {
      let theta = p.map(i, 0, 30, -p.PI, p.PI);
      theta = p.sin(theta) + p.cos(theta);
      p.push();
      p.rotate(theta);
      p.translate(crankA.thetaX * crankB.thetaY * theta * 500, crankA.thetaY * crankB.thetaX * theta * 500);
      for(let j = 0; j < 5; j++) {
        p.push();
        theta = p.map(j, 0, 5, -p.PI, p.PI);
        p.rotate(speed * theta);
        p.translate(p.sin(speed + theta) * p.sin(speed), p.cos(speed + theta) * p.cos(speed) * p.noise(speed));
        p.translate(p.noise(speed * 10) * (10 * j), 0);
        p.point(0, 0);
        p.pop();
      }
      p.pop();
    }
    // p.line(crankA.x, crankA.y, 600, 300);
    // p.line(crankB.x, crankB.y, 100, 300);
    speed = p.frameCount * 0.001;
    // p.save(p.frameCount + '.png');
  }

  let Crank = function(x, y, s1, s2) {
    this.x = x;
    this.y = y;
    this.ox = x;
    this.oy = y;
    this.theta;
    this.speed1 = s1;
    this.speed2 = s2;
    this.r1 = 20;
    this.r2 = 50;
    this.normX;
    this.normY;
    this.thetaX;
    this.thetaY;

    this.update = function() {
      this.x = this.ox + (p.sin(-speed * this.speed1) * this.r2) + (p.sin(speed * this.speed2) * this.r1);
      this.y = this.oy + (p.cos(-speed * this.speed1) * this.r2) + (p.cos(speed * this.speed2) * this.r1);
      this.thetaX = p.sin(-speed * this.speed1) * p.sin(speed * this.speed2);
      this.thetaY =  p.cos(-speed * this.speed1) * p.cos(speed * this.speed2);
      this.normX = this.x - this.ox;
      this.normY = this.y - this.oy;
    }

    this.display = function() {
      p.ellipse(this.ox + (p.sin(-speed * this.speed1) * this.r1), this.oy + (p.cos(-speed * this.speed1) * this.r1), this.r2 * 2, this.r2 * 2) ;
      p.ellipse(this.ox + (p.sin(-speed * this.speed1) * this.r2), this.oy + (p.cos(-speed * this.speed1) * this.r2), this.r1 * 2, this.r1 * 2);
      p.ellipse(this.x, this.y, 5, 5);
    }
  }
});

