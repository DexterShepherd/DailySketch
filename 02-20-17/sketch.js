const p5 = require('p5');

new p5(p => {
  let count, toggle, period;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noStroke();
    count = 0;
    toggle = false;
    period = 120;
    p.rectMode(p.CENTER);
  }

  p.draw = function() {
    p.translate(400, 400);
    p.scale(count);

    if(toggle) {
      p.background(255);
      p.fill(0);
    } else {
      p.background(0);
      p.fill(255);
    }

    p.rotate(count * 0.01);
    for(let i = -4; i < 5; i++) {
      for(let j = -4; j < 5; j++) {
        let size = p.sin(count * 0.01) * 7.5;
        p.ellipse(i * 5, j * 5, size, size);
      }
    }

    if(p.frameCount % period == 0) {
      p.scale(1.0 / period - 1);
      count = 0;
      toggle = !toggle;
    }

    count += 1;
  }
});

