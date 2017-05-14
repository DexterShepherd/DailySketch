const p5 = require('p5');

new p5(p => {
  let speed;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noFill();
    p.stroke(255);
  }

  p.draw = function() {
    p.background(0);
    p.beginShape();
    p.translate(p.width/2, p.height/2);
    for(let i = 0; i < 200; i++) {
      let theta = p.map(i, 0, 200, 0, p.TWO_PI);
      let r = 200;
      let x = p.sin(theta) * (r + p.sin(theta + speed) * 50);
      let y = p.cos(theta) * (r + p.cos(theta + speed) * 10);
      p.vertex(x, y);
    }

    p.endShape(p.CLOSE);

    speed = p.frameCount * 0.01;
  }
});
