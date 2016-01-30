import processing.serial.*;
import cc.arduino.*;

Arduino arduino;

color off = color(4, 79, 111);
color on = color(84, 145, 158);

int numR = 10;
float[] readings = new float[numR];
int readIndex = 0;
float total = 0;
float average = 0;

void setup() {
  size(470, 280);
  arduino = new Arduino(this, "/dev/tty.usbmodem1451", 57600);
  //readings = new float[numR];  
  for (int i = 0; i < readings.length; i++) {
    readings[i] = 0.0;
  }
}

void draw() {
  background(off);
  stroke(on);

  //println(arduino.analogRead(0));
  total = total - readings[readIndex];
  readings[readIndex] = arduino.analogRead(0);
  total = total + readings[readIndex];
  readIndex ++;

  if (readIndex >= numR) {
    readIndex = 0;
  }

  average = total / numR;
  println(average);

 }
