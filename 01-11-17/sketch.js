const p5 = require('p5');

new p5(p => {
  let img_scale, scale_factor, particles;

  p.preload = function() {
    img_scale = p.loadImage('https://farm9.staticflickr.com/8695/28568124855_d4fb57c3c5_b.jpg');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.background(0);
    p.noStroke();
  }

  p.draw = function() {
    p.background(0, 10);
    p.translate(p.width/8, p.height/8);
    for(let j = 0; j < 4; j++) {
      for(let k = 0; k < 4; k++) {
        for(let i = 0; i < 6; i++) {
          p.push();
          p.translate(p.width/4 * j, p.height/4 * k);
          p.translate(p.sin((p.frameCount - j * (k + 1) * 200) * 0.01) * 50, p.cos((p.frameCount - 100 * j * k) * 0.01) * 50);
          p.ellipse(0, 0, 2, 2);
          p.rotate(p.frameCount * 0.02);
          p.translate(p.sin((p.frameCount - (j + 1) * k * 100) * 0.01) * p.sin((p.frameCount - j * k * 100) * 0.05) * 50, p.cos(p.frameCount * 0.01) * p.cos(p.frameCount * 0.05) * j * i * k);
          p.ellipse(0, 0, 2, 2);
          p.translate(p.sin(p.frameCount * 0.01) * p.sin(p.frameCount * 0.05) * 5 * i, p.cos(p.frameCount * 0.06) * p.cos(p.frameCount * 0.05) * 10 * i);
          p.ellipse(0, 0, 2, 2);
          p.rotate(p.frameCount * 0.01);
          p.translate(p.sin((p.frameCount + j * k * 100) * 0.01) + p.cos((p.frameCount - j * k * 100)  * 0.05) * i + j + k, p.cos((p.frameCount - j * k * 100) * 0.06) + p.sin((p.frameCount - j * k * 100)  * 0.05) * 10 * k);
          p.ellipse(0, 0, 2, 2);
          p.pop();
        }
      }
    }
  }
});

