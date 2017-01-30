const p5 = require('p5');

new p5(p => {
  let speed, num_circles, num_layers, colors;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    speed = 0;
    p.noStroke();
    num_circles = 16;
    num_layers = 16;
    colors = ['#ffffff', '#cccccc', '#888888', '#555555'];
  }

  p.draw = function() {
    p.background(0, 30);
    //p.background(244, 4);

    for(let i = 0; i < num_circles; i++) {
      for(let j = 0; j < num_layers; j++) {
        p.push();
        p.translate(p.width/2, p.height/2);
        let x = p.sin(speed) * 180 + p.cos(speed) * p.map(j, 0, num_layers, -300, 100);
        let y = p.cos(speed) * 360 * p.sin(speed);
        p.rotate(p.map(i, 0, num_circles, 0, p.TWO_PI) + p.sin(speed));
        p.rotate(p.sin(speed) * j);
        let size = (p.cos(speed + j) * 10);
        p.fill(colors[j % colors.length]);
        for(let k = 0; k < 10; k++) {
          p.ellipse(x + j, y + j, size + k, size + k);
        }
        p.pop();
      }
    }
    //speed += (30.0/p.TWO_PI) * 0.003;
    //speed = p.map(p.constrain(p.mouseX, 0, 800), 0, 800, 0.000, p.TWO_PI);
    speed += 0.01;


  }
});
