//-----------Beginner version!!!--------------
var carrier;
var modulator;


function setup() {
  createCanvas(800,400);
  noFill();
  background(0);


  carrier = new p5.Oscillator();
  carrier.freq(340);
  carrier.amp(0);

  carrier.start();

  modulator = new p5.TriOsc;
  modulator.disconnect();
  modulator.freq(5);
  modulator.amp(1);
  modulator.start();

  carrier.amp(modulator.scale(-1,1,1,-1));
}

function draw() {
  background(0);

  var modFreq = map(mouseY, 0, height, 20, 0);
  modulator.freq(modFreq);

  var modAmp = map(mouseX, 0, width, 0, 1);
  modulator.amp(modAmp, 0.01);
}
