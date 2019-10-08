/* morpx.inc copyright */
#include <SoftwareSerial.h>
#include <SoundSensor.h>
#include <Arduino.h>
#include "CXSNX10.h"

//***********************************
SoftwareSerial SoundSensorSerial(14,15);

SoundSensor::SoundSensor(uint32_t baud)
{
	_baud = baud;
	SetPort(A0);
}

void SoundSensor::SetPort(int pin)
{
	int Rxpin,Txpin;
	if(pin==A0)
	{
		Rxpin=A0;
		Txpin=A1;
	}
	else if(pin==A2)
	{
		Rxpin=A2;
		Txpin=A3;
	}
	else
	{
		Rxpin=A4;
		Txpin=A5;
	}
	delete SoundSensorSerial_p;
	SoundSensorSerial_p = new SoftwareSerial(Rxpin,Txpin);
}

void SoundSensor::WaitInit(void)
{
		String Rcv = String();
		do{
		
			do{
				SoundSensorSerial_p->write(0xff);
				SoundSensorSerial_p->write(0xfd);
				SoundSensorSerial_p->write(0x0a);
				SoundSensorSerial_p->write(0xed);
				
				delay(100);
			}while(SoundSensorSerial_p->available() <= 0);
			
			Rcv = SoundSensorSerial_p->readString();
		}while(Rcv.indexOf("OK")<0);
}


void SoundSensor::begin(void)
{
  SoundSensorSerial_p->begin(_baud);
}

void SoundSensor::Search(void)
{
  _valid = false;
  asr_result = "";
 // Serial.begin(115200);
  while(SoundSensorSerial_p->available() > 0)
 {
    //Serial.println("hhhh");
    _valid = true;
    asr_result += char(SoundSensorSerial_p->read());
    delay(2);
 }
}

void SoundSensor::SetWiFi(String SSID,String PASSWORD)
{
	int Temp = 0;

	String Rcv = String();
	CXSN_OLED OLED;
	
	OLED.OLED_Print(1,1, "   -SSID-");
	OLED.OLED_Print(2,1, SSID);
	OLED.OLED_Print(3,1, "  -PASSWORD-");
	OLED.OLED_Print(4,1, PASSWORD);

	do{
		
		do{
			SoundSensorSerial_p->write(0xff);
			SoundSensorSerial_p->write(0xfb);
			SoundSensorSerial_p->write(0x0a);
			SoundSensorSerial_p->write(0xed);


			for(int i=0;i<SSID.length();i++)
			{
				SoundSensorSerial_p->write(SSID[i]);
			}

			for(int i=0;i<20-SSID.length();i++)
			{
				SoundSensorSerial_p->write(Temp);
			}

			for(int i=0;i<PASSWORD.length();i++)
			{
				SoundSensorSerial_p->write(PASSWORD[i]);
			}
			
			for(int i=0;i<20-PASSWORD.length();i++)
			{
				SoundSensorSerial_p->write(Temp);
			}
			SoundSensorSerial_p->println();
			delay(500);
		}while(SoundSensorSerial_p->available() <= 0);

		Rcv = SoundSensorSerial_p->readString();

	}while(Rcv.indexOf("OK")<0);
	
	OLED.OLED_Print(1,14, "OK");
	
}


void SoundSensor::SetMode(int mode)
{
  unsigned char hexdata_asr[4] = {0xff,0xfe,0x01,0xed};
  unsigned char hexdata_tts[4] = {0xff,0xfe,0x02,0xed};
  unsigned char hexdata_word[4] = {0xff,0xfe,0x04,0xed};
  unsigned char hexdata_dia[4] = {0xff,0xfe,0x08,0xed};
  switch(mode)
  {
    case MODE_ASR:
      SoundSensorSerial_p->write(hexdata_asr, 4);
      break;
    case MODE_TTS:
      SoundSensorSerial_p->write(hexdata_tts, 4);
      break;
    case MODE_WORD:
      SoundSensorSerial_p->write(hexdata_word, 4);
      break;
    case MODE_DIA:
      SoundSensorSerial_p->write(hexdata_dia, 4);
      break;
  }  
  delay(2000);
}



bool SoundSensor::Result_flag(void)
{
  Search();
  return _valid;
}

String SoundSensor::AsrResult(void)
{ 
  return asr_result;
}

void SoundSensor::TtsContent(String str)
{
  SoundSensorSerial_p->print(str);
  delay(2000);
}



