const p5 = require('p5');

new p5(p => {

  let palettes, palette, cl, last, next;

  p.preload = function() {
    palettes = p.loadJSON('./kuler-palette.json');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    palette = palettes[50].palette;
    p.background(palette[0]);
    cl = [];
    for(let i = 2; i < 5; i++) {
      cl[i] = new CrawlLine(p.createVector(p.random(800), p.random(800)), 15, palette[i]);
    }
  }

  p.draw = function() {
    cl.forEach( l => {
      l.draw();
    });
  }

  let CrawlLine = function(start, step_size, col) {
    this.last;
    this.start = start;
    this.step_size = step_size;
    this.crawler = new Crawler(this.start, this.step_size)
    this.col = col;

    this.draw = function() {
      if ((this.crawler.loc.x < 0) || (this.crawler.loc.x > p.width) || 
        (this.crawler.loc.y < 0) || (this.crawler.loc.y > p.height)) {
        this.crawler = new Crawler(this.start, this.step_size)
      }
      this.last = this.crawler.loc.copy();
      this.crawler.update();
      p.stroke(this.col[0], this.col[1], this.col[2], 70);
      p.line(this.last.x, this.last.y, this.crawler.loc.x, this.crawler.loc.y);
    }
  }

  let Crawler = function(loc, step_size) {
    this.loc = loc.copy();
    this.step_size = step_size;
    this.last_dir;
    this.dir;

    this.update = function() {
      this.last_dir = this.dir
      while(this.last_dir == this.dir) {
        this.dir = Math.floor(p.random(6));
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


