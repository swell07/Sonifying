//-----------------Dealy FUNCTION!!--------------
var carrier;
var modulator;
var feedbackGain;
var modFreq;//可变
var modAmp;
var filter;
var delay, delaytime;
var env;

function setup(){
  createCanvas(600,400);
  background(0);

  delay = new p5.Delay();
  //＊改volume control 
  env = new p5.Env(.01, 0.2, .2, .1);

  carrier = new p5.Oscillator('sine');
  carrier.amp(0);
  carrier.freq(120);
  carrier.start();

  modulator = new p5.Oscillator('sawtooth');
  modulator.start();

  modulator.disconnect();
  carrier.freq(modulator1);
  delaytime = .12;
  feedbackGain = .4;
//last parameter-low pass frequency
  delay.process(carrier, delaytime, feedbackGain, 300)
}

function draw(){

}

function mouseDragged(){
  modFreq1 = floor(mouseY * 0.1) //integer(0,20)
  feedbackGain1 = map(mouseX, 0, width, 0, .8);
  modAmp = (mouseX, 0, width, -50, 10);
  
  var modDepth = map(mouseX, 0, width, -50, -25);
  var filterFreq = map (mouseX, 0, width, 10, 300);
  var filterRes = map(mouseY, 0, height, 15, 5);

  modulator1.freq(modFreq1);
  modulator1.amp(modDepth, 0.01);
  
  carrier1.amp(feedbackGain1, 0.01)

}

function mouseReleased(){
env.play(carrier1);
carrier1.amp(0, 1.5);
}
