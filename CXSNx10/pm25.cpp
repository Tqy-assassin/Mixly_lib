
#include "pm25.h"
//读取PM2.5
float CXSNX10_pm25_Sensor::Read_PM2_5(int pin)
{
  int InPin,OutPin;
  float voMeasured,calcVoltage,dustDensity;
  if(pin == A0)
  {
      InPin = A0;
      OutPin = 6;
  }
  else if(pin == A1)
  {
      InPin = A1;
      OutPin = 8;
  }
  else if(pin == A2)
  {
      InPin = A2;
      OutPin = 10;
  }
  pinMode(OutPin,OUTPUT);
  pinMode(InPin,INPUT);
  
  
  digitalWrite(OutPin,LOW); 
  delayMicroseconds(280);
  voMeasured = analogRead(InPin); 
  delayMicroseconds(40);
  digitalWrite(OutPin,HIGH);
  delayMicroseconds(9680);
  
  calcVoltage = voMeasured * (5.0 / 1024.0);
  dustDensity = 0.17 * calcVoltage - 0.1;
  if(dustDensity < 0 ) dustDensity = 0.1;
  
  return voMeasured;
}
