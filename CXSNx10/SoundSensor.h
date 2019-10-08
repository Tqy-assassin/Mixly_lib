#ifndef SoundSensor_h
#define SoundSensor_h 

#include <inttypes.h>
#include <Arduino.h>
#include <SoftwareSerial.h>

#define MODE_ASR 1
#define MODE_TTS 2
#define MODE_WORD 4
#define MODE_DIA 8


class SoundSensor
{
  public:
     //VisionSensor(HardwareSerial &uart, uint32_t baud = 115200);
     SoundSensor(uint32_t baud = 115200);
     // ~SoundSensor();
     void SetPort(int pin);
     void Search(void);
     void begin(void);
     void SetMode(int mode);
     void SetWiFi(String SSID,String PASSWORD);
     String AsrResult(void);
     void TtsContent(String str);
     bool Result_flag(void);
     void WaitInit(void);
     
  
  private:
     bool _valid;
     uint32_t _baud;
     String asr_result;
     SoftwareSerial *SoundSensorSerial_p;
};

#endif