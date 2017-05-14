const p5 = require('p5');

new p5(p => {
  p.setup = function() {
    const canvas = p.createCanvas(800, 800, p.WEBGL);
  }

  p.draw = function() {
    p.background(240);
    for(var i = 0; i < 500; i+=100){
      p.push();
      p.fill(i * 0.1, 100, 100);

      //line
      p.translate(0, 100, 0);
      p.line(-100, 0, i, 100, 0, i);

      //triangles
      p.translate(0, 100, 0);
      p.triangle(
        0, sin( i + p.frameCount * 0.1) * 10, i,
        60, 60, i,
        -60, 60, i);

      //quad
      p.translate(0, 200, 0);
      p.quad(
        -100, i, 0,
        100, i, 0,
        -100, 100, i,
        100, 100, i
        );
      p.pop();
    }
  }
});
