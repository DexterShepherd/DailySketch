const p5 = require('p5');

new p5(p => {
  let speed;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    speed = 0;
    p.noStroke();
    p.fill(220);
    p.background(30);
  }

  p.draw = function() {
    p.translate(p.width/2, p.height/2);
    p.background(30, 10);
    for(let i = 0; i < 4; i++) {
      let theta2 = p.map(i, 0, 4, -p.PI, p.PI);
      for(let j = 0; j < 10 ; j++) {
        p.push()
        let theta = p.map(j, 0, 10, -p.PI, p.PI);
        p.rotate(speed);
        let x = p.sin(speed + theta) * p.cos(speed + theta2) * p.map(i, 0, 4, 100, 300);
        let y = p.cos(speed + theta) * 200;
        let size = (p.sin(speed + theta) * 30);
        p.translate(x, y);
        p.ellipse(0, 0, size + 5, size + 5);
        p.pop();
      }
    }
    speed = p.frameCount * 0.01;
  }
});

