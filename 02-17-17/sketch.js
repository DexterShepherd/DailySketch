const p5 = require('p5');

new p5(p => {
  let count;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.rectMode(p.CENTER);
    count = 0;
    p.noStroke();
  }

  p.draw = function() {
    p.background(62, 96, 111);
    for(let i = 0; i < 10; i++) {
      p.push();
      if((i % 2) != 0) {
        p.translate(400, 400);
        p.rotate((count * i * 0.1)* 0.01);
        p.fill(62, 96, 111);
      } else {
        p.translate(400, 400);
        p.rotate(-(count * i * 0.1) * 0.01);
        p.fill(252, 255, 245);
      }
      p.rect(0, 0, count / (i), count / (i));
      
      p.pop();
    }
    count += 1;
  }
});

