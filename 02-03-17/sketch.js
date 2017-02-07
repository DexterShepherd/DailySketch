const p5 = require('p5');

new p5(p => {
  let speed, radius, num_points, h_max;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    speed = 0;
    radius = 300;
    num_points = 200;
    p.stroke(0);
    p.noFill();
    h_max = 25;
    p.strokeWeight(1);
    p.stroke(240);
    p.background(40);
  }

  p.draw = function() {
    p.background(40, 50);
    for(let i = 0; i < num_points; i++) {
      p.beginShape(p.POINTS);
      for(let h = 0; h < h_max; h++) {
        let playhead = p.map(h, 0, h_max, -p.PI, p.PI);
        let theta = p.map(i, 0, num_points, -p.PI, p.PI);
        let x = 400 + p.sin(speed + theta + p.cos(playhead + theta)) * p.map(h, 0, h_max, radius, 0);
        let y = 400 + (-h * p.map(h, 0, h_max, 20, 15)) - (p.cos(speed + theta + p.cos(playhead + theta + speed)) * ((h * 10) * p.map(h, 0, h_max, 1, 0))); 
        p.vertex(x, y);
      }
      p.endShape();
    }

    for(let i = 0; i < num_points; i++) {
      p.beginShape(p.POINTS);
      for(let h = 0; h < h_max; h++) {
        let playhead = p.map(h, 0, h_max, -p.PI, p.PI);
        let theta = p.map(i, 0, num_points, -p.PI, p.PI);
        let x = 400 + p.sin(-speed + theta + p.sin(playhead + theta)) * p.map(h, 0, h_max, radius, 0);
        let y = 400 + (h * p.map(h, 0, h_max, 20, 15)) - (p.cos(-speed + theta + p.sin(playhead + theta + speed)) * ((h * 10) * p.map(h, 0, h_max, 1, 0))); 
        p.vertex(x, y);
      }
      p.endShape();
    }
    speed = p.frameCount * 0.01
    // p.save(p.frameCount + '.jpg');

  }
});
