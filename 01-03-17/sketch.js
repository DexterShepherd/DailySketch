const p5 = require('p5');

// the first square is the key
// a squares hue must not be more than 50 from the key
// a squares hue must not be more than 20 from its left neighbor
// if a squares hue is more than 50 from its upper neighbor, it is the new key

new p5(p => {
  let speed = 0;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.colorMode(p.HSB, 100);
    p.background(0, 0, 0);
    p.noStroke();
  }

  p.draw = function() {
    p.rotate(p.sin(speed) * p.cos(speed));
    for(let i = 0; i < 10; i++) {
      p.push();
      p.translate(p.width/2, p.height/2);
      let x = (p.width/16 + i * p.map(p.sin(speed), -p.PI, p.PI, 0, i/10 )) * p.sin(speed);
      let y = (p.height/8 - i * p.map(p.cos(speed), -p.PI, p.PI, 0, i/10 )) * p.cos(speed);
      let dist = p.map(p.constrain(p.dist(0, 0, x, y), 0, 500), 0, 500, 100, 10);
      p.translate(x + (i * p.sin(speed) * 10), y + (p.cos(speed) * i * 5));
      p.fill((50 - ((p.cos(speed) * dist)) + (p.noise(x/100, y/100) * 100)) % 100, dist/2, 100, 100);
      p.ellipse(0, 0, p.sin(speed) + 1 * 3, p.sin(speed) + 1 * 3);
      p.pop();
    }

    speed += 0.01;
  }
});

