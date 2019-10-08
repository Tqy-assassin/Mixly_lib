/**
************************************************************
* @file         Gizwits + ArduinoUnoR3 Library 
* @brief        Gizwits Process , Protcol Transformation
* @author       Gizwits
* @date         2017-08-01
* @version      V03030000
* @copyright    Gizwits
* 
* @note         机智云.只为智能硬件而生
*               Gizwits Smart Cloud  for Smart Products
*               链接|增值ֵ|开放|中立|安全|自有|自由|生态
*               www.gizwits.com
*
***********************************************************/
#include "Gizwits.h"
#include <Arduino.h>

dataPoint_t currentDataPoint;
wifiStatueFlags_t wifiStatueFlags;


Gizwits::Gizwits()
{
	memset((uint8_t*)&currentDataPoint, 0, sizeof(dataPoint_t));
}

Gizwits::~Gizwits()
{
	return;
}

void Gizwits::begin(void)
{ 
	Serial.begin(9600);
	gizwitsInit();
}

/**
* @brief Serial write , Send to wifi module
*
* @param buf      : Input data
* @param len       : data length
*
* @return : Success,payload length
*			-1，Error
*/
int32_t uartWrite(uint8_t *buf, uint32_t len)
{
    uint32_t i = 0;
    
    if(NULL == buf)
    {
        return -1;
    }
    
    for(i=0; i<len; i++)
    {
        Serial.write(buf[i]);
        if(i >=2 && buf[i] == 0xFF)
        {
            Serial.write(0x55);
        }
    }
    return len;
}

/*void serialEvent(void)
{
	uint8_t value = 0;
	value = (unsigned char)Serial.read();
	gizPutData(&value, 1);
}*/


/**
* @brief Get package , Handle Protocol Data
*
*
* @return : Null
*/
void Gizwits::process(void)
{
	uint8_t readChar = 0;
    uint16_t i=0,num = 0;
    num = Serial.available();
    if(0 < num)
    {
        for(i=0; i<num; i++)
        {
            readChar = Serial.read();
            gizPutData(&readChar, 1);
        }
        
    }
	gizwitsHandle((dataPoint_t *)&currentDataPoint);
}

bool Gizwits::wifiHasBeenSet(EVENT_TYPE_T eventType)
{
	bool flag;
	switch(eventType)
	{
			case WIFI_SOFTAP:
				flag = 	wifiStatueFlags.flagWifi_softap;
				wifiStatueFlags.flagWifi_softap = 0;
			break;
			case WIFI_AIRLINK:
				flag = 	wifiStatueFlags.flagWifi_airlink;
				wifiStatueFlags.flagWifi_airlink = 0;
			break;
			case WIFI_STATION:
				flag = 	wifiStatueFlags.flagWifi_station;
				wifiStatueFlags.flagWifi_station = 0;
			break;
			case WIFI_CON_ROUTER:
				flag = 	wifiStatueFlags.flagWifi_con_router;
				wifiStatueFlags.flagWifi_con_router = 0;
			break;
			case WIFI_DISCON_ROUTER:
				flag = 	wifiStatueFlags.flagWifi_discon_router;
				wifiStatueFlags.flagWifi_discon_router = 0;
			break;
			case WIFI_CON_M2M:
				flag = 	wifiStatueFlags.flagWifi_con_m2m;
				wifiStatueFlags.flagWifi_con_m2m = 0;
			break;
			case WIFI_DISCON_M2M:
				flag = 	wifiStatueFlags.flagWifi_discon_m2m;
				wifiStatueFlags.flagWifi_discon_m2m = 0;
			break;
			default:
			break;
	}
	
	return flag;
}

void Gizwits::setBindMode(uint8_t mode)
{
	gizwitsSetMode(mode);
}


/** The Structure of the current device status **/
attrFlags_t attrFlags;

/**
* @brief Get Datapoint Value

* Description:

* Get Value From currentDataPoint
* @param [in] eventType: event queue
* @param [in] value: Dest , Type In bool/uint32_t/int32_t/float/uint8_t(for binary)
* @return NULL
* @ref Gizwits.h
*/
void Gizwits::read(EVENT_TYPE_T eventType, bool* value)
{
	switch(eventType)
	{
	      case EVENT_LED_ONOFF:
	        *value = currentDataPoint.valueLED_ONOFF;
	        break;
	      case EVENT_LED_ONOFF1:
	        *value = currentDataPoint.valueLED_ONOFF1;
	        break;
	      case EVENT_LED_ONOFF2:
	        *value = currentDataPoint.valueLED_ONOFF2;
	        break;
	      case EVENT_PMOS1:
	        *value = currentDataPoint.valuePMOS1;
	        break;
	      case EVENT_PMOS2:
	        *value = currentDataPoint.valuePMOS2;
	        break;
		default:
			break;
	}
	
	return;
}

