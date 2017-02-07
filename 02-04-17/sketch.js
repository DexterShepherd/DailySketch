const p5 = require('p5');

new p5(p => {
  let walkers;
  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    walkers = [];
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++) {
        walkers.push( new Crawler(p.createVector(100 + (j * 200), 100 + (i * 200)), 15,  i + j + 3));
      }
    }
    p.background('#2E0927');
  }

  p.draw = function() {
    walkers.forEach( w => {
      w.update();
      w.display();
    })
  }


  let Crawler = function(loc, step_size, angle_size) {
    this.loc = loc.copy();
    this.or_loc = loc.copy();
    this.step_size = Math.floor(step_size);
    this.last_dir;
    this.dir = 0;
    this.steps = 0;
    this.angle_size = angle_size;
    this.dead = false;

    this.update = function() {
      if(this.loc.dist(this.or_loc) > 100) {
        // this.loc = this.or_loc.copy();
        this.dead = true;
      }

      if(!this.dead) {
        if (this.steps == this.step_size) {
          this.dir = Math.floor(p.random(this.angle_size));
          this.steps = 0;
        } 

        let step, angle = 0;

        for(let i = 0; i < this.angle_size; i++) {
          if( i < this.dir ) {
            angle = (p.TWO_PI/ this.angle_size) * (i + 1);
          }
        }

        step = p.createVector(p.sin(angle), p.cos(angle));
        this.loc.add(step);
        this.steps += 1;
        }
      return this.loc;
    };

    this.display = function() {
      p.fill(p.lerpColor(p.color('#04756F'), p.color('#FF2D00'), this.loc.y/p.height));
      p.stroke(p.lerpColor(p.color('#04756F'), p.color('#FF2D00'), this.loc.y/p.height));
      p.ellipse(this.loc.x, this.loc.y, 1, 1);
    }
  }
});

