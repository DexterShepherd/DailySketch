const p5 = require('p5');

new p5(p => {
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
  }

  p.draw = function() {
    p.background(240);
  }
});