void Gizwits::read(EVENT_TYPE_T eventType, uint32_t* value)
{
	switch(eventType)
	{
	      case EVENT_xRGB1:
	        *value = currentDataPoint.valuexRGB1;
	        break;
	      case EVENT_xRGB_rad1:
	        *value = currentDataPoint.valuexRGB_rad1;
	        break;
	      case EVENT_xRGB_green1:
	        *value = currentDataPoint.valuexRGB_green1;
	        break;
	      case EVENT_xRGB_blue1:
	        *value = currentDataPoint.valuexRGB_blue1;
	        break;
	      case EVENT_yRGB2:
	        *value = currentDataPoint.valueyRGB2;
	        break;
	      case EVENT_yRGB_rad2:
	        *value = currentDataPoint.valueyRGB_rad2;
	        break;
	      case EVENT_yRGB_green2:
	        *value = currentDataPoint.valueyRGB_green2;
	        break;
	      case EVENT_yRGB_blue2:
	        *value = currentDataPoint.valueyRGB_blue2;
	        break;
		default:
			break;
	}
	
	return;
}
void Gizwits::read(EVENT_TYPE_T eventType, int32_t* value)
{
	switch(eventType)
	{
	      case EVENT_xRGB1:
	        *value = currentDataPoint.valuexRGB1;
	        break;
	      case EVENT_xRGB_rad1:
	        *value = currentDataPoint.valuexRGB_rad1;
	        break;
	      case EVENT_xRGB_green1:
	        *value = currentDataPoint.valuexRGB_green1;
	        break;
	      case EVENT_xRGB_blue1:
	        *value = currentDataPoint.valuexRGB_blue1;
	        break;
	      case EVENT_yRGB2:
	        *value = currentDataPoint.valueyRGB2;
	        break;
	      case EVENT_yRGB_rad2:
	        *value = currentDataPoint.valueyRGB_rad2;
	        break;
	      case EVENT_yRGB_green2:
	        *value = currentDataPoint.valueyRGB_green2;
	        break;
	      case EVENT_yRGB_blue2:
	        *value = currentDataPoint.valueyRGB_blue2;
	        break;
		default:
			break;
	}
	
	return;
}
void Gizwits::read(EVENT_TYPE_T eventType, float* value)
{
	switch(eventType)
	{
	      case EVENT_xRGB1:
	        *value = currentDataPoint.valuexRGB1;
	        break;
	      case EVENT_xRGB_rad1:
	        *value = currentDataPoint.valuexRGB_rad1;
	        break;
	      case EVENT_xRGB_green1:
	        *value = currentDataPoint.valuexRGB_green1;
	        break;
	      case EVENT_xRGB_blue1:
	        *value = currentDataPoint.valuexRGB_blue1;
	        break;
	      case EVENT_yRGB2:
	        *value = currentDataPoint.valueyRGB2;
	        break;
	      case EVENT_yRGB_rad2:
	        *value = currentDataPoint.valueyRGB_rad2;
	        break;
	      case EVENT_yRGB_green2:
	        *value = currentDataPoint.valueyRGB_green2;
	        break;
	      case EVENT_yRGB_blue2:
	        *value = currentDataPoint.valueyRGB_blue2;
	        break;
		default:
			break;
	}
	
	return;
}

void Gizwits::readBinary(EVENT_TYPE_T eventType, uint8_t* data)
{
	switch(eventType)
	{
		default:
			break;
	}
	
	return;
}

