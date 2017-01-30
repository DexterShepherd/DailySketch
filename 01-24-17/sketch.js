const p5 = require('p5');

new p5(p => {
  let radius, num_circles, count, speed;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    radius = 100;
    num_circles = 16;
    speed = 0;
    p.noStroke();
    p.fill(150);
  }

  p.draw = function() {
    p.background(240, 2);
    p.translate(p.width/2, p.height/2);
    for(let i = 0; i < num_circles; i++) {
      p.push();
      let theta = p.map(i, 0, num_circles - 1, -p.PI, p.PI);
      let x = p.sin(speed + theta * 3) * radius;
      let y = p.cos(speed + theta * 2) * radius;
      p.translate(x, y);
      p.ellipse(0, 0, 1, 1);
      p.pop();
    }

    speed += 0.01;
  }
});

