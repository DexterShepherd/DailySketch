const p5 = require('p5');

new p5(p => { 
  let speed;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.background(10);
    p.stroke(255);
  }

  p.draw = function() {
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++)  {
        p.push();
        p.translate((i * 200) + 100, (j * 200) + 100);
        let x = p.sin(speed) * p.sin(speed * j + 1) * p.sin(speed * i + 1) * 80;
        let y = p.cos(speed) * p.cos(speed * i + 1) * p.sin(speed * j + 1) * 80;
        p.rotate(speed * p.PI);
        p.translate(x, y);
        p.point(0, 0);
        p.pop();
      }
    }
    speed = p.frameCount * 0.01;
  }
});

