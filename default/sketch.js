const p5 = require('p5');

new p5(p => {
  let palettes;

  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    console.log(palettes[0]);
  }

  p.draw = function() {
    p.background(240);
  }
});

