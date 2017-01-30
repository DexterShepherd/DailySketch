const p5 = require('p5');

new p5(p => {

  let palettes, palette, cl, last, next, count;

  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    palette = palettes[30].palette;
    p.background(palette[0]);
    p.noFill();
    count = 0;
    cl = [];
    for(let i = 0; i < 4; i++) {
      cl[i] = new CrawlLine(p.createVector(p.width/2, 20), p.random(2, 4), palette[3], {
        reset: true
      });
    }
  }

  p.draw = function() {
    p.translate(0, count);
    cl.forEach( i => {
      i.draw();
    });
    count = (count + 0.5) % p.height;
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
      this.crawler2.update(12 - this.crawler1.dir);
      let col = 1 + Math.floor(p.random(4));

      p.fill(palette[col][0], palette[col][1], palette[col][2], 5);
      p.stroke(palette[col][0], palette[col][1], palette[col][2], 10);

	
      let choice = p.random();
      if(choice < 0.2) {
        p.line(this.last1.x, this.last1.y, this.crawler1.loc.x, this.crawler1.loc.y);
        p.line(this.last2.x, this.last2.y, this.crawler2.loc.x, this.crawler2.loc.y);
      } else if (choice < 0.3) {
        let s = shape(this.crawler1);
        shape(this.crawler2, s.map( i => 12 - i));
      }
    }
  }

  function shape(crawler, dirs) {
    console.log(dirs);
    if(dirs === undefined) {
      dirs = []
      for(let i = 0; i < 10; i++) {
        dirs[i] = Math.floor(p.random(12));
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
          this.dir = Math.floor(p.random(12));
        }
      }
      let step, angle = 0;

      for(let i = 0; i < 12; i++) {
        if( i < this.dir ) {
          angle = (p.TWO_PI/ 12.0) * (i + 1);
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
