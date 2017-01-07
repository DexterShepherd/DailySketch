const p5 = require('p5');

new p5(p => {
  let palettes, colors, num_cols,
      num_rows, plot_width, plot_height,
      speed;


  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    colors = palettes[4].palette;
    p.noFill();
    num_cols = 10;
    num_rows = 1;
    plot_width = 600;
    plot_height = 300;
    p.rectMode(p.CENTER);
    p.noStroke();
  }

  p.draw = function() {
    p.background(colors[0]);
    for(let i = 0; i < 21; i++) {
      for( let j = 0; j < 21; j++) {
        let theta = p.map(j, 0, 21, -p.PI, p.PI);
        let x = j * (p.width/20);
        let y = i * (p.height/20) + p.sin(speed * (i + 1)/2 + theta) * 10;
        let size = 6 + (p.sin(speed * (i + 1)/2 + theta) * 3);
        p.fill(colors[1]);
        p.ellipse(x, y, size, size);
      }
    }
    speed = p.frameCount * 0.01;
  }
});

