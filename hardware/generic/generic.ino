#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// constants won't change. They're used here to set pin numbers:
const char* ssid = ""; // replace with your WiFi network name
const char* password = "";
const int buttonPin = 4;  // the number of the pushbutton pin   // the number of the LED pin

const char* serverName = "http://192.168.1.91"; // your server name
const int serverPort = 3000; // 

int count = 0;
bool wifiConnected = false;

WiFiClient wifiClient;

// variables will change:
int buttonState = 0;  // variable for reading the pushbutton status

void setup() {
  Serial.begin(115200);
  delay(10);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);

  Serial.println("Arduino is connected your computer");

  return;
  // Connect to WiFi network
  Serial.println();
  Serial.println(); 
  Serial.print("Attempting to connect to wifi");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED && count < 15) {
    delay(500);
    Serial.print(".");
    count++;
  }

  if(WiFi.status() == WL_CONNECTED){
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.print("Could not connect to wifi");
  }
  
  
  count = 0;
}

void loop() { 
  buttonState = digitalRead(buttonPin);
  
  if(count > 99){
    Serial.println("Hey Dad, I limited the number of attempts to 100");
  }else{
    if (buttonState == HIGH) {
      Serial.println("Clicked " + String(count));
    }
  }
  
  count++;
}
