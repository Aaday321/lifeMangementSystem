#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// constants won't change. They're used here to set pin numbers:
const char* ssid = ""; // replace with your WiFi network name
const char* password = "";
const int buttonPin = 4;  // the number of the pushbutton pin   // the number of the LED pin
bool pressed = false;
const char* serverName = "http://192.168.1.91"; // your server name
const int serverPort = 3000; // 

int count = 0;

WiFiClient wifiClient;

// variables will change:
int buttonState = 0;  // variable for reading the pushbutton status

void setup() {
  Serial.begin(115200);
  delay(10);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);

  Serial.println("Connected");
  Serial.println(digitalRead(buttonPin));

  return;
  // Connect to WiFi network
  Serial.println();
  Serial.println(); 
  Serial.print("connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

}

void loop() { 
  if(count > 4){
    return;
  }
  Serial.println("Digital Read:");
  Serial.println(digitalRead(buttonPin));
  count++;
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  
  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    pressed = true;
    Serial.println("Clicked");
  }
}
