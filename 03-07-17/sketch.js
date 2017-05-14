const p5 = require('p5');

new p5(p => {
  let speed, r;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    r = 300;
    p.background(0);
    p.stroke(255);
    p.noFill();
  }

  p.draw = function() {
    p.translate(p.width/2, p.height/2);

    for(let k = 0; k < 6; k++) {
      for(let i = 0; i < 8; i++) {

        let theta = p.map(i, 0, 8, 0, p.PI);
        let x = p.sin(theta) * p.sin(p.cos(speed) + theta) * r;
        let y = p.cos(theta) * p.sin(p.sin(speed) + theta) * r;
        let d = x + y;
        let s = p.map(d, 0, r * 2, 1, 20 );
        p.stroke(255, p.map(d, 0, r * 2, 255, 1 ));
        p.ellipse(x, y, s, s);
      }
      p.rotate(p.map(k, 0, 6, 0, p.TWO_PI));
    }
    speed = p.frameCount * 0.01;
  }
});
