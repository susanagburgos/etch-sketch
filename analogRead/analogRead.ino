/*
  Arduino Code - for AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

 This example code is in the public domain.
 */

// the setup routine runs once when you press reset:
void setup() {
  // initialize Serial communication 
  //we do this so we can read our data to the serial monitor
  Serial.begin(9600); // 9600 is the rate of communication
}

// the loop routine runs over and over again forever:
void loop() {
  // read our sensor value to a variable 
  // analogRead() on pint that we pluggged our sensor into
  int sensorValue = analogRead(A0); 

  // print our data so we can see it! like console.log
  Serial.println(sensorValue);
  
  // add a delay to slow things down a bit 
  delay(1);
   
}
