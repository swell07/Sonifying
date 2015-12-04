var oscs = [];
var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
var note = 0;

function setup(){
  createCanvas(700,400);
  fft = new p5.FFT();
  for (var i = 0; i < 5; i++){
    oscs[i] = new p5.SinOsc();
    // oscs[i].freq((i+1) * 220);
    // oscs[i].pan(2 * mouseX/width - 1, 0.1);
    // oscs[i].amp(0.5/(i+1));
    oscs[i].start();
  }
}

function draw(){
  background(0);

  if (frameCount % 60 == 0) {
      // var midiValue = scaleArray[note];
      // var freqValue = midiToFreq(midiValue);
      for (var i = 0; i < 5; i++) {
        oscs[i].freq((i+1) * 350)
        oscs[i].pan(0.2)//2 * mx/width - 1, 0.1)
        //reverb.process(oscs[i], 2, 5)
        var envelope = new p5.Env(0.01, 0.5/(i+1), 0.5, 0.2/(i+1))
        oscs[i].start()
        envelope.play(oscs[i])
}
      note = (note + 1) % scaleArray.length;
    }

  var spectrum = fft.analyze();
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
}
