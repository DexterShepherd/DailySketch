const p5 = require('p5');

new p5(p => {
  let detail, count;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noFill();
    detail = 100;
    p.stroke('#FFFAD5')
  }

  p.draw = function() {
    p.background('#BD4932');
    p.translate(p.width/2, p.height/2);
    for(let i = 0; i < 8; i++) {
      p.beginShape();
      for(let j = 0; j < detail; j++) {
        let theta = p.map(j, 0, detail, 0, p.TWO_PI);
        p.vertex(p.sin(theta + p.cos(count + p.sin(theta + i))) * (i + 1) * 40, p.cos(theta + p.sin(count + theta)) * (i + 1) * 40);
      }
      p.endShape(p.CLOSE);
    }
    count = p.frameCount * 0.02;
  }
});

