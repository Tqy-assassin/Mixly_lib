#ifndef VisionSensor_h
#define VisionSensor_h 

#include <inttypes.h>
#include <Arduino.h>
#include <SoftwareSerial.h>

#define CARD 7
#define MULTIFACE 6
#define MOVINGOBJECT 5
#define FACE 4
#define BODY 3
#define LINE 2
#define BALL 1
#define Card_Squar 3
#define Card_Trian 2
#define Card_Round 1

class VisionSensor
{
  public:
   VisionSensor(uint32_t baud = 115200);
   void SetPort(int pin);
   void begin(uint8_t Y);
   void begin(void);
   boolean Valid(void);
   boolean Detected(uint8_t x);
   boolean Search(void);
   uint8_t Detected(void);
   uint8_t GetX(void);
   uint8_t GetY(void);
   uint8_t GetWidth(void);
   uint8_t GetHeight(void); 
  private:
   uint8_t dataDetected;
   uint8_t dataX,dataY,dataWidth,dataHeight;
   uint8_t comdata[8], data_p = 0; 
   uint32_t _baud;
   boolean _valid;
   SoftwareSerial *mySerial_p;
};

#endif