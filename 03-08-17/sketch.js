const p5 = require('p5');

new p5(p => {
  let speed, r;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    r = 70;
    p.background(0);
    p.stroke(255);
    p.noFill();
  }

  p.draw = function() {

    for(let row = 0; row < 4; row++ ) {
      for(let col = 0; col < 4; col++ ) {
        p.push();
        p.translate(100, 100);
        p.translate(col * 200, row * 200);

        for(let k = 0; k < (col + 2) * 2; k++) {
          for(let i = 0; i < (row + 2) * 4; i++) {

            let theta = p.map(i, 0, (row + 2) * 2, 0, p.PI);
            let x = p.sin(theta) * p.sin(p.cos(speed) + theta) * r;
            let y = p.cos(theta) * p.cos(p.sin(speed) + theta) * r;
            let d = x + y;
            let s = 1;
            p.stroke(255, p.map(d, 0, r * 2, 255, 1 ));
            p.ellipse(x, y, s, s);
          }
          p.rotate(p.map(k, 0, (col + 2) * 2, 0, p.TWO_PI));
        }
        p.pop();
      }
    }


    speed = p.frameCount * 0.01;
  }
});
