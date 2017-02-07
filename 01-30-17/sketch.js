const p5 = require('p5');

new p5(p => {

  let palettes, palette, cl, last, next, count;

  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    // palette = palettes[Math.floor(p.random() * 100)].palette;
    palette = palettes[12].palette;
    p.background(palette[0]);
    p.noFill();
    count = 0;
    cl = [];
    for(let i = 0; i < 16; i++) {
      cl[i] = new CrawlLine(p.createVector(p.width/2, p.map(i, 0, 16, 0, p.height)), 5, (i + 1) % 5, {
        reset: true
      });
    }
  }

  p.draw = function() {
    cl.forEach( i => i.draw());
    if(p.frameCount % 4 == 0) {
      // p.save(p.frameCount + '.jpg');
    }
  }

  let CrawlLine = function(start, step_size, col, params) {
    this.last1;
    this.last2;
    this.start = start;
    this.step_size = step_size;
    this.crawler1 = new Crawler(this.start, this.step_size)
    this.crawler2 = new Crawler(this.start, this.step_size)
    this.col = col;
    this.params = params;

    this.draw = function() {
      if (this.params.reset) {
        if ((this.crawler1.loc.x < 0) || (this.crawler1.loc.x > p.width) ||
          (this.crawler1.loc.y < 0) || (this.crawler1.loc.y > p.height)) {
          this.crawler1 = new Crawler(this.start, this.step_size)
          this.crawler2 = new Crawler(this.start, this.step_size)
        }
      }
      this.last1 = this.crawler1.loc.copy();
      this.last2 = this.crawler2.loc.copy();
      this.crawler1.update();
      this.crawler2.update(6 - this.crawler1.dir);

      p.fill(palette[this.col][0], palette[this.col][1], palette[this.col][2], 30);
      p.stroke(palette[this.col][0], palette[this.col][1], palette[this.col][2], 50);

      if(p.random() < 0.5) {
        // p.line(this.last1.x, this.last1.y, this.crawler1.loc.x, this.crawler1.loc.y);
        // p.line(this.last2.x, this.last2.y, this.crawler2.loc.x, this.crawler2.loc.y);
      } else {
        for( let i = 0; i < 4; i++) {
          let x = p.map(i, 0, 4, this.crawler1.loc.x, this.last1.x);
          let y = p.map(i, 0, 4, this.crawler1.loc.y, this.last1.y);
          p.ellipse(x, y, 3, 3);
          x = p.map(i, 0, 4, this.crawler2.loc.x, this.last2.x);
          y = p.map(i, 0, 4, this.crawler2.loc.y, this.last2.y);
          p.ellipse(x, y, 3, 3);
        }
      }
      // } else {
      //   let s = shape(this.crawler1);
      //   shape(this.crawler2, s.map( i => 6 - i));
      // }
    }
  }

  function shape(crawler, dirs) {
    console.log(dirs);
    if(dirs === undefined) {
      dirs = []
      for(let i = 0; i < 3; i++) {
        dirs[i] = Math.floor(p.random(6));
      }
    }

    p.beginShape();
    dirs.forEach( dir => {
      p.vertex(crawler.loc.x, crawler.loc.y);
      crawler.update(dir);
      p.vertex(crawler.loc.x, crawler.loc.y);
      crawler.update(dir);
      p.vertex(crawler.loc.x, crawler.loc.y);
      crawler.update(dir);
      p.vertex(crawler.loc.x, crawler.loc.y);
      p.endShape();
    })

    return dirs;
  }

  let Crawler = function(loc, step_size) {
    this.loc = loc.copy();
    this.step_size = step_size;
    this.last_dir;
    this.dir = 0;

    this.update = function(dir) {
      this.last_dir = this.dir
      if(dir) {
        this.dir = dir;
      } else {
        while(this.last_dir == this.dir) {
          this.dir = Math.floor(p.random(6));
        }
      }
      let step, angle = 0;

      for(let i = 0; i < 6; i++) {
        if( i < this.dir ) {
          angle = (p.TWO_PI/ 6.0) * (i + 1);
        }
      }

      step = p.createVector(p.sin(angle) * this.step_size, p.cos(angle) * this.step_size);
      this.loc.add(step);
      return this.loc;
    };

    this.display = function() {
      p.ellipse(this.loc.x, this.loc.y, 2, 2);
    }
  }
});

