const p5 = require('p5');

new p5(p => {
  let img, cells, num_cols, num_rows; 

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    cells = [];
    num_cols = 128;
    num_rows = 128;


    for(let i = 0; i < num_cols; i++) {
      cells[i] = []
      for(let j = 0; j < num_rows; j++) {
        cells[i][j] = new Cell(Number(p.random() > 0.5), p.createVector((p.width/num_cols) * i, (p.height/num_rows) * j), i, j);
      }
    }

    p.fill(10);
  }

  p.draw = function() {
    p.background(240, 20);
    p.translate((p.width/num_cols)/2, (p.height/num_rows)/2)
    for(let i = 0; i < num_cols; i++) {
      for(let j = 0; j < num_rows; j++) {
        cells[i][j].update();
      }
    }

    for(let i = 0; i < num_cols; i++) {
      for(let j = 0; j < num_rows; j++) {
        cells[i][j].display();
      }
    }

    if(p.frameRate % 10 == 0) {
      cells.push(cells[0]);
      cells.shift();
    }
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
        p.rect(this.loc.x, this.loc.y, 4, 4);
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
    return (x + num_cols) % num_cols;
  }

  function loopY(y){
    return (y + num_rows) % num_rows;
  }
});


