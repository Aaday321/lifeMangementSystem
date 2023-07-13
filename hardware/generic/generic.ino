#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// constants won't change. They're used here to set pin numbers:
const char* ssid = ""; // replace with your WiFi network name
const char* password = "";
const int buttonPin = 4;  // the number of the pushbutton pin   // the number of the LED pin

const char* serverName = "http://192.168.1.91"; // your server name
const int serverPort = 3000; // 


//debugging variables
int count = 0;
int rateLimit = 1000;
bool wifiConnected = false;
bool removeLimit = false;

WiFiClient wifiClient;

// variables will change:
int buttonState = 0;  // variable for reading the pushbutton status

void setup() {
  Serial.begin(115200);
  delay(5000);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);

  Serial.println("Arduino is connected your computer");

  // Connect to WiFi network
  Serial.println();
  Serial.println(); 
  Serial.print("Attempting to connect to wifi");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED && count < 20) {
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
    Serial.println();
    Serial.print("Could not connect to wifi");
    Serial.println();
    Serial.print("Program starting in 2.5 seconds...");
    delay(2500);
  }
  
  
  count = 0;
}

void loop() { 
  buttonState = digitalRead(buttonPin);
  
  if(buttonState == LOW && removeLimit == false){
    removeLimit = true;
  }
    
  if(count == rateLimit && removeLimit == false){
    Serial.println("Hey Dad, I limited the number of attempts to " + String(rateLimit));
    Serial.println("If the button state is ever LOW, this limit will be programmatically removed");
  }else if(count < rateLimit || removeLimit == true){
    if (buttonState == HIGH) {
      Serial.println("Clicked " + String(count));
    }
  }
  
  count++;
}
