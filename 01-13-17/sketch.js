const p5 = require('p5');
const dom =  require('p5/lib/addons/p5.dom');

new p5(p => {
  let palettes, palette, theta, speed, slider;

  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    palette = palettes[16].palette
    p.createDiv('');
    slider = p.createSlider(0, 200, 0, 1);
    p.noStroke();
    p.background(palette[0]);
  }

  p.draw = function() {
    p.background(10);
    for(let i = 0; i < 10; i++) {
      let theta = p.map(i, 0, 10, -p.PI, p.PI);
      p.push();
      p.translate((p.width/2) + p.sin(speed + theta) * 100, p.height/2 + p.sin(speed - theta) * 50);
      p.translate(p.sin(speed) *  ((p.cos(speed) * 300) * p.sin(speed - theta)), p.cos(speed + theta) * ((p.cos(speed) * 300) * p.sin(speed)));
      p.fill(250);
      //p.stroke(palette[(i % 2) + 2]);
      p.ellipse(0, 0, 2, 2);
      for(let j = 0; j < 20; j++) {
        let theta2 = p.map(j, 0, 20, -p.PI, p.PI);
        let x = p.cos(speed + theta2) * ((p.sin(speed) * 10) * p.cos(speed + theta));
        let y =  p.sin(speed + theta2) * ((p.sin(speed) * 10) * p.cos(speed - theta));
        p.translate(x, y);
        //let size = p.cos(speed + theta2) * 10;
        p.ellipse(x, y, 5 , 5);
      }

      p.pop();
    }
    
    //speed = p.map(slider.value(), 0, 200, -p.PI, p.PI);
    speed = p.map(p.frameCount % 500, 0, 500, -p.PI, p.PI);
  }
});

