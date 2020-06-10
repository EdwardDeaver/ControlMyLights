//https://learn.adafruit.com/rgb-led-strips/arduino-code


int Red,Green,Blue; // Red, Green, Blue value from the hex conversion
String color; 
int FADESPEED = 30;
#define REDPIN 5
#define GREENPIN 6
#define BLUEPIN 3
 
void setup() {
  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
  
  // start serial port at 9600 bps:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  establishContact();  // send a byte to establish contact until receiver responds
        colorchangeexample();

}

void loop() {
  // if we get a valid byte, read analog ins:
  if (Serial.available() > 0) {
    String Message = Serial.readString(); 
    if(Message[0] == '#' && Message.length() == 9){
       color = Message.substring(1);
       convertStringHextoRGB(color);
    }
  }
}

// Conversion from https://stackoverflow.com/questions/23576827/arduino-convert-a-string-hex-ffffff-into-3-int
bool convertStringHextoRGB(String HexString){
    long number = (long) strtol( &color[0], NULL, 16);
    Red = number >> 16;
    Green = number >> 8 & 0xFF;
    Blue = number & 0xFF;
    Serial.print("red is ");
    Serial.println(Red);
    Serial.print("green is ");
    Serial.println(Green);
    Serial.print("blue is ");
    Serial.println(Blue);
    return true;
}


// Writes string data to serial port. 
void writeToScreen (String data){
// get incoming byte:
    int str_len = data.length() + 1; 
    char char_array[str_len];
     data.toCharArray(char_array, str_len);
     for (int i = 0; i<str_len; i++){
          Serial.write(char_array[i]);
     }
     Serial.write("\n");
}
// 
void establishContact() {
  while (Serial.available() <= 0) {
    Serial.println('1');   // send a capital 1
    delay(300);
  }
}

// Write data to the desired pin
void writeToRGB(int red, int green, int blue, int RedPin, int GreenPin, int BluePin){
    analogWrite(RedPin, red);
    analogWrite(GreenPin, green);
    analogWrite(GreenPin, blue);
}
void colorchangeexample(){
 int r, g, b;
 
  // fade from blue to violet
  for (r = 0; r < 256; r++) { 
    analogWrite(REDPIN, r);
    delay(FADESPEED);
  } 
  // fade from violet to red
  for (b = 255; b > 0; b--) { 
    analogWrite(BLUEPIN, b);
    delay(FADESPEED);
  } 
  // fade from red to yellow
  for (g = 0; g < 256; g++) { 
    analogWrite(GREENPIN, g);
    delay(FADESPEED);
  } 
  // fade from yellow to green
  for (r = 255; r > 0; r--) { 
    analogWrite(REDPIN, r);
    delay(FADESPEED);
  } 
  // fade from green to teal
  for (b = 0; b < 256; b++) { 
    analogWrite(BLUEPIN, b);
    delay(FADESPEED);
  } 
  // fade from teal to blue
  for (g = 255; g > 0; g--) { 
    analogWrite(GREENPIN, g);
    delay(FADESPEED);
  } 
  
}
