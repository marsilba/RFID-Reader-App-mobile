#include <WiFi.h>
#include <HTTPClient.h>

//inclusão de algumas bibliotecas
#include <SPI.h>
#include <MFRC522.h>

const char* ssid = "XXXXXX";
const char* password =  "XXXXXX";

int Led_Red = 26;
int Led_Green = 27;
int leuRfid = 1;

//define alguns pinos do esp32 que serao conectados aos modulos e componentes
#define SS_PIN 21
#define RST_PIN 22

MFRC522 mfrc522(SS_PIN, RST_PIN);   // define os pinos de controle do modulo de leitura de cartoes RFID

void setup() {

  pinMode (Led_Red, OUTPUT); 
  pinMode (Led_Green, OUTPUT); 

  
  Serial.begin(115200);
  delay(4000);

  SPI.begin();   // inicia a comunicacao SPI que sera usada para comunicacao com o mudulo RFID

  mfrc522.PCD_Init();  //inicia o modulo RFID 

  Serial.println("RFID + ESP32");
  Serial.println("Aguardando tag RFID para verificar o id da mesma.");
 
  WiFi.begin(ssid, password); 
 
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(500);
    Serial.println("Connecting..");
  }
 
  Serial.print("Connected to the WiFi network with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println(WiFi.gatewayIP());  
}
 
void loop() {

  digitalWrite (Led_Red, LOW); // LED off
  digitalWrite (Led_Green, HIGH); // LED on

  if(leuRfid == 2){
    delay(500);
    leuRfid = 1;
  }
 
 if(WiFi.status()== WL_CONNECTED){   //Checa WiFi status
 
   HTTPClient http;

    if ( ! mfrc522.PICC_IsNewCardPresent()) {
       return;                 // se nao tiver um cartao para ser lido recomeça o void loop
    }
    if ( ! mfrc522.PICC_ReadCardSerial()) {
      return;                  //se nao conseguir ler o cartao recomeça o void loop tambem
    }
  
    String conteudo = "";      // cria uma string
  
    Serial.print("id da tag :"); //imprime na serial o id do cartao
  
    for (byte i = 0; i < mfrc522.uid.size; i++){       // faz uma verificacao dos bits da memoria do cartao
       //ambos comandos abaixo vão concatenar as informacoes do cartao...
       //porem os 2 primeiros irao mostrar na serial e os 2 ultimos guardarao os valores na string de conteudo para fazer as verificacoes
       Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : "");
       Serial.print(mfrc522.uid.uidByte[i], HEX);
       conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : ""));
       conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
    }

  
    if(conteudo != ""){
    //String cod = conteudo.toUpperCase();

    leuRfid = 2;    

    digitalWrite (Led_Red, HIGH); // LED on
    digitalWrite (Led_Green, LOW); // LED off

   http.begin("http://192.168.XX.XX:8080/");  //Especifica destino do HTTP request prrencher com o IP
   http.addHeader("Content-Type", "text/plain");  //Especifica content-type header
 
   int httpResponseCode = http.POST(conteudo);   //Envia POST atual
 
   if(httpResponseCode>0){
 
    Serial.println(httpResponseCode);   //Printa codigo de retorno
    delay(2000);
 
   }else{
 
    Serial.print("Error on sending request: ");
    Serial.println(httpResponseCode);
 
   }  
  
  }
   
 
   http.end();  //Free resources
 
 }else{
 
    Serial.println("Error in WiFi connection");   
 
 }
 
}
