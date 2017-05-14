const p5 = require('p5');

new p5(p => {
  let speed, num_circles, num_layers, colors;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    speed = 0;
    p.noStroke();
    num_circles = 3;
    num_layers = 2;
    colors = ['#FF6138', '#00A388', '#79BD8F', '#FFFF9D'];
    p.noFill();
  }

  p.draw = function() {
    // p.background('#BEEB9F');
    p.background(255, 50);

    for(let i = 0; i < num_circles; i++) {
      for(let j = 0; j < num_layers; j++) {
        p.push();
        p.translate(p.width/2, p.height/2);
        let x = p.sin(speed) * 200 + p.cos(speed) * p.map(j, 0, num_layers, -300, 100);
        let y = p.cos(speed) * 200 * p.sin(speed);
        p.rotate(p.map(i, 0, num_circles, 0, p.TWO_PI) + p.sin(speed));
        p.rotate(p.sin(speed) * j);
        p.rotate(p.cos(speed) * j);
        let size = (p.cos(speed + j) * 100);
        p.stroke(colors[1]);
        p.rect(x, y, size, size);
        p.pop();
      }
    }
    //speed += (30.0/p.TWO_PI) * 0.003;
    //speed = p.map(p.constrain(p.mouseX, 0, 800), 0, 800, 0.000, p.TWO_PI);
    speed = p.map(p.frameCount, 0, 420, 0.000, p.TWO_PI);

    if (p.frameCount > 420) {
      // p.background(0);
      // p.noLoop();
    }
  }
});
