const p5 = require('p5');

new p5(p => {
  let img, img_scale;

  p.preload = function() {
    img_scale = p.loadImage('data/florette.jpg');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    img_scale.resize(600, 600);
  }

  p.draw = function() {
    p.background(240);
    img_scale.loadPixels();
    for(let j = 0; j < img_scale.height; j++){
      for(let i = 0; i < (img_scale.width * 4) - 4; i+=4) {
        let index = (j) * img_scale.width * 4 + i;
        let a = [img_scale.pixels[index], img_scale.pixels[index+1], img_scale.pixels[index+2], img_scale.pixels[index+3]];
        let b = [img_scale.pixels[index+4], img_scale.pixels[index+5], img_scale.pixels[index+6], img_scale.pixels[index+7]];
        if(p.saturation(a) > p.saturation(b)) {
          if(p.brightness(a) > p.brightness(b)) {
            let tmp = [img_scale.pixels[index], img_scale.pixels[index+1], img_scale.pixels[index+2], img_scale.pixels[index+3]];
            img_scale.pixels[index] = img_scale.pixels[index + 4]
            img_scale.pixels[index + 1] = img_scale.pixels[index + 5]
            img_scale.pixels[index + 2] = img_scale.pixels[index + 6]
            img_scale.pixels[index + 3] = img_scale.pixels[index + 7]
            img_scale.pixels[index + 4] = tmp[0];
            img_scale.pixels[index + 5] = tmp[1];
            img_scale.pixels[index + 6] = tmp[2];
            img_scale.pixels[index + 7] = tmp[3];
          }
        } else {
          if(p.hue(a) > p.hue(b)) {
            let tmp = [img_scale.pixels[index], img_scale.pixels[index+1], img_scale.pixels[index+2], img_scale.pixels[index+3]];
            img_scale.pixels[index] = img_scale.pixels[index + 4]
            img_scale.pixels[index + 1] = img_scale.pixels[index + 5]
            img_scale.pixels[index + 2] = img_scale.pixels[index + 6]
            img_scale.pixels[index + 3] = img_scale.pixels[index + 7]
            img_scale.pixels[index + 4] = tmp[0];
            img_scale.pixels[index + 5] = tmp[1];
            img_scale.pixels[index + 6] = tmp[2];
            img_scale.pixels[index + 7] = tmp[3];
          }
        }
      }
    }
    img_scale.updatePixels();
    p.image(img_scale, 0, 0, 800, 800);
    p.save(p.frameCount + '.png')
  }
});

