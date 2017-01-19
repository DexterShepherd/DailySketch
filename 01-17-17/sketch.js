const p5 = require('p5');

new p5(p => {
  let noise, img_scale, scale_factor, cells;

  p.preload = function() {
    //img_scale = p.loadImage('https://farm9.staticflickr.com/8695/28568124855_d4fb57c3c5_b.jpg');
    //img_scale = p.loadImage('http://i.imgur.com/ucfN3bl.jpg');
    //img_scale = p.loadImage('http://i.imgur.com/YY3bLP7.jpg');
    img_scale = p.loadImage('data/face.png');
    noise = p.loadImage('data/noise.png')
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noStroke();
    scale_factor = 4;
    img_scale.resize(800 / scale_factor, 800 / scale_factor);
    img_scale.loadPixels();
    cells = [];

    for(let i = 0; i < img_scale.width; i++) {
      cells[i] = [];
      for(let j = 0; j < img_scale.height; j++) {
        cells[i][j] = new Cell(Number(p.random() > 0.5), p.createVector(i * scale_factor, j * scale_factor), i, j);
      }
    }

    p.background(250);
    
  }

  p.draw = function() {
    img_scale.loadPixels();
    for(let i = 0; i < img_scale.width; i++) {
      for(let j = 0; j < img_scale.height; j++) {
        cells[i][j].update();
      }
    }

    img_scale.loadPixels();
    for(let i = 0; i < img_scale.width; i++) {
      for(let j = 0; j < img_scale.height; j++) {
        let index = (i * 4) + (j * img_scale.width * 4);
        if(cells[i][j].state) {
          if( i > 0 ) {
            let a = [img_scale.pixels[index - 4], img_scale.pixels[index-3], img_scale.pixels[index-2]];
            let b = [img_scale.pixels[index], img_scale.pixels[index+1], img_scale.pixels[index+2]];
            img_scale.pixels[index] = a[0];
            img_scale.pixels[index + 1] = a[1];
            img_scale.pixels[index + 2] = a[2];
            img_scale.pixels[index - 4] = b[0];
            img_scale.pixels[index - 3] = b[1];
            img_scale.pixels[index - 2] = b[2];
          }
        }
      }
    }
    img_scale.updatePixels();

    for(let i = 0; i < img_scale.width; i++) {
      for(let j = 0; j < img_scale.height; j++) {
        cells[i][j].display();
        let index = (i * 4) + (j * img_scale.width * 4);
        p.fill([img_scale.pixels[index], img_scale.pixels[index+1], img_scale.pixels[index+2], 50]);
        p.rect(i * scale_factor, j * scale_factor, scale_factor, scale_factor);
      }
    }

    if(p.frameRate % 10 == 0) {
      cells.push(cells[0]);
      cells.shift();
    }

    //p.save(p.frameCount + '.jpg');
  }

  let Cell = function(state, loc, x, y) {
    this.loc = loc;
    this.state = state;
    this.next; 
    this.x = x;
    this.y = y;
    this.flag = false;
    this.wait = 1;
    this.neighborhood = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0],  [0, 0],  [1, 0],
      [-1, 1],  [0, 1],  [1, 1]
    ];
    
    this.update = function() {
      let s = this.sum_n();
      if(this.state == 1) {
        this.next = 0;
        this.flag = true;
      } else if((this.state == 1) && (s > 2)) {
        this.next = 0;
        this.flag = true;
      } else if((this.state == 0) && (s == 2) && (!this.flag)) {
        this.next = 1;
      } else {
        this.flag = false;
        this.next = this.state; 
      }
    }

    this.display = function() {
      this.state = this.next;
      if(this.state) {
        //p.fill(0);
        //p.rect(this.loc.x, this.loc.y, 4, 4);
      }
    }

    this.sum_n = function() {
      let sum = 0;
      for(let i = 0; i < this.neighborhood.length; i++) {
        sum += cells[loopX(this.x + this.neighborhood[i][0])][loopY(this.y + this.neighborhood[i][1])].state;
      }
      sum -= this.state;
      return sum;
    }

  }
  
  function loopX(x){
    return (x + img_scale.width) % img_scale.width;
  }

  function loopY(y){
    return (y + img_scale.height) % img_scale.height;
  }
});


var Particle = function(renderer, loc, params) {
  this.params = params || {}
  this.renderer = renderer;
  this.loc = loc;
  this.acc = this.params.acc || this.renderer.createVector(0, 0);
  this.vel = this.params.vel || this.renderer.createVector(0, 0);
  
  // attract the particle towards a point and
  // returns the new particle location
  //
  // target: p5.Vector
  // params: {
  //   acc_scale: number,
  //   vel_limit: number
  // }
  //
  this.attract = function(target, params) {
    this.params = Object.assign({}, this.params, params);
    this.acc = target.sub(this.loc);
    this.acc.normalize();
    this.acc.mult(this.params.acc_scale || 0.5);

    this.vel.add(this.acc)
    this.vel.limit(this.params.vel_limit || 9);
    this.loc.add(this.vel);
    return this.loc;
  };

  // repels the particle away from a point and
  // return the new particle location
  //
  // target: p5.Vector
  // params: {
  //   acc_scale: number,
  //   vel_limit: number
  // }
  //
  this.repel = function(target, params) {
    this.params = Object.assign({}, this.params, params);
    if ( this.loc.dist(target) < 50 ) {
      this.acc = target.sub(this.loc);
      this.acc.normalize();
      this.acc.mult(this.params.acc_scale || 0.5);

      this.acc.mult(-1);
      this.vel.add(this.acc)
      this.vel.limit(this.params.vel_limit || 9);
      this.loc.add(this.vel);
    }
    return this.loc;
  };

  this.follow_noise = function(scale, strength, params) {
    this.params = Object.assign({}, this.params, params);

    if(this.params.noise) {
      let angle = this.params.noise(loc.x, loc.y) * strength;
    } else {
      let angle = this.renderer.noise(this.loc.x * scale, this.loc.y * scale) * strength;
    }

    let angle = this.renderer.noise(this.loc.x * scale, this.loc.y * scale) * strength;
    this.acc = this.renderer.createVector(this.renderer.cos(angle), this.renderer.sin(angle));
    this.acc.mult(this.params.acc_scale || 0.2);
    this.vel.add(this.acc)
    this.vel.limit(this.params.vel_limit || 1);
    this.loc.add(this.vel)
  }

  this.display = function(fill, size) {
    this.renderer.fill(fill);
    this.renderer.ellipse(this.loc.x, this.loc.y, size, size);
  };
}
