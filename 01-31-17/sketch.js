// const p5 = require('p5');

// new p5(p => {
//   let img, freq;
//   p.preload = function() {
//     img = p.loadImage('http://i.imgur.com/7yOB0Gw.jpg');
//   }

//   p.setup = function() {
//     const canvas = p.createCanvas(800, 800);
//     img.resize(img.width * 0.2, 0);
//     freq = {};
//   }

//   p.draw = function() {
//     img.loadPixels();
//     // create the frequency table
//     for( let i = 4; i < img.pixels.length; i+=4) {
//       let a = [img.pixels[i - 4], img.pixels[i - 3], img.pixels[i - 2], img.pixels[i - 1]];
//       let b = [img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]];

//       let a_col = new Col(p.hue(a), a);
//       let b_col = new Col(p.hue(b), b);

//       let temp = freq[a_col] || {};
//       temp[b_col] = temp[b_col] + 1 || 1;
//       freq[a_col] = temp;
//     }

//     //remake the image
//     for(let i = 0; i < img.pixels.length - 4; i+=4 ) {
//       if(i == 0) {
//         let seed = p.random(Object.keys(freq));
//         console.log(seed);
//         img.pixels[i] = freq[seed].color[0];
//         img.pixels[i + 1] = freq[seed].color[1];
//         img.pixels[i + 2] = freq[seed].color[2];
//         img.pixels[i + 3] = freq[seed].color[3];
//       } else {
//         let last = p.hue([img.pixels[i - 4], img.pixels[i - 3], img.pixels[i - 2], img.pixels[i - 1]]);
//         let col = freq[last.toString()];
//         if(col) {
//           let choice = JSON.parse(choose(col));
//           img.pixels[i] = choice.color[0];
//           img.pixels[i + 1] = choice.color[1];
//           img.pixels[i + 2] = choice.color[2];
//           img.pixels[i + 3] = choice.color[3];
//         } else {
//           console.log(col);
//           console.log(last);
//         }
//       }
//     }

//     p.updatePixels();
//     p.image(img, 0, 0, p.width, p.height);

//     p.noLoop();
//   }


//   function choose(hash) {
//     let arr = [];
//     Object.keys(hash).forEach( k => {
//       for(let i = 0; i < hash[k]; i++) {
//         arr.push(k);
//       }
//     });

//     return p.random(arr);
//   }

//   let Col = function(key, color){
//     this.color = color; 
//     this.key = key;
//   }

//   Col.prototype.toString = function() {
//     return this.key.toString();
//   }
// });

const p5 = require('p5');

new p5(p => {
  let img, img_scale, scale_factor;

  p.preload = function() {
    img_scale = p.loadImage('data/dude.jpg');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noStroke();
    scale_factor = 2;
    img_scale.resize(600 / scale_factor, 0);
    p.background(250);
    
  }

  p.draw = function() {
    img_scale.loadPixels();
    p.translate(0, p.sin(p.frameCount * 0.01) * 10);
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

    
    p.translate(100, 100);
    for(let i = 0; i < img_scale.width; i++) {
      for(let j = 0; j < img_scale.height; j++) {
        let index = (i * 4) + (j * img_scale.width * 4);
        p.fill(img_scale.pixels[index], img_scale.pixels[index+5], img_scale.pixels[index+4], 50);
        p.rect(i * scale_factor, j * scale_factor, scale_factor, scale_factor);
      }
    }

    // p.save(p.frameCount + ".jpg");
  }
});