/**
* @brief Check datapoint event is or not happen

* Description:

* @param [in] eventType: event queue
* @return 1,This datapoint event happen
*		  0,This datapoint event is not happen
* @ref Gizwits.h
*/
bool Gizwits::hasBeenSet(EVENT_TYPE_T eventType)
{
	bool flag;
	switch(eventType)
	{
			case EVENT_LED_ONOFF:
				flag = 	attrFlags.flagLED_ONOFF;
				attrFlags.flagLED_ONOFF = 0;
				break;
			case EVENT_LED_ONOFF1:
				flag = 	attrFlags.flagLED_ONOFF1;
				attrFlags.flagLED_ONOFF1 = 0;
				break;
			case EVENT_LED_ONOFF2:
				flag = 	attrFlags.flagLED_ONOFF2;
				attrFlags.flagLED_ONOFF2 = 0;
				break;
			case EVENT_PMOS1:
				flag = 	attrFlags.flagPMOS1;
				attrFlags.flagPMOS1 = 0;
				break;
			case EVENT_PMOS2:
				flag = 	attrFlags.flagPMOS2;
				attrFlags.flagPMOS2 = 0;
				break;
			case EVENT_xRGB1:
				flag = 	attrFlags.flagxRGB1;
				attrFlags.flagxRGB1 = 0;
				break;
			case EVENT_xRGB_rad1:
				flag = 	attrFlags.flagxRGB_rad1;
				attrFlags.flagxRGB_rad1 = 0;
				break;
			case EVENT_xRGB_green1:
				flag = 	attrFlags.flagxRGB_green1;
				attrFlags.flagxRGB_green1 = 0;
				break;
			case EVENT_xRGB_blue1:
				flag = 	attrFlags.flagxRGB_blue1;
				attrFlags.flagxRGB_blue1 = 0;
				break;
			case EVENT_yRGB2:
				flag = 	attrFlags.flagyRGB2;
				attrFlags.flagyRGB2 = 0;
				break;
			case EVENT_yRGB_rad2:
				flag = 	attrFlags.flagyRGB_rad2;
				attrFlags.flagyRGB_rad2 = 0;
				break;
			case EVENT_yRGB_green2:
				flag = 	attrFlags.flagyRGB_green2;
				attrFlags.flagyRGB_green2 = 0;
				break;
			case EVENT_yRGB_blue2:
				flag = 	attrFlags.flagyRGB_blue2;
				attrFlags.flagyRGB_blue2 = 0;
				break;
		default:
			break;
	}
	
	return flag;
}

/**
* @brief Write Datapoint Value

* Description:

* Write value to currentDataPoint
* @param [in] eventType: event queue
* @param [in] value: Source value , Type In bool/uint32_t/int32_t/float/uint8_t(for binary)
* @return NULL
* @ref Gizwits.h
*/
void Gizwits::write(VALUE_TYPE_T valueType, bool value)
{
	switch(valueType)
	{
		default:
			break;
	}
	return;
}

void Gizwits::write(VALUE_TYPE_T valueType, uint32_t value)
{
	switch(valueType)
	{
		case VALUE_remind1:
			currentDataPoint.valueremind1 = value;
		break;
		case VALUE_remind2:
			currentDataPoint.valueremind2 = value;
		break;
		case VALUE_remind3:
			currentDataPoint.valueremind3 = value;
		break;
		case VALUE_remind4:
			currentDataPoint.valueremind4 = value;
		break;
		case VALUE_ADC_1:
			currentDataPoint.valueADC_1 = value;
		break;
		case VALUE_Humiture1:
			currentDataPoint.valueHumiture1 = value;
		break;
		case VALUE_Humiture2:
			currentDataPoint.valueHumiture2 = value;
		break;
		case VALUE_PM25:
			currentDataPoint.valuePM25 = value;
		break;
		default:
			break;
	}

	return;
}
void Gizwits::write(VALUE_TYPE_T valueType, int32_t value)
{
	switch(valueType)
	{
		case VALUE_remind1:
			currentDataPoint.valueremind1 = value;
		break;
		case VALUE_remind2:
			currentDataPoint.valueremind2 = value;
		break;
		case VALUE_remind3:
			currentDataPoint.valueremind3 = value;
		break;
		case VALUE_remind4:
			currentDataPoint.valueremind4 = value;
		break;
		case VALUE_ADC_1:
			currentDataPoint.valueADC_1 = value;
		break;
		case VALUE_Humiture1:
			currentDataPoint.valueHumiture1 = value;
		break;
		case VALUE_Humiture2:
			currentDataPoint.valueHumiture2 = value;
		break;
		case VALUE_PM25:
			currentDataPoint.valuePM25 = value;
		break;
		default:
			break;
	}

	return;
}
void Gizwits::write(VALUE_TYPE_T valueType, float value)
{
	switch(valueType)
	{
		case VALUE_remind1:
			currentDataPoint.valueremind1 = value;
		break;
		case VALUE_remind2:
			currentDataPoint.valueremind2 = value;
		break;
		case VALUE_remind3:
			currentDataPoint.valueremind3 = value;
		break;
		case VALUE_remind4:
			currentDataPoint.valueremind4 = value;
		break;
		case VALUE_ADC_1:
			currentDataPoint.valueADC_1 = value;
		break;
		case VALUE_Humiture1:
			currentDataPoint.valueHumiture1 = value;
		break;
		case VALUE_Humiture2:
			currentDataPoint.valueHumiture2 = value;
		break;
		case VALUE_PM25:
			currentDataPoint.valuePM25 = value;
		break;
		default:
			break;
	}

	return;
}
void Gizwits::writeBinary(VALUE_TYPE_T valueType, uint8_t* data,uint32_t dataLen)
{
	switch(valueType)
	{
		default:
			break;
	}
	
	return;
}


/**
* @brief Read ms timer

* @param none
* @return System Millisecond
*/
uint32_t gizGetTimerCount(void)
{
  return millis();
}