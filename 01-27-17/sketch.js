const p5 = require('p5');

new p5(p => {

  let palettes, palette, cl, last, next, count;

  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    palette = palettes[4].palette;
    p.background(palette[0]);
    p.noFill();
    count = 0;
    cl = new CrawlLine(p.createVector(p.width/2, p.height/2), 10, palette[3], {
      reset: true
    });
  }

  p.draw = function() {
    cl.draw();
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
      let col = 1 + Math.floor(p.random(4));

      p.fill(palette[col][0], palette[col][1], palette[col][2], 30);
      p.stroke(palette[col][0], palette[col][1], palette[col][2], 50);

      if(p.random() < 0.5) {
        p.line(this.last1.x, this.last1.y, this.crawler1.loc.x, this.crawler1.loc.y);
        p.line(this.last2.x, this.last2.y, this.crawler2.loc.x, this.crawler2.loc.y);
      } else {
        let s = shape(this.crawler1);
        shape(this.crawler2, s.map( i => 6 - i));
      }
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
