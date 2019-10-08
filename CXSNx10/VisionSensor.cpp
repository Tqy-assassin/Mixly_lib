
#include <SoftwareSerial.h>
#include <VisionSensor.h>
//***********************************

SoftwareSerial mySerial(14,15);
VisionSensor::VisionSensor(uint32_t baud)
{
	_baud = baud;
	_valid = false;
	SetPort(A0);
}
void VisionSensor::SetPort(int pin)
{
	int Rxpin,Txpin;
	if(pin==A0)
	{
		Rxpin=A0;
		Txpin=A1;
	}
	else
	{
		Rxpin=A2;
		Txpin=A3;
	}
	delete mySerial_p;
	mySerial_p = new SoftwareSerial(Rxpin,Txpin);
}
void VisionSensor::begin(uint8_t Y)
{
  mySerial_p->begin(115200);
	mySerial_p->println("CMD+SENSOR_SETUP");
  delay(4000);
if(Y==3)
{
    mySerial_p->println("CMD+VISION_TYPE=BODY");
  delay(4000);
}
if(Y==1)
{
  mySerial_p->println("CMD+VISION_TYPE=BALL");
  delay(4000);
}
if(Y==4)
{
	mySerial_p->println("CMD+VISION_TYPE=FACE");
  delay(4000);
}
if(Y==2)
{
	mySerial_p->println("CMD+VISION_TYPE=LINE");
  delay(4000);
}
if(Y==5)
{
	mySerial_p->println("CMD+VISION_TYPE=MOVINGOBJECT");
  delay(4000);
}
if(Y==6)
{
	mySerial_p->println("CMD+VISION_TYPE=MULTIFACE");
    delay(4000);
}
if(Y==7)
{
	mySerial_p->println("CMD+VISION_TYPE=CARD");
  delay(4000);
}  

	mySerial_p->println("CMD+UART_OUTPUT=CALLBACK");
  delay(4000);

	mySerial_p->println("CMD+SENSOR_SAVE");
  delay(4000);

	mySerial_p->println("CMD+SENSOR_EXIT");
	if(Y==6)
    mySerial_p->println("CMD+VISION_OPTION=FACETRAIN");
	mySerial_p->begin(_baud);
    while(mySerial_p->available()>0)	
	{
		mySerial_p->read();
	}
}
void VisionSensor::begin(void)
{
  mySerial_p->begin(_baud);
  while(mySerial_p->available()>0)
  {
	  mySerial_p->read();
  }
}
boolean VisionSensor::Valid(void)
{
  return _valid;
}

boolean VisionSensor::Search(void)
{
   delay(30);
  mySerial_p->println("CMD+VISION_DETECT=RESULT");
	while(mySerial_p->available() >= 8)
 {
	  uint8_t dataByte = mySerial_p->read();
	  uint8_t dataCount = 0;
    if (dataByte == 0xFF) {
      memset(comdata, 0, sizeof(comdata));
      comdata[dataCount] = dataByte;
      dataCount++;
	  	dataByte = mySerial_p->read();
      if (dataByte == 0xFE) {
        comdata[dataCount] = dataByte;
        dataCount++;
      } else {
        continue;
      }
      for (;(dataCount < sizeof(comdata))&&(comdata[dataCount]!=0xED);dataCount++) {
	   	dataByte = mySerial_p->read();
        comdata[dataCount] = dataByte;
      }
      if (comdata[7] == 0xED) {
        dataDetected = comdata[2];
        dataX = comdata[3];
        dataY = comdata[4];
        dataWidth = comdata[5];
        dataHeight = comdata[6];
        _valid = true;
        return true;
      }
    }
  }
	_valid = false;
	return false;
}

uint8_t VisionSensor::Detected(void)
{
	return dataDetected;
}

uint8_t VisionSensor::GetX(void)
{
  return dataX;
}

uint8_t VisionSensor::GetY(void)
{
  return dataY;
}

uint8_t VisionSensor::GetWidth(void)
{
  return dataWidth;
}

uint8_t VisionSensor::GetHeight(void)
{
  return dataHeight;
}

boolean VisionSensor::Detected(uint8_t x)
{
	Search();
  if(Valid()&&Detected()&&dataHeight==x)
  {
    return true;
  }

  

  
  return false;
}
