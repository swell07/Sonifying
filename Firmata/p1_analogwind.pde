import processing.serial.*;
import beads.*;
import org.jaudiolibs.beads.*;

Serial myPort;  // Create object from Serial class
int val;      // Data received from the serial port

boolean playnoise;

AudioContext ac;
WavePlayer wp;
Noise n;
BiquadFilter filter1;
Glide gainValue;
Gain g;

void setup() 
{
  size(200, 200);
  String portName = "/dev/tty.usbmodem1451";//Serial.list()[0];
  myPort = new Serial(this, portName, 9600);

  playnoise = false;

  ac = new AudioContext();
  n = new Noise(ac);
  //WavePlayer wp = new WavePlayer(ac, 0.5, Buffer.NOISE);
  filter1 = new BiquadFilter(ac, BiquadFilter.BP_SKIRT, 0.0f, 0.0f);
  gainValue = new Glide(ac, 0.0, 20);
  g = new Gain(ac, 1, gainValue);

  filter1.addInput(n);
  g.addInput(filter1); 
  ac.out.addInput(g);
  ac.start();
}

void draw()
{
  while (myPort.available() > 0) {
    int inByte = myPort.read();
    println(inByte);

    if (inByte > 10) {
      gainValue.setValue(0.5);
      noiseupdate(inByte);
    } else {
      noisestop();
    }
  }
}

void noiseupdate(float x) {
  float filterFreq = map(x, 0, 255, 200, 8000);
  float filterWidth = map(x, 255, 0, 1, 30);
 
  filter1.setFrequency(filterFreq);
  filter1.setQ(filterWidth);
}

void noisestop() {
  gainValue.setValue(0.0);
}
