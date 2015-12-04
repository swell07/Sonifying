var carrier1, carrier2, carrier3, carrier4;
var modulator1, modulator2;
var feedbackGain1, feedbackGain2;
var modFreq1, modFreq2, carFreq1, carFreq2;//可变
var modAmp;

function setup(){
  createCanvas(600,400);
  background(0);

  carrier1 = new p5.Oscillator('sine');
  carrier1.amp(0);
  carrier1.freq(1);
  carrier1.start();

  carrier2 = new p5.Oscillator('sine');
  carrier2.start();

  modulator1 = new p5.Oscillator('sawtooth');
  modulator1.start();
  modulator1.disconnect();

  carrier1.freq(modulator1);
  carrier1.amp(0.3, 0.01);
}

function draw(){
  modFreq1 = floor(mouseY * 0.05) //integer(0,20)
  feedbackGain1 = map(mouseX, 0, width, 0, 0.3);
  modAmp = (mouseX, 0, width, 0, 0.6);

  modulator1.freq(modFreq1);
  carrier1.amp(feedbackGain1, 0.05);

  carrier2.freq(carrier1);
  carrier2.amp(modAmp, 0.05);

}
