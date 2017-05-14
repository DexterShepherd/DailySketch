const p5 = require('p5');
const sound = require('p5/lib/addons/p5.sound.js');


new p5(p => {
  let input, detail, count, spectrum, peaks,
    lowFFT, midFFT, highFFT, lp, bp, hp,
    low, mid, high, playback, mute;

  p.preload = function() {
    playback = p.loadSound('data/mike-gao.mp3');
    low = p.loadSound('data/mike-gao.mp3');
    mid = p.loadSound('data/mike-gao.mp3');
    high = p.loadSound('data/mike-gao.mp3');
  }

  p.setup = function() {
    const canvas = p.createCanvas(800, 800);
    p.noFill();
    p.stroke('#FFFAD5');
    setupAudio();
  }

  p.draw = function() {
    p.background('#BD4932');

    updateAudio();
    p.beginShape();
    for (var i = 0; i < 100; i++){
      var x = p.map(i, 0, spectrum["high"].length, 0, p.width);
      var h = -p.height + p.map(spectrum["high"][i], 0, 255, p.height, 0);
      p.rect(x, p.height, p.width / spectrum["high"].length, h )
    }
    p.endShape();
  }


  function setupAudio() {
    lowFFT = new p5.FFT();
    midFFT = new p5.FFT();
    highFFT = new p5.FFT();

    low.disconnect();
    mid.disconnect();
    high.disconnect();

    lp = new p5.LowPass();
    lp.freq(100);
    bp = new p5.BandPass();
    bp.freq(500);
    bp.res(10);
    hp = new p5.HighPass();
    hp.freq(1000);

    lp.disconnect();
    bp.disconnect();
    hp.disconnect();

    low.connect(lp);
    mid.connect(bp);
    high.connect(hp);

    lowFFT.setInput(lp);
    midFFT.setInput(bp);
    highFFT.setInput(hp);

    playback.loop();

    low.loop();
    mid.loop();
    high.loop();


    mute = new p5.Gain();

    lp.connect(mute);
    bp.connect(mute);
    hp.connect(mute);

    mute.amp(0);

  }

  function updateAudio() {
    spectrum = {
      "low": lowFFT.analyze(),
      "mid": midFFT.analyze(),
      "high": highFFT.analyze()
    }; 
  }
});

