const p5 = require('p5');

new p5(p => {
  let speed, verts;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noFill();
  }

  p.draw = function() {
    p.background(0);
    p.stroke(255);
    p.strokeWeight(2);


    p.beginShape();
    for(let i = 0; i < 64; i++) {
      let theta = p.map(i, 0, 64, 0, p.TWO_PI);
      let offset = { 'x': 400, 'y': 300 + ( -1 * p.sin(speed)) * 100 };
      let r = 150;
      let x = p.sin(theta + p.cos(speed + theta)) * r + offset.x;
      let y = p.cos(theta + p.sin(speed)) * r + offset.y;
      p.vertex(x, y);
    }

    p.endShape(p.CLOSE);
    p.beginShape();

    for(let i = 0; i < 64; i++) {
      let theta = p.map(i, 0, 64, 0, p.TWO_PI);
      let offset = { 'x': 400, 'y': 500 + p.sin(speed) * 100 };
      let r = 150;
      let x = p.sin(theta + p.cos(speed)) * r + offset.x;
      let y = p.cos(theta + p.cos(speed + theta)) * r + offset.y;
      p.vertex(x, y);
    }

    p.endShape(p.CLOSE);
        

    speed = p.frameCount * 0.01;
  }
});

