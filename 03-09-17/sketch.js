const p5 = require('p5');

new p5(p => {
  let speed, r;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    r = 300;
    p.background(250);
  }

  p.draw = function() {

    p.push();
    p.translate(p.width/2, p.height/2);

    for(let k = 0; k < 8; k++) {
      for(let i = 0; i < 5; i++) {

        let theta = p.map(i, 0, 5, 0, p.PI);
        let x = p.sin(theta) * p.sin(p.cos(speed) + theta + p.cos(theta + speed)) * r;
        let y = p.cos(theta + speed * 0.25) * p.cos(p.sin(speed + theta)) * r;
        let d = x + y;
        let s = 2;
        let col = p.lerpColor(p.color(255, 0, 0), p.color(0, 0, 255), p.map(p.dist(x, y, 0, 0), 0, r, 0, 1));
        p.stroke(col);
        p.fill(col);
        p.ellipse(x, y, s, s);
      }
      p.rotate(p.map(k, 0, 8, 0, p.TWO_PI));
    }
    p.pop();


    speed = p.frameCount * 0.05;
  }
});
