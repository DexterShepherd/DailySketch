const p5 = require('p5');

new p5(p => {
  let count, toggle, period;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noStroke();
    count = 0;
    toggle = false;
    period = 200;
    p.rectMode(p.CENTER);
    p.fill('#ECF0F1');
  }

  p.draw = function() {
    p.background('#2C3E50');
    p.translate(400, p.map(count, 0, period, 0, 1000));
    p.scale(count * 0.1);


    for(let i = 0; i < 10; i++) {
      p.push();
      if(count < 157) {
        p.translate(p.sin(count * 0.02 + p.map(i, 0, 10, 0, p.TWO_PI)) * (p.sin(count * 0.02) * 20), p.map(i, 0, 200, 0, 5));
      } else {
        p.translate(0, p.map(i, 0, 200, 0, 5));
         
      }
      let size = (p.cos(count * 0.04) * 10) + 10;
      p.rotate(count * 0.01);
      p.rect(0, 0, size + 1, size + 1)
      p.pop();
    }

    if(p.frameCount % period == 0) {
      p.scale(1.0 / period - 1);
      count = 0;
      toggle = !toggle;
    }

    count += 1;
    // count = p.map(p.mouseX, 0, 800, 0, period);
  }
});

