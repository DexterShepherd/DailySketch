const p5 = require('p5');

new p5(p => {
  let speed, radius, num_points, h_max;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    speed = 0;
    radius = 200;
    num_points = 4;
    p.stroke(0);
    p.noFill();
    h_max = 13;
    p.strokeWeight(2);
    p.stroke('#F3FFE2');
  }

  p.draw = function() {
    p.background('#1695A3');
    p.translate(p.width/2, p.height/2);
    for(let h = 0; h < h_max; h ++) {
      p.beginShape();
      let playhead = p.map(h, 0, h_max, -p.PI, p.PI);
      num_points = h_max - h;
      for(let i = 0; i < num_points; i++) {
        let theta = p.map(i, 0, num_points, -p.PI, p.PI);
        let x = p.sin(speed + theta + p.cos(speed + playhead)) * p.map(h, 0, h_max, radius, 0);
        let y = (h * p.map(h, 0, h_max, 30, 25)) + (p.cos(speed + theta + p.sin(speed + playhead)) * ((h * 10) * p.map(h, 0, h_max, 1, 0))); 
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
    }

    // p.rotate(p.PI);
    for(let h = 0; h < h_max; h++) {
      p.beginShape();
      let playhead = p.map(h, 0, h_max, -p.PI, p.PI);
      num_points = h_max - h;
      for(let i = 0; i < num_points; i++) {
        let theta = p.map(i, 0, num_points, -p.PI, p.PI);
        let x = p.sin(speed + theta + p.cos(speed + playhead)) * p.map(h, 0, h_max, radius, 0);
        let y = (-h * p.map(h, 0, h_max, 30, 25)) - (p.cos(speed + theta + p.sin(speed + playhead)) * ((h * 10) * p.map(h, 0, h_max, 1, 0))); 
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
    }
    speed = p.frameCount * 0.01

  }
});

