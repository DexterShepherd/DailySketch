const p5 = require('p5');

new p5(p => {
  let img, img_scale, scale_factor;

  p.preload = function() {
    img_scale = p.loadImage('data/dump.jpg');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noStroke();
    scale_factor = 4;
    img_scale.resize(600 / scale_factor, 0);
    p.background(250);
    
  }

  p.draw = function() {
    img_scale.loadPixels();
    p.translate(0, p.frameCount);
    for(let j = 0; j < img_scale.height; j++){
      for(let i = 4; i < (img_scale.width * 4); i+=4) {
        let index = (j) * img_scale.width * 4 + i;
        let a = [img_scale.pixels[index], img_scale.pixels[index+1], img_scale.pixels[index+2], img_scale.pixels[index+3]];
        let b = [img_scale.pixels[index+4], img_scale.pixels[index-3], img_scale.pixels[index+2], img_scale.pixels[index-1]];
        if(true) {
          if(p.brightness(a) > p.brightness(b)) {
            if(p.saturation(a) > p.saturation(b)) {
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
              img_scale.pixels[index + 1] = img_scale.pixels[index + 8]
              img_scale.pixels[index + 2] = img_scale.pixels[index + 9]
              img_scale.pixels[index + 3] = img_scale.pixels[index + 10]
              img_scale.pixels[index + 4] = tmp[0];
              img_scale.pixels[index + 5] = tmp[1];
              img_scale.pixels[index + 6] = tmp[2];
              img_scale.pixels[index + 7] = tmp[3];
            }
          }
        }
      }
    }
    img_scale.updatePixels();
    img_scale.loadPixels();

    
    p.translate(100, 200);
    for(let i = 0; i < img_scale.width; i++) {
      for(let j = 0; j < img_scale.height; j++) {
        let index = (i * 4) + (j * img_scale.width * 4);
        p.fill(img_scale.pixels[index], img_scale.pixels[index+5], img_scale.pixels[index+4], 50);
        p.rect(i * scale_factor, j * scale_factor, scale_factor, scale_factor);
      }
    }

    //p.save(p.frameCount + ".jpg");
  }
});
