var source, filter, delay, feedbackGain, volume;
var delaytime, filterFreq, filterRes, sourceFreq;
var playit;

function setup(){
 createCanvas(600,600);
 background(0);

 playit = false;
 source = new p5.Oscillator('sine');
 filter = new p5.LowPass();
 delay = new p5.Delay();
 volume = new p5.Gain();
 feedbackGain = new p5.Gain();

 delaytime = .25;
 delay.delayTime(delaytime);

 //source.disconnect();

}

function draw(){
  if(!playit){
    stopOsc();

  }else{
    sourceFreq = floor(mouseY * 10);

    filterFreq = map(mouseX, 0, width, 10, 300);
    filterRes = map(mouseY, 0, height, 15, 5);
    filter.set(filterFreq, filterRes);

    var vol = map(mouseX, 0, width, 0, .4);
    feedbackGain.amp(vol, 0.1, 0);

    routeSound();
    startOsc();
  }
}

function startOsc(){
  source.start();
  volume.amp(0.5, 1);
}

function stopOsc(){
  source.stop();
  feedbackGain.amp(0, 0.2);
  delay.disconnect();
  volume.amp(0, 0.4);
  volume.disconnect();

}

function routeSound(){
  source.connect(filter);
  filter.connect(volume);
  filter.connect(delay);
  delay.connect(feedbackGain);
  feedbackGain.connect(volume);
  feedbackGain.connect(delay);
  volume.connect();
}

function mousePressed(){
  playit = true;
  println(playit);
}

function mouseReleased(){
  playit = false;
  println(playit);
}
