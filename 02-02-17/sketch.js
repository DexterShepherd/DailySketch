const p5 = require('p5');

new p5(p => {
  let speed, radius, num_points, h_max;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    speed = 0;
    radius = 200;
    num_points = 2;
    p.stroke(0);
    p.noFill();
    h_max = 25;
    p.strokeWeight(2);
    p.stroke('#F3FFE2');
  }

  p.draw = function() {
    p.background('#2C3E50');
    for(let i = 0; i < num_points; i++) {
      p.beginShape();
      for(let h = 0; h < h_max; h++) {
        let playhead = p.map(h, 0, h_max, -p.PI, p.PI);
        let theta = p.map(i, 0, num_points, -p.PI, p.PI);
        let x = 400 + p.sin(speed + theta + playhead) * p.map(h, 0, h_max, radius, 0);
        let y = 400 + (-h * p.map(h, 0, h_max, 20, 15)) - (p.cos(speed + theta + playhead) * ((h * 10) * p.map(h, 0, h_max, 1, 0))); 
        p.vertex(x, y);
      }
      p.endShape();
    }

    for(let i = 0; i < num_points; i++) {
      p.beginShape();
      for(let h = 0; h < h_max; h++) {
        let playhead = p.map(h, 0, h_max, -p.PI, p.PI);
        let theta = p.map(i, 0, num_points, -p.PI, p.PI);
        let x = 400 + p.sin(-speed + theta + playhead) * p.map(h, 0, h_max, radius, 0);
        let y = 400 + (h * p.map(h, 0, h_max, 20, 15)) - (p.cos(-speed + theta + playhead) * ((h * 10) * p.map(h, 0, h_max, 1, 0))); 
        p.vertex(x, y);
      }
      p.endShape();
    }
    speed = p.frameCount * 0.01

  }
});
