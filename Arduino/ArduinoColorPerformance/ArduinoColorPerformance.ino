#define REDPIN 5
#define GREENPIN 6
#define BLUEPIN 3
String inputString = "";         // a String to hold incoming data

void setup() {
    pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
  // put your setup code here, to run once:
  // Note line fees and carraige return count toward the length of your input size
  
#define INPUT_SIZE 20
  // start serial port at 9600 bps:
  // start serial port at 9600 bps:
  Serial.begin(115200);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  inputString.reserve(200);


  establishContact(); 
}

void loop() {
   /* int red, green, blue; 

    if (Serial.available() > 0) {

  // put your main code here, to run repeatedly:
// Get next command from Serial (add 1 for final 0)
    char input[INPUT_SIZE + 1];
    byte size = Serial.readBytes(input, INPUT_SIZE);
    // Add the final 0 to end the C string
    input[size] = 0;
       // Serial.write("input");

    //Serial.write(input);
    // Read each command pair 
    char* command = strtok(input, ":");

    red = atoi(command);
    while (command != 0)
    {
        // Split the command in two values
        char* separator = strchr(command, ':');

       
         if (separator != 0)
        {
            // Actually split the string in 2: replace ':' with 0
            *separator = 0;
             green = atoi(command);

            ++separator;
              blue = atoi(separator);

            // Do something with servoId and position
        } 
        // Find the next command in input string
        command = strtok(0, "&");
    } 
  // Write data to the desired pin

 writeToRGB(red,  green,  blue);
    }
    */
 
}
void writeToRGB(int red, int green, int blue){
    Serial.println(red);
    Serial.println(green);
    Serial.println(blue);
    analogWrite(REDPIN, red);
    analogWrite(GREENPIN, green);
    analogWrite(BLUEPIN, blue);
}
void establishContact() {
  while (Serial.available() <= 0) {
    Serial.println('1');   // send a capital 1
    delay(300);
  }
}





/*
  SerialEvent occurs whenever a new data comes in the hardware serial RX. This
  routine is run between each time loop() runs, so using delay inside loop can
  delay response. Multiple bytes of data may be available.
*/
void serialEvent() {
        int red, green, blue; 
  while (Serial.available()>0) {
    char inChar = (char)Serial.read();

    if(inChar=='\n'){
      Serial.println("\n BREAK");

      break;
    }
    else{
      //Serial.print("input char");
      //Serial.print(inChar);
      inputString += inChar;

    }

  }
 
        Serial.println(inputString);
        Serial.println(inputString.substring(0,3));
        Serial.println((inputString.substring(0,3)).toInt());
                Serial.println(inputString);
        Serial.println(inputString.substring(4,7));
        Serial.println((inputString.substring(4,7)).toInt());
                        Serial.println(inputString);
        Serial.println(inputString.substring(8,11));
        Serial.println((inputString.substring(8,11)).toInt());
        
        writeToRGB((inputString.substring(0,3)).toInt(),  (inputString.substring(4,7)).toInt(),   (inputString.substring(8,11)).toInt());
        
      inputString = "";
  // put your main code here, to run repeatedly:
// Get next command from Serial (add 1 for final 0)
  //  char input[INPUT_SIZE + 1];
   // byte size = Serial.readBytes(input, INPUT_SIZE);
     //  Serial.println(size);   // send a capital 1
/*
    // Add the final 0 to end the C string
    input[size] = 0;
       // Serial.write("input");

    //Serial.write(input);
    // Read each command pair 
    char* command = strtok(input, ":");

    red = atoi(command);
    while (command != 0)
    {
        // Split the command in two values
        char* separator = strchr(command, ':');

       
         if (separator != 0)
        {
            // Actually split the string in 2: replace ':' with 0
            *separator = 0;
             green = atoi(command);

            ++separator;
              blue = atoi(separator);

            // Do something with servoId and position
        } 
        // Find the next command in input string
        command = strtok(0, "&");
    } 
  // Write data to the desired pin

 writeToRGB(red,  green,  blue);
  }
  */
}
