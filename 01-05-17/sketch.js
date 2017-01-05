const p5 = require('p5');

new p5(p => {
  let playhead, num_cols, num_rows, colors;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noStroke();
    num_cols = 2;
    num_rows = 8;
  }

  p.draw = function() {
    p.background(244);
    p.fill(10);

    for(let i = 0; i < num_cols; i++) {
      for(let j = 0; j < num_rows; j++) {
        p.push();
        let angle = p.map(i, 0, num_cols, 0, p.TWO_PI);
        p.translate(p.width/2, p.height/2);
        p.rotate(p.frameCount * (0.01 * j));
        if(i == 0) {
          p.fill('#7ECEFD');
        }
        p.translate(p.sin(angle) * 100 * j, p.cos(angle) * 100 * p.sin(i * p.frameCount * 0.01));
        p.ellipse(0, 0, 20 - (p.sin(j * 0.01) * 200), 20 - p.sin(j * 0.01) * 200);

        p.pop();
      }
    }
  }
});

