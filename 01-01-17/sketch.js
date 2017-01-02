const p5 = require('p5');

new p5(p => {
  let speed = 0;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noStroke();
    p.colorMode(p.HSB, 100);
    p.background(0, 0, 100);
  }

  p.draw = function() {
    p.rotate(p.sin(speed));
    for(let i = 0; i < 200; i++) {
      p.push();
      p.translate(p.width/2, p.height/2);
      let x = (p.width/8 + i * p.map(p.sin(speed), -p.PI, p.PI, 0, i/10 )) * p.sin(speed + i/100) + (p.noise(speed) * 100);
      let y = (p.height/8 - i * p.map(p.cos(speed), -p.PI, p.PI, 0, i/10 )) * p.cos(speed + i/100) + (p.noise(speed) * 100) ;
      let dist = p.map(p.constrain(p.dist(0, 0, x, y), 0, 500), 0, 500, 100, 10);
      p.translate(x, y);
      p.fill((50 - ((p.cos(speed) * dist)) + (p.noise(x/100, y/100) * 100)) % 100, dist/2, 100, 10);
      p.stroke((p.cos(speed) * dist), dist/2, 100, 1)
      p.ellipse(0, 0, dist * 2, dist * 2);
      p.pop();
    }

    speed += 0.01;
  }
});

